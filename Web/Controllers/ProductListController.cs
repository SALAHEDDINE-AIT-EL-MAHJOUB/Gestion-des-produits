using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Repository.Data;
using Service.IServices;
using Web.Models; 
namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductListController : ControllerBase
    {
        private readonly IProductListService _service;

        public ProductListController(IProductListService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAllProductLists());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var list = _service.GetProductListById(id);
            return list == null ? NotFound() : Ok(list);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductListDto dto)
        {
            if (dto == null)
                return BadRequest();

            var productList = new ProductList
            {
                Name = dto.Name,
                Id = dto.ProductId ?? 0 // Conversion explicite du nullable vers int
            };

            _service.AddProductList(productList);

            return Ok(productList);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ProductList productList)
        {
            if (id != productList.Id) return BadRequest();
            _service.UpdateProductList(productList);
            return Ok(productList);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.DeleteProductList(id);
            return NoContent();
        }
    }
}