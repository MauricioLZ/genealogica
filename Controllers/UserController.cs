using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
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
    public int RegisterUser(User user)
    {
        try 
        {
            int treeId = new TreeController(_dbContext).Create(new Tree());
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

    public string GenerateToken()
    {
        byte[] tokenData = new byte[32];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(tokenData);
        }
        string token = Convert.ToBase64String(tokenData);
        return token;
    }

    [HttpPost]
    [Route("SendConfirmation")]
    public void SendConfirmationEmail([FromBody]string userEmail)
    {
        string token = GenerateToken();
        string confirmationLink = $"https://genealogica.azurewebsites.net/Confirm?email={userEmail}&token={token}";
        //string confirmationLink = $"https://localhost:44440/Confirm?email={userEmail}&token={token}";

        MailMessage mail = new MailMessage("mlopzcomercial@gmail.com", userEmail) {
            Subject = "Confirm Your Signup",
            Body = $@"<html>
                        <body>
                            <h3>Thanks for signing up to Genealogica!</h3>
                            <p>Please confirm your email by clicking <a href='{confirmationLink}'>HERE</a>.</p>
                        </body>
                    </html>",
            IsBodyHtml = true
        };

        SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587) {
            Credentials = new NetworkCredential("mlopzcomercial@gmail.com", Program.settings.emailPassword),
            EnableSsl = true
        };
        smtp.Send(mail);

        User user = _dbContext.Users.First((u) => u.Username == userEmail);
        user.Token = token;
        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }

    [HttpPost]
    [Route("Confirm")]
    public void ConfirmEmail([FromBody]UserConfirmationObject userObj) 
    {
        User user = _dbContext.Users.First((u) => u.Username == userObj.UserEmail);
        user.Validated = (user.Token?.Replace(' ', '+') == userObj.Token?.Replace(' ', '+'));

        if (user.Validated == true) 
        {
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
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
