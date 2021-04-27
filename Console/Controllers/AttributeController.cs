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
    public class AttributeController : ControllerBase
    {
        private readonly ApplicationContext context;

        public AttributeController(ApplicationContext context)
        {
            this.context = context;
        }

        public IEnumerable<CDMBObjects.Attribute> Post([FromBody] CDMBObjects.Attribute attribute)
        {
            return context.Attributes;
        }

        [HttpPut("{id:int:min(0)}")]
        public async Task<IActionResult> Put(int id, [FromBody] CDMBObjects.Attribute attribute)
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
            var attr = new CDMBObjects.Attribute
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
