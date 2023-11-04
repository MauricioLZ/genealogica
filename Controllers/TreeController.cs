using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace genealogica.Controllers;

[ApiController]
[Route("Tree")]
public class TreeController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public TreeController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public int Create(Tree tree)
    {
        try 
        {
            _dbContext.Trees.Add(tree);
            _dbContext.SaveChanges();
            return tree.Id;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            return -1;
        }
    }
}
