using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using produit.Data;
using produit.Model;

namespace produit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListProduitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public ListProduitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListProduit>>> GetListProduits()
        {
            return await _context.ListProduits
                .Include(lp => lp.Produits)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ListProduit>> PostListProduit(ListProduit listProduit)
        {
            _context.ListProduits.Add(listProduit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetListProduit", new { id = listProduit.Id }, listProduit);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListProduit>> GetListProduit(int id)
        {
            var listProduit = await _context.ListProduits
                .Include(lp => lp.Produits)
                .FirstOrDefaultAsync(lp => lp.Id == id);

            if (listProduit == null)
            {
                return NotFound();
            }

            return listProduit;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutListProduit(int id, ListProduit listProduit)
        {
            if (id != listProduit.Id)
            {
                return BadRequest();
            }

            _context.Entry(listProduit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListProduitExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListProduit(int id)
        {
            var listProduit = await _context.ListProduits.FindAsync(id);
            if (listProduit == null)
            {
                return NotFound();
            }

            _context.ListProduits.Remove(listProduit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListProduitExists(int id)
        {
            return _context.ListProduits.Any(e => e.Id == id);
        }
    }
}
