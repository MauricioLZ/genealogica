namespace genealogica;

public class Person 
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public string? PhotoLink { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public DateOnly? DateOfDeath { get; set; }
    public int Generation { get; set; }
    public int[]? ParentsById { get; set; }
    public int[]? PartnersById { get; set; }
    //public Union[]? UnionsById { get; set; }
    public int[]? ChildrenById { get; set; }
}