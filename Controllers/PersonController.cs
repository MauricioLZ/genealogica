using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
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

    [HttpPost]
    public int Post(PersonRegisterObject personRegisterObject)
    {
        Person person = personRegisterObject.Person;
        int treeId = personRegisterObject.TreeId;
        
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

    [HttpPut]
    public bool Put(Person person) 
    {
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

    [HttpDelete]
    [Route("{personId}")]
    public bool Delete(int personId) 
    {
        try 
        {
            _dbContext.People.Remove(_dbContext.People.First((p) => p.Id == personId));
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
