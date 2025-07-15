using Domain.Models;
using Repository.Interfaces;
using Service.IServices;
using System.Collections.Generic;

namespace Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Product> GetAll()
        {
            return _repository.GetAll();
        }
        public Product? GetProductById(int id) => _repository.GetById(id);
        public void AddProduct(Product product) => _repository.Add(product);
        public void UpdateProduct(Product product) => _repository.Update(product);
        public void DeleteProduct(int id) => _repository.Delete(id);
    }
}