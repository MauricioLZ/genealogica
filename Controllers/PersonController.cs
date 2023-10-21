using Microsoft.AspNetCore.Mvc;

namespace genealogica.Controllers;

[ApiController]
[Route("Person")]
public class PersonController : ControllerBase
{
    private readonly ILogger<PersonController> _logger;

    public PersonController(ILogger<PersonController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Person> Get()
    {
        List<Person> people = new List<Person> {
            new Person { Id = 1, Gender = "Male", Name = "Hugh Santanna", Img = "./images/person0.jpg", Birth = new DateTime(1907, 3, 22), Death = new DateTime(1952, 2, 11), Pids = new int[] {2} },
            new Person { Id = 2, Gender = "Feale", Name = "Stefannie Grantte", Img = "./images/person1.jpg", Birth = new DateTime(1904, 11, 8), Death = new DateTime(1978, 5, 2), Pids = new int[] {1} },
            new Person { Id = 3, Gender = "Female", Name = "Josefine Santanna", Img = "./images/person4.jpg", Birth = new DateTime(1941, 3, 22), Death = new DateTime(2008, 4, 7), Fid = 1, Mid = 2, Pids = new int[] {4} },
            new Person { Id = 4, Gender = "Male", Name = "Gustav Laudron", Img = "./images/person3.jpg", Birth = new DateTime(1946, 3, 22), Death = new DateTime(2015, 2, 14), Pids = new int[] {3} },
            new Person { Id = 5, Gender = "Male", Name = "Gilbert Laudron", Img = "./images/person2.jpg", Birth = new DateTime(1977, 3, 22), Fid = 3, Mid = 4 },
            new Person { Id = 6, Gender = "Female", Name = "Anne Laudron", Img = "./images/person5.jpg", Birth = new DateTime(1979, 3, 22), Fid = 3, Mid = 4 }
        };

        return people.ToArray();
    }
}
