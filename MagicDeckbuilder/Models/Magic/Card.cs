using Newtonsoft.Json;

namespace MagicDeckbuilder.Models.Magic
{
    public class Card
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string Rarity { get; set; }
        public string Text { get; set; }
        public string Number { get; set; }
        public string MciNumber { get; set; }
        public int SetId { get; set; }
        public Set Set { get; set; }
    }
}