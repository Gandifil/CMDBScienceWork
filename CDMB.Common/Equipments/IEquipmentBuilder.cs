using CDMB.Common.Database;
using System.Threading.Tasks;

namespace CDMB.Common.Equipments
{
    public interface IEquipmentBuilder
    {
        Task<Equipment> CreateAsync(MachineInfo information);
    }
}
