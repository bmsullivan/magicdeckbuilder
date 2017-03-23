using System.Collections.Generic;

namespace MagicDeckbuilder.Models.Magic
{
    public class Set
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MagicCardsInfoCode { get; set; }
        public HashSet<Card> Cards { get; set; }
    }
}