using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using produit.Data;
using produit.Model;

namespace produit.Pages
{
    public class ProduitsModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public ProduitsModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Produit> Produits { get; set; } = default!;
        public IList<ListProduit> ListesProduits { get; set; } = default!;

        public async Task OnGetAsync()
        {
            Produits = await _context.Produits
                .Include(p => p.ListProduit)
                .OrderByDescending(p => p.DateCreation)
                .ToListAsync();
                
            ListesProduits = await _context.ListProduits
                .OrderBy(l => l.Nom)
                .ToListAsync();
        }
    }
}
