using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

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

    [HttpGet]
    public Tree Get()
    {
        Tree tree = new Tree();

        return tree;
    }

    [HttpPost]
    public async Task<int> Create(User user)
    {
        using (SqlConnection connection = new SqlConnection(Env.azureConnectionString)) 
        {
            await connection.OpenAsync();
            
            string sql = "INSERT INTO Users (Username, Password, FacebookId) OUTPUT INSERTED.Id VALUES (@username, @password, @facebookId)";

            try 
            {
                using (SqlCommand command = new SqlCommand(sql, connection)) 
                {
                    
                    command.Parameters.AddWithValue("@username", user.Username);
                    command.Parameters.AddWithValue("@password", BCrypt.Net.BCrypt.HashPassword(user.Password));
                    command.Parameters.AddWithValue("@facebookId", user.FacebookId);
                    command.CommandType = CommandType.Text;
                    int id = (int)command.ExecuteScalar();
                    return id;
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return -1;
            }
        }
    }
}
