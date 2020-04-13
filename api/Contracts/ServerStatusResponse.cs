using System;

namespace InterFlare.Api.Contracts
{
    public class ServerStatusResponse
    {
        public DateTimeOffset Updated { get; }
        public ServerStatus Status { get; set; }
        public long Latency { get; set; }
        public string Version { get; set; }
        public string Motd { get; set; }
        public PlayerCounts Players { get; set; }

        public ServerStatusResponse()
        {
            Updated = DateTimeOffset.UtcNow;
        }
    }

    public enum ServerStatus
    {
        Online, Offline, TimeOut, Pending
    }

    public class PlayerCounts
    {
        public int Online { get; set; }
        public int Maximum { get; set; }
    }
}