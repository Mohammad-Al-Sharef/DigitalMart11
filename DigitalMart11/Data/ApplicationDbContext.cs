using Microsoft.EntityFrameworkCore;
using DigitalMart11.Models;

namespace DigitalMart11.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define DbSets for each entity
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure ApplicationUser properties
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.HasKey(e => e.Id);  // Primary key
                entity.Property(e => e.FullName).IsRequired();  // Full name is required
                entity.Property(e => e.Email).IsRequired();  // Email is required
                entity.Property(e => e.Password).IsRequired();  // Password is required
            });

            // Configure Product entity
            builder.Entity<Product>(entity =>
            {
                entity.HasOne(p => p.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(p => p.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Optionally configure JSON properties if needed
                entity.Property(p => p.Prices).HasColumnType("nvarchar(max)");
                entity.Property(p => p.Links).HasColumnType("nvarchar(max)");
            });

            // Configure Review entity
            builder.Entity<Review>(entity =>
            {
                entity.HasOne(r => r.Product)
                      .WithMany(p => p.Reviews)
                      .HasForeignKey(r => r.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(r => r.Status)
                      .HasMaxLength(50)
                      .IsRequired();
            });

            // Configure Testimonial entity
            builder.Entity<Testimonial>(entity =>
            {
                entity.Property(t => t.Status)
                      .HasMaxLength(50)
                      .IsRequired();
            });
        }
    }
}
