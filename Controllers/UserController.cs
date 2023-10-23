using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace genealogica.Controllers;

[ApiController]
[Route("User")]
public class UserController : ControllerBase
{
    [HttpGet]
    public User Get()
    {
        User user = new User();

        return user;
    }
}
