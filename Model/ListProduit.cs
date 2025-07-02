using System.ComponentModel.DataAnnotations;

namespace produit.Model
{
    public class ListProduit  
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;
        
        public List<Produit> Produits { get; set; } = new List<Produit>();
    }
}
