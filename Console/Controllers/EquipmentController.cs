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
    public class EquipmentController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public EquipmentController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Equipment> Get([FromQuery]string name)
        {
            IQueryable<Equipment> equips = _context.Equipments;
            if (!string.IsNullOrEmpty(name))
                equips = equips.Where(e => e.Name.IndexOf(name) >= 0);
           return equips.Take(10);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Equipment item)
        {
            _context.Equipments.Add(item);
            _context.SaveChanges();
            return Ok();
        }
    }
}
