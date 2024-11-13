namespace DigitalMart11.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }  // Changed from `name` to `FullName`
        public string Email { get; set; }
        public string Password { get; set; }  // Typically this should be hashed, consider Identity for password management
        public string ConfirmPassword { get; set; }


    }
}
