using Microsoft.EntityFrameworkCore;

namespace genealogica.DataModels;

[PrimaryKey(nameof(TreeId), nameof(PersonId))]
public class TreePerson
{
    public int TreeId { get; set; }
    public int PersonId { get; set; }
}