using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

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
    public async Task<int> Create(Tree tree)
    {
        using (SqlConnection connection = new SqlConnection(Env.azureConnectionString)) 
        {
            await connection.OpenAsync();
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
}
