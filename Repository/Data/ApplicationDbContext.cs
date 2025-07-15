using System;
using System.Collections.Generic;
using System.Text;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { } // <-- Ajoute ce constructeur

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductList> ProductLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=NomDeTaBase;Trusted_Connection=True;");
            }
        }
    }
}
