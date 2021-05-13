using CDMB.Common.Database;
using CDMB.Common.Equipments;
using CMDB.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMDB.ConfigurationGate.Controllers
{
    [ApiController]
    [Route("api/client/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IEquipmentBuilder builder;

        public TasksController(ApplicationContext context, IEquipmentBuilder builder)
        {
            this.context = context;
            this.builder = builder;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var clientID = Convert.ToInt32(User.Claims.First().Value);
            var founded = from p in context.Parameters
                          where p.Equipment.Id == clientID
                          select new {p.Metric.Plugin, p.Metric.Cron};

            return Ok(founded.ToList());
        }
    }
}
