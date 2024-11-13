namespace DigitalMart11.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; } // Identity UserId
        public string Text { get; set; }
        public string Status { get; set; }

        // Navigation properties
        public Product Product { get; set; }
        public ApplicationUser User { get; set; }
    }
}
