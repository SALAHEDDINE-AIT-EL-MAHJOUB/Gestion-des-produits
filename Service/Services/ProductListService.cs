using Domain.Models;
using Repository.Interfaces;
using Service.IServices;
using System.Collections.Generic;

namespace Service.Services
{
    public class ProductListService : IProductListService
    {
        private readonly IProductListRepository _repository;

        public ProductListService(IProductListRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<ProductList> GetAllProductLists() => _repository.GetAll();
        public ProductList? GetProductListById(int id) => _repository.GetById(id);
        public void AddProductList(ProductList productList) => _repository.Add(productList);
        public void UpdateProductList(ProductList productList) => _repository.Update(productList);
        public void DeleteProductList(int id) => _repository.Delete(id);
    }
}