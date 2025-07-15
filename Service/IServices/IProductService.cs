using Domain.Models;
using System.Collections.Generic;

namespace Service.IServices
{
    public interface IProductService
    {
        IEnumerable<Product> GetAll();
        Product? GetProductById(int id);
        void AddProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(int id);
    }
}