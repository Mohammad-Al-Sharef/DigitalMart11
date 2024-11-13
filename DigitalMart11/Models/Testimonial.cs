namespace DigitalMart11.Models
{
    public class Testimonial
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Identity UserId
        public string Text { get; set; }
        public string Status { get; set; }

        // Navigation property
        public ApplicationUser User { get; set; }
    }
}
