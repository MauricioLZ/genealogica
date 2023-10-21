using System.ComponentModel.DataAnnotations.Schema;

namespace genealogica;

public class Person 
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Img { get; set; }
    public DateTime Birth { get; set; }
    public DateTime Death { get; set; }
    [NotMapped] public int[]? Pids { 
        get { return new int[1] {Pid}; } 
        set { Pid = (value != null) ? value[0] : 0; } 
    }
    public int Pid { get; set; }
    public int Mid { get; set; }
    public int Fid { get; set; }
}