using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CDMB.Common.Database;
using Microsoft.AspNetCore.Mvc;
using Attribute = CDMB.Common.Database.Attribute;

namespace CMDB.Console.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttributesController : ControllerBase
    {
        private readonly ApplicationContext context;

        public AttributesController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<Attribute> Get()
        {
           return context.Attributes;
        }

        public async Task<IActionResult> Post([FromBody] Attribute attribute)
        {
            context.Attributes.Add(attribute);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }

        [HttpPut("{id:int:min(0)}")]
        public async Task<IActionResult> Put(int id, [FromBody] Attribute attribute)
        {
            attribute.ID = id;
            context.Update(attribute);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }

        [HttpDelete("{id:int:min(0)}")]
        public async Task<IActionResult> Delete(int id)
        {
            var attr = new Attribute
            {
                ID = id,
            };
            context.Attributes.Remove(attr);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }
    }
}
