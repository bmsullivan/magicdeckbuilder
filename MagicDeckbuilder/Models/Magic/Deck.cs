using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MagicDeckbuilder.Models.Magic
{
    public class Deck
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ISet<DeckCard> DeckCards { get; set; }
    }
}