namespace genealogica.DataModels;

public class User 
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? FacebookId { get; set; }
    public int? TreeId { get; set; }
    public string? Token { get; set; }
    public bool? Validated { get; set; }
}