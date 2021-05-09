using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDMB.Common.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CMDB.Console.Controllers
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
                    where e.HostName.Contains(hostName) && e.SerialNumber.Contains(serialNumber)
                    select e).Take(10);
        }

        [HttpGet("{id:int:min(0)}")]
        public async Task<Equipment> Get([FromRoute] int id)
        {
            return await context.Equipments.FindAsync(id);
        }

        [HttpGet("{equipmentID:int:min(0)}/attributes")]
        public async Task<IActionResult> GetAttrs([FromRoute] int equipmentID)
        {
            var results = from v in context.AttributeValues
                          where v.Equipment.Id == equipmentID
                          select new { v.ID, v.Attribute.Name, v.Attribute.Type, v.Value,  };
            return Ok(results.ToList());
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
