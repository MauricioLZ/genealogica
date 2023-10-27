using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace genealogica.Controllers;

[ApiController]
[Route("User")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<User> Get(string identifier, string password, string loginType)
    {
        Database db = new Database();
        SqlConnection? connection;

        using (connection = await db.Connect()) 
        {
            string sql = "";
            if (loginType == "Email") sql = "SELECT * FROM Users WHERE Email=" + identifier + " AND Password=" + BCrypt.Net.BCrypt.EnhancedHashPassword(password);
            else if (loginType == "Facebook")  sql = "SELECT * FROM Users WHERE FacebookId=" + identifier;

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    User user = new User {
                        Id = (int)reader["Id"],
                        Email = reader["Email"].ToString(),
                        FacebookId = reader["FacebookId"].ToString(),
                        TreeId = (int)reader["TreeId"]
                    };

                    return user;
                }
            }
        }
    }

    [HttpPost]
    public async Task<int> Post(User user)
    {
        Database db = new Database();
        SqlConnection? connection;

        using (connection = await db.Connect()) 
        {
            string sql = "INSERT INTO Users (Email, Password, FacebookId) OUTPUT INSERTED.Id VALUES (@email, @password, @facebookId) ";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@email", user.Email);
                command.Parameters.AddWithValue("@password", BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password));
                command.Parameters.AddWithValue("@facebookId", user.FacebookId);
                command.CommandType = CommandType.Text;
                int id = (int)command.ExecuteScalar();
                return id;
            }
        }
    }
}
