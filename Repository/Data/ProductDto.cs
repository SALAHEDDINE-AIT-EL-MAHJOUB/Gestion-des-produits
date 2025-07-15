using Microsoft.AspNetCore.Http;
using System;

namespace Repository.Data
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime DateCreation { get; set; }
        public int ListProduitId { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public IFormFile? Image { get; set; } // Ajout pour l’upload d’image
    }
}