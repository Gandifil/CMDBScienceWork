using CDMB.Common.Database;
using Microsoft.EntityFrameworkCore;

namespace CMDB.Common.Tests
{
    class TestDbContext: ApplicationContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\testmssqllocaldb;Database=helloappdb;Trusted_Connection=True;");
        }
    }
}
