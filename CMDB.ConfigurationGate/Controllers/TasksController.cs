using CDMB.Common.Database;
using CDMB.Common.Equipments;
using CMDB.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMDB.ConfigurationGate.Controllers
{
    [ApiController]
    [Route("api/client/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IEquipmentBuilder builder;

        public TasksController(ApplicationContext context, IEquipmentBuilder builder, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.builder = builder;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            var clientID = Convert.ToInt32(User.Claims.First().Value);
            var equipment = await context.Equipments.FindAsync(clientID);

            var founded = from e in context.Equipments
                          where e.Id == clientID
                          select e;

            var id = founded.Any() ? founded.First().Id : (await builder.CreateAsync(info)).Id;

            return AuthProvider.GenerateToken(id);
        }
    }
}
