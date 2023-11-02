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

    [HttpPost]
    [Route("Login")]
    public async Task<User> LoginUser(LoginObject loginObject)
    {
        User? user = null;
        bool passwordless = false;

        if (loginObject.LoginType == "Email")
        {
            user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Username == loginObject.Identifier);
        }
        else if (loginObject.LoginType == "Facebook")
        {
            user = await _dbContext.Users.SingleOrDefaultAsync(u => u.FacebookId == loginObject.Identifier);
            passwordless = true;
        }
        else if (loginObject.LoginType == "Cookie") 
        {
            user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Id.ToString() == loginObject.Identifier);
            passwordless = true;
        }

        if (user != null)
        {
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(loginObject.Password, user.Password);
            if (passwordless || passwordMatch)
            {
                user.Password = "";
                return user;
            }
            else 
            {
                return new User { Id = 0 };
            }
        }

        return new User { Id = -1 };
    }
}
