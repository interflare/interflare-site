using InterFlare.Api.Contracts;
using InterFlare.Api.Workers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InterFlare.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ServerController : ControllerBase
    {
        private readonly ILogger<ServerController> _logger;

        public ServerController(ILogger<ServerController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("status")]
        public ServerStatusResponse GetServerStatus()
        {
            return ServerStatusWorker.Response;
        }
    }
}
