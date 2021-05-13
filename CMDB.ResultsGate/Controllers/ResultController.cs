using CDMB.Common.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMDB.ResultsGate.Controllers
{
    [ApiController]
    [Route("api/client/[controller]")]
    public class ResultController : ControllerBase
    {
        private readonly ApplicationContext context;

        public ResultController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AcceptResult(Result result)
        {
            var id = 1;

            var parameters = from p in context.Parameters
                            where p.Equipment.Id == id && p.Metric.Plugin == result.Plugin
                            select p;

            var parameter = parameters.First();

            parameter.Value = result.Value;
            parameter.Log = result.Log;
            parameter.Succes = result.Succes;
            parameter.UpdateTime = DateTime.Now;

            context.Update(parameter);
            if (await context.SaveChangesAsync() > 0)
                return Ok();
            else
                return NoContent();
        }
    }
}
