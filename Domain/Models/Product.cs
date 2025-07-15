using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [Table("Produits")]
    public class Product
    {
        public int Id { get; set; }

        [Column("Nom")]
        public string Name { get; set; }

        [Column("Prix")]
        public decimal? Price { get; set; }

        [Column("Stock")]
        public int? Stock { get; set; }

        [Column("DateCreation")]
        public DateTime DateCreation { get; set; }

        [Column("ListProduitId")]
        public int? ListProduitId { get; set; }

        [Column("Description")]
        public string? Description { get; set; }

        [Column("PhotoUrl")]
        public string? PhotoUrl { get; set; }
    }
}