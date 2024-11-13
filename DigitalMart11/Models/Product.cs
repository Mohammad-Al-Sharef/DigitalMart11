namespace DigitalMart11.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Prices { get; set; } // Storing prices as JSON
        public string Links { get; set; }  // Storing links as JSON

        // Navigation properties
        public Category Category { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
