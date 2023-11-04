using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace genealogica.Controllers;

[ApiController]
[Route("Person")]
public class PersonController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public PersonController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("Family/{treeId}")]
    public async Task<IEnumerable<Person>> Get(int treeId)
    {
        using (SqlConnection connection = new SqlConnection(Settings.instance.ServerConnectionString)) 
        {
            await connection.OpenAsync();
            try 
            {
                List<TreePerson> treePeople = await _dbContext.TreePeople.Where(tp => tp.TreeId == treeId).ToListAsync();
                List<int> peopleIds = treePeople.Select(t => t.PersonId).ToList();
                List<Person> people = await _dbContext.People.Where(p => peopleIds.Contains(p.Id)).ToListAsync();
                return people;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return new List<Person>();
            }
        }
    }

    [HttpPost]
    public async Task<int> Post(PersonRegisterObject personRegisterObject)
    {
        Person person = personRegisterObject.Person;
        int treeId = personRegisterObject.TreeId;

        using (SqlConnection connection = new SqlConnection(Settings.instance.ServerConnectionString)) 
        {
            await connection.OpenAsync();
            try 
            {
                _dbContext.People.Add(person);
                _dbContext.SaveChanges();

                TreePerson treePerson = new TreePerson { 
                    PersonId = person.Id, 
                    TreeId = treeId 
                };
                _dbContext.TreePeople.Add(treePerson);
                _dbContext.SaveChanges();

                return person.Id;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return -1;
            }
        }
    }

    [HttpPut]
    public async Task<bool> Put(Person person) 
    {
        using (SqlConnection connection = new SqlConnection(Settings.instance.ServerConnectionString)) 
        {
            await connection.OpenAsync();
            try 
            {
                _dbContext.People.Update(person);
                _dbContext.SaveChanges();

                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return false;
            }
        }
    }
}
