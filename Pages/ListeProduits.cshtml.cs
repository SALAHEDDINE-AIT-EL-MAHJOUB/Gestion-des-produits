using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using produit.Data;
using produit.Model;

namespace produit.Pages
{
    public class ListeProduitsModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public ListeProduitsModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<ListProduit> ListeProduits { get; set; } = new List<ListProduit>();

        public async Task OnGetAsync()
        {
            ListeProduits = await _context.ListProduits
                .Include(lp => lp.Produits)
                .ToListAsync();
        }
    }
}
