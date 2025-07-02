using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using produit.Data;
using produit.Model;

namespace produit.Pages
{
    public class GestionProduitsModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public GestionProduitsModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public ListProduit? ListeProduit { get; set; }
        public int ListId { get; set; }

        public async Task<IActionResult> OnGetAsync(int listId)
        {
            ListId = listId;
            
            ListeProduit = await _context.ListProduits
                .Include(lp => lp.Produits)
                .FirstOrDefaultAsync(lp => lp.Id == listId);

            if (ListeProduit == null)
            {
                return NotFound();
            }

            return Page();
        }
    }
}
