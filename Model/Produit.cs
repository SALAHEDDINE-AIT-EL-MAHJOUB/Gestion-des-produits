using System.ComponentModel.DataAnnotations;

namespace produit.Model
{
    public class Produit
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        [Required]
        public decimal Prix { get; set; }
        
        public int Stock { get; set; }
        
        public DateTime DateCreation { get; set; } = DateTime.Now;
        
        
        public int? ListProduitId { get; set; }
        public ListProduit? ListProduit { get; set; }

    }
}
