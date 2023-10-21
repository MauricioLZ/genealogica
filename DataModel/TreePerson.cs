using Microsoft.EntityFrameworkCore;

namespace genealogica;

[PrimaryKey(nameof(TreeId), nameof(PersonId))]
public class TreePerson
{
    public int TreeId { get; set; }
    public int PersonId { get; set; }
}