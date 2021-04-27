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

        public IEnumerable<Metric> Get()
        {
           return context.Metrics;
        }
    }
}
