using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [Table("ListProduits")]
    public class ProductList
    {
        public int Id { get; set; }

        [Column("Nom")]
        public string Name { get; set; }
    }
}