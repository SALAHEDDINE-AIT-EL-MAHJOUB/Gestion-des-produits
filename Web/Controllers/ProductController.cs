using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Repository.Data;
using Domain.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // Sauvegarde d'un produit
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductDto dto)
        {
            if (dto == null)
                return BadRequest("Le formulaire est vide.");

            if (string.IsNullOrEmpty(dto.Name) || dto.Price == 0 || dto.Stock == 0)
                return BadRequest("Champs obligatoires manquants.");

            string photoUrl = "";
            if (dto.Image != null && dto.Image.Length > 0)
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                Directory.CreateDirectory(uploads);
                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var filePath = Path.Combine(uploads, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                photoUrl = "/images/" + fileName;
            }

            var product = new Product
            {
                Name = dto.Name ?? "",
                Price = dto.Price,
                Stock = dto.Stock,
                DateCreation = dto.DateCreation == default ? DateTime.Now : dto.DateCreation,
                ListProduitId = dto.ListProduitId == 0 ? 1 : dto.ListProduitId,
                Description = dto.Description ?? "",
                PhotoUrl = photoUrl
            };

            try
            {
                _service.AddProduct(product);
                // Map Product to ProductDto for response
                var responseDto = new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price ?? 0, 
                    Stock = product.Stock ?? 0, 
                    DateCreation = product.DateCreation,
                    ListProduitId = product.ListProduitId ?? 1, 
                    Description = product.Description ?? "",
                    PhotoUrl = product.PhotoUrl ?? ""
                };
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Modification d'un produit
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ProductDto dto)
        {
            var product = _service.GetProductById(id);
            if (product == null)
                return NotFound("Produit introuvable.");

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.Description = dto.Description ?? "";
            product.ListProduitId = dto.ListProduitId == 0 ? 1 : dto.ListProduitId;

            if (dto.Image != null && dto.Image.Length > 0)
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                Directory.CreateDirectory(uploads);
                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var filePath = Path.Combine(uploads, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                product.PhotoUrl = "/images/" + fileName;
            }

            _service.UpdateProduct(product);
            // Map Product to ProductDto for response
            var responseDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price ?? 0, 
                Stock = product.Stock ?? 0, 
                DateCreation = product.DateCreation,
                ListProduitId = product.ListProduitId ?? 1, 
                Description = product.Description ?? "",
                PhotoUrl = product.PhotoUrl ?? ""
            };
            return Ok(responseDto);
        }

        // Récupération d'un produit
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _service.GetProductById(id);
            if (product == null)
                return NotFound("Produit introuvable.");

            if (product.PhotoUrl == null)
                product.PhotoUrl = ""; // ou une valeur par défaut

            // Map Product to ProductDto for response
            var responseDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price ?? 0, 
                Stock = product.Stock ?? 0, 
                DateCreation = product.DateCreation,
                ListProduitId = product.ListProduitId ?? 1, 
                Description = product.Description ?? "",
                PhotoUrl = product.PhotoUrl ?? ""
            };
            return Ok(responseDto);
        }

        // Récupération de tous les produits
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var produits = _service.GetAll();
                var produitsDto = produits.Select(product => new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price ?? 0, 
                    Stock = product.Stock ?? 0, 
                    DateCreation = product.DateCreation,
                    ListProduitId = product.ListProduitId ?? 1, 
                    Description = product.Description ?? "",
                    PhotoUrl = product.PhotoUrl ?? ""
                });
                return Ok(produitsDto);
            }
            catch (Exception ex)
            {
                // Retourne l’erreur pour debug
                return StatusCode(500, new { error = ex.Message, stack = ex.StackTrace });
            }
        }

        // Suppression d'un produit
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _service.GetProductById(id);
            if (product == null)
                return NotFound("Produit introuvable.");

            _service.DeleteProduct(id);
            return NoContent();
        }
    }
}
