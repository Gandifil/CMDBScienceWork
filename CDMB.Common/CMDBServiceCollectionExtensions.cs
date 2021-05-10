using CDMB.Common.Database;
using CDMB.Common.Equipments;
using Microsoft.Extensions.DependencyInjection;

namespace CDMB.Common
{
    public static class CMDBServiceCollectionExtensions
    {
        public static IServiceCollection AddCMDB(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>();
            services.AddScoped<IEquipmentBuilder, EquipmentBuilder>();

            return services;
        }

    }
}
