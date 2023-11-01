using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace genealogica.Controllers;

[ApiController]
[Route("User")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UserController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("Registration")]
    public async Task<int> RegisterUser(User user)
    {
        using (SqlConnection connection = new SqlConnection(Env.azureConnectionString)) 
        {
            await connection.OpenAsync();
            
            string sql = "INSERT INTO Users (Username, Password, FacebookId) OUTPUT INSERTED.Id VALUES (@username, @password, @facebookId)";

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
    }

    [HttpPost]
    [Route("Login")]
    public async Task<User> LoginUser(LoginObject loginObject)
    {
        User? user = null;

        if (loginObject.LoginType == "Email")
        {
            user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Username == loginObject.Identifier);
        }
        else if (loginObject.LoginType == "Facebook")
        {
            user = await _dbContext.Users.SingleOrDefaultAsync(u => u.FacebookId == loginObject.Identifier);
        }

        if (user != null)
        {
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(loginObject.Password, user.Password);
            if (passwordMatch)
            {
                user.Password = "";
                return user;
            }
        }

        return new User();
    }
}
