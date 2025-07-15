using Domain.Models;
using Repository.Data;
using Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
    public class ProductListRepository : IProductListRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductList> GetAll() => _context.Set<ProductList>().ToList();
        public ProductList? GetById(int id) => _context.Set<ProductList>().Find(id);
        public void Add(ProductList productList)
        {
            _context.Set<ProductList>().Add(productList);
            _context.SaveChanges();
        }
        public void Update(ProductList productList)
        {
            _context.Set<ProductList>().Update(productList);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var entity = GetById(id);
            if (entity != null)
            {
                _context.Set<ProductList>().Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}