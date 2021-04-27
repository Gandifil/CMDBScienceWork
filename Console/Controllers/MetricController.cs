using System.Threading.Tasks;
using CDMBObjects;
using Microsoft.AspNetCore.Mvc;

namespace Console.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetricController : ControllerBase
    {
        private readonly ApplicationContext context;

        public MetricController(ApplicationContext context)
        {
            this.context = context;
        }

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
