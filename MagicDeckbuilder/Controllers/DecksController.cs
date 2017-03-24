using System.Collections.Generic;
using System.Linq;
using MagicDeckbuilder.Data;
using MagicDeckbuilder.Models.Magic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MagicDeckbuilder.Controllers
{
    [Route("api/[controller]")]
    public class DecksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DecksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Deck> Get([FromQuery]string userId, int? page)
        {
            return _context.Decks.Where(x => x.UserId == userId)
                .Skip((page - 1) * 10 ?? 0)
                .Take(10)
                .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var deck = _context.Decks
                .Include(x => x.DeckCards)
                .ThenInclude(x => x.Card)
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    Name = x.Name,
                    Cards = x.DeckCards.Select(y => new
                    {
                        Name = y.Card.Name,
                        Quantity = y.Quantity
                    })
                }).First();
            return Json(deck);
        }
    }
}