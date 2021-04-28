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
    public class MetricsController : ControllerBase
    {
        private readonly ApplicationContext context;

        public MetricsController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet("{id:int:min(0)}")]
        public async Task<Metric> Get([FromRoute] int id)
        {
            return await context.Metrics.FindAsync(id);
        }

        [HttpGet]
        public IEnumerable<Metric> Get()
        {
           return context.Metrics;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Metric metric)
        {
            context.Metrics.Add(metric);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }

        [HttpPut("{id:int:min(0)}")]
        public async Task<IActionResult> Put(int id, [FromBody] Metric metric)
        {
            metric.ID = id;
            context.Metrics.Update(metric);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }

        [HttpDelete("{id:int:min(0)}")]
        public async Task<IActionResult> Delete(int id)
        {
            var metric = new Metric
            {
                ID = id,
            };
            context.Metrics.Remove(metric);
            var changes = await context.SaveChangesAsync();
            if (changes > 0)
                return Ok();
            else return NotFound();
        }
    }
}
