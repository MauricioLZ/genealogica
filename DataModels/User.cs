namespace genealogica.DataModels;

public class User 
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? FacebookId { get; set; }
    public int? TreeId { get; set; }
}