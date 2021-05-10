using CDMB.Common.Database;
using System;
using System.Threading.Tasks;

namespace CDMB.Common.Equipments
{
    public class EquipmentBuilder : IEquipmentBuilder
    {
        private readonly ApplicationContext context;

        public EquipmentBuilder(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<Equipment> CreateAsync(MachineInfo information)
        {
            var item = new Equipment
            {
                HostName = information.HostName,
                SerialNumber = information.SerialNumber,
            };

            foreach (var attribute in context.Attributes)
                item.Attributes.Add(new AttributeValue
                {
                    Attribute = attribute,
                    Value = "unknown"
                });

            foreach (var metric in context.Metrics)
                item.Parameters.Add(new Parameter
                {
                    Metric = metric,
                    Value = "unknown",
                });

            await context.Equipments.AddAsync(item);
            if (await context.SaveChangesAsync() == 0)
                throw new ApplicationException("Can't save new equipment");

            return item;
        }
    }
}
