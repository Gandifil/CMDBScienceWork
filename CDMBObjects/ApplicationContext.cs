using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Text;

namespace CDMBObjects
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<ParameterType> ParameterTypes { get; set; }

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
