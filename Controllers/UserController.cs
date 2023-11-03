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
            try 
            {
                int treeId = await new TreeController(_dbContext).Create(new Tree());
                user.TreeId = treeId;
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                return user.Id;
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
