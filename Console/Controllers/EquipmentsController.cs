using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDMBObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Console.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentsController : ControllerBase
    {
        private readonly ApplicationContext context;

        public EquipmentsController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<Equipment> Get([FromQuery]string hostName, [FromQuery] string serialNumber, [FromQuery] List<string> attributes)
        {
            if (string.IsNullOrEmpty(hostName))
                hostName = "";

            if (string.IsNullOrEmpty(serialNumber))
                serialNumber = "";

            return (from e in context.Equipments
                    where e.Hostname.Contains(hostName) && e.Hostname.Contains(serialNumber)
                    select e).Take(10);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Equipment item)
        {
            context.Equipments.Add(item);
            context.SaveChanges();
            return Ok();
        }
    }
}
