using System;
using System.Diagnostics;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using InterFlare.Api.Contracts;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InterFlare.Api.Workers
{
    public class ServerStatusWorker : BackgroundService
    {
        public const int CYCLE_PERIOD = 1000 * 60 * 2; // 2 minutes
        public const int SERVER_RESPONSE_SIZE = 512;
        public const int SERVER_RESPONSE_FIELDS = 6;
        public const string SERVER_ADDR = "rrise.interflare.net";
        public const ushort SERVER_PORT = 25565;

        public static ServerStatusResponse Response { get; private set; }

        private readonly ILogger<ServerStatusWorker> _logger;

        public ServerStatusWorker(ILogger<ServerStatusWorker> logger)
        {
            _logger = logger;
            Response = new ServerStatusResponse { Status = ServerStatus.Pending };
        }

        protected override async Task ExecuteAsync(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                _logger.LogDebug("Began executing task");
                var sw = Stopwatch.StartNew();

                // Perform Minecraft server status check and get basic information
                var response = new byte[SERVER_RESPONSE_SIZE];

                try
                {
                    using var tcp = new TcpClient
                    {
                        ReceiveTimeout = 2500,
                        SendTimeout = 2500
                    };

                    var swConnect = Stopwatch.StartNew();
                    var taskConnect = tcp.ConnectAsync(SERVER_ADDR, SERVER_PORT);
                    if (!Task.WaitAll(new[] {taskConnect}, 2500, token))
                        throw new TimeoutException(string.Format("Timed out opening socket to {0} on port {1}", SERVER_ADDR, SERVER_PORT));
                    swConnect.Stop();

                    var latency = swConnect.ElapsedMilliseconds;
                    _logger.LogDebug("Connected to {0} on port {1} in {2}ms",
                        SERVER_ADDR, SERVER_PORT, latency);

                    var stream = tcp.GetStream();
                    var payload = new byte[] { 0xfe, 0x01 };

                    await stream.WriteAsync(payload, 0, payload.Length, token);
                    await stream.ReadAsync(response, 0, SERVER_RESPONSE_SIZE, token);

                    var data = Encoding.Unicode.GetString(response).Split("\u0000\u0000\u0000".ToCharArray());
                    if (data == null || data.Length < SERVER_RESPONSE_FIELDS)
                    {
                        Response = new ServerStatusResponse { Status = ServerStatus.Offline };
                        _logger.LogInformation("❌ Server was marked offline, empty or unexpected field count in data: {0}", data);
                    }
                    else
                    {
                        Response = new ServerStatusResponse
                        {
                            Status = ServerStatus.Online,
                            Latency = latency,
                            Version = data[2],
                            Motd = data[3],
                            Players = new PlayerCounts
                            {
                                Online = int.Parse(data[4]),
                                Maximum = int.Parse(data[5])
                            }
                        };

                        _logger.LogInformation("✔️ Server was marked as online");
                    }
                }
                catch (SocketException ex)
                {
                    Response = new ServerStatusResponse { Status = ServerStatus.Offline };
                    _logger.LogInformation(ex, "❌ Server was marked offline, socket unavailable");
                }
                catch (Exception ex) when (ex is IOException || ex is TimeoutException)
                {
                    Response = new ServerStatusResponse { Status = ServerStatus.TimeOut };
                    _logger.LogInformation(ex, "❌ Server was marked as timing out");
                }
                catch (Exception ex)
                {
                    Response = new ServerStatusResponse { Status = ServerStatus.Offline };
                    _logger.LogInformation(ex, "❌ Server was marked offline, general exception");
                }

                sw.Stop();
                _logger.LogDebug("Finished executing task in {0}", sw.Elapsed);
                await Task.Delay(CYCLE_PERIOD, token);
            }
        }
    }
}