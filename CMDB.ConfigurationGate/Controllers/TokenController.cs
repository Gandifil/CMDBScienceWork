using CDMB.Common.Database;
using CDMB.Common.Equipments;
using CMDB.Cryptography;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IEquipmentBuilder builder;

        public TokenController(ApplicationContext context, IEquipmentBuilder builder)
        {
            this.context = context;
            this.builder = builder;
        }

        [HttpPost]
        public async Task<string> Post(MachineInfo info)
        {
            var founded = from e in context.Equipments
                          where e.HostName == info.HostName && e.SerialNumber == info.SerialNumber
                          select e;

            var id = founded.Any() ? founded.First().Id : (await builder.CreateAsync(info)).Id;

            return AuthProvider.GenerateToken(id);
        }
    }
}
