using genealogica;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext 
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public DbSet<User>? Users { get; set; }
    public DbSet<Person>? People { get; set; }
    public DbSet<TreePerson>? TreePeople { get; set; }
    public DbSet<Tree>? Trees { get; set; }
}