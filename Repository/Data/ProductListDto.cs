using System.ComponentModel.DataAnnotations;

namespace Repository.Data
{
    public class ProductListDto
    {
        [Required]
        public string Name { get; set; }
        public int? ProductId { get; set; }
    }
}