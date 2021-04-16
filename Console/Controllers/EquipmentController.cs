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
    [Route("[controller]")]
    public class AttributesController : ControllerBase
    {
        private readonly ApplicationContext context;

        public AttributesController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<CDMBObjects.Attribute> Get()
        {
           return context.Attributes;
        }
    }
}
