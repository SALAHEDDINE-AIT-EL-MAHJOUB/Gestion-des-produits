using Domain.Models;
using System.Collections.Generic;

namespace Service.IServices
{
    public interface IProductListService
    {
        IEnumerable<ProductList> GetAllProductLists();
        ProductList? GetProductListById(int id);
        void AddProductList(ProductList productList);
        void UpdateProductList(ProductList productList);
        void DeleteProductList(int id);
    }
}