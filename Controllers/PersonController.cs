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
            new Person { Id = 1, Name = "Hugh", Surname = "Santanna", PhotoLink = "./images/person0.jpg", DateOfBirth = new DateOnly(1907, 3, 22), DateOfDeath = new DateOnly(1952, 2, 11), Generation = 100, PartnersById = new int[] { 2 }, ChildrenById = new int[] { 3 } },
            new Person { Id = 2, Name = "Stefannie", Surname = "Grantte", PhotoLink = "./images/person1.jpg", DateOfBirth = new DateOnly(1904, 11, 8), DateOfDeath = new DateOnly(1978, 5, 2), Generation = 100, PartnersById = new int[] { 1 }, ChildrenById = new int[] { 3 } },
            new Person { Id = 3, Name = "Josefine", Surname = "Santanna", PhotoLink = "./images/person4.jpg", DateOfBirth = new DateOnly(1941, 3, 22), DateOfDeath = new DateOnly(2008, 4, 7), Generation = 101, ParentsById = new int[] { 1, 2 }, PartnersById = new int[] { 4 }, ChildrenById = new int[] { 3 } },
            new Person { Id = 4, Name = "Gustav", Surname = "Laudron", PhotoLink = "./images/person3.jpg", DateOfBirth = new DateOnly(1946, 3, 22), DateOfDeath = new DateOnly(2015, 2, 14), Generation = 101, PartnersById = new int[] { 3 }, ChildrenById = new int[] { 3 } },
            new Person { Id = 5, Name = "Gilbert", Surname = "Laudron", PhotoLink = "./images/person2.jpg", DateOfBirth = new DateOnly(1977, 3, 22), Generation = 102, ParentsById = new int[] { 3, 4 } },
            new Person { Id = 6, Name = "Anne", Surname = "Laudron", PhotoLink = "./images/person5.jpg", DateOfBirth = new DateOnly(1979, 3, 22), Generation = 102, ParentsById = new int[] { 3, 4 } },
        };

        return people.ToArray();
    }
}
