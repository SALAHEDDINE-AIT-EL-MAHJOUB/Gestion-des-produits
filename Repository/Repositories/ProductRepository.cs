using Domain.Models;
using Repository.Interfaces;
using Repository.Data;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Product> GetAll() => _context.Products.ToList();

        public Product? GetById(int id) => _context.Products.Find(id);

        public void Add(Product product)
        {
            _context.Set<Product>().Add(product);
            _context.SaveChanges();
        }

        public void Update(Product product)
        {
            var existing = _context.Products.Find(product.Id);
            if (existing != null)
            {
                existing.Name = product.Name;
                existing.Price = product.Price;
                existing.Stock = product.Stock;
                existing.PhotoUrl = product.PhotoUrl; 
                existing.DateCreation = product.DateCreation;
                existing.ListProduitId = product.ListProduitId;
                existing.Description = product.Description;
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
    }
}
