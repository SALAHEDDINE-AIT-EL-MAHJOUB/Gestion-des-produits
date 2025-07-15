using Domain.Models;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IProductListRepository
    {
        IEnumerable<ProductList> GetAll();
        ProductList? GetById(int id);
        void Add(ProductList productList);
        void Update(ProductList productList);
        void Delete(int id);
    }
}