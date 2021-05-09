using Microsoft.EntityFrameworkCore;

namespace CDMB.Common.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Metric> Metrics { get; set; }
        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<AttributeValue> AttributeValues { get; set; }

        public ApplicationContext()
        {
        }

        public void Reload()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=helloappdb;Trusted_Connection=True;");
        }
    }
}
