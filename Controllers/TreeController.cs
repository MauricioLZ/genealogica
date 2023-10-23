using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace genealogica.Controllers;

[ApiController]
[Route("Tree")]
public class TreeController : ControllerBase
{
    [HttpGet]
    public Tree Get()
    {
        Tree tree = new Tree();

        return tree;
    }
}
