namespace genealogica.DataModels;

public class PersonRegisterObject 
{
    public Person Person { get; set; } = new Person();
    public int TreeId { get; set; }
}