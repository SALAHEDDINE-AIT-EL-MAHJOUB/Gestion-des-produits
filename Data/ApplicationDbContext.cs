using Microsoft.EntityFrameworkCore;
using produit.Model;

namespace produit.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ListProduit> ListProduits { get; set; }
        public DbSet<Produit> Produits { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configuration du type decimal pour Prix
            modelBuilder.Entity<Produit>()
                .Property(p => p.Prix)
                .HasPrecision(18, 2);
            
            // Configuration des relations
            modelBuilder.Entity<Produit>()
                .HasOne(p => p.ListProduit)
                .WithMany(l => l.Produits)
                .HasForeignKey(p => p.ListProduitId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
