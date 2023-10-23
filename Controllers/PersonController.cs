using System.Data;
using genealogica.DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace genealogica.Controllers;

[ApiController]
[Route("Person")]
public class PersonController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Person> Get()
    {
        Database db = new Database();
        SqlConnection? connection;

        using (connection = db.Connect()) 
        {
            string sql = "SELECT * FROM People";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    List<Person> people = new List<Person>();
                    while (reader.Read())
                    {
                        Person person = new Person{
                            Id = (int)reader["Id"],
                            Name = reader["Name"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            Img = reader["Img"].ToString(),
                            Birth = (DateTime)reader["Birth"],
                            Death = (DateTime)reader["Death"],
                            Pid = (int)reader["Pid"],
                            Mid = (int)reader["Mid"],
                            Fid = (int)reader["Fid"]
                        };
                        people.Add(person);
                    }

                    return people.ToArray();
                }
            }
        }
    }

    [HttpPost]
    public bool Post(Person person)
    {
        Database db = new Database();
        SqlConnection? connection;

        using (connection = db.Connect()) 
        {
            string sql = "INSERT INTO People (Name, Gender, Img, Birth, Death, Mid, Fid, Pid) VALUES (@name, @gender, @img, @birth, @death, @mid, @fid, @pid)";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@name", person.Name);
                command.Parameters.AddWithValue("@gender", person.Gender);
                command.Parameters.AddWithValue("@img", person.Img);
                command.Parameters.Add("@birth", SqlDbType.DateTime2).Value = person.Birth;
                command.Parameters.Add("@death", SqlDbType.DateTime2).Value = person.Death;
                command.Parameters.AddWithValue("@mid", person.Mid);
                command.Parameters.AddWithValue("@fid", person.Fid);
                command.Parameters.AddWithValue("@pid", person.Pid);
                command.CommandType = CommandType.Text;
                command.ExecuteNonQuery();
                return true;
            }
        }
    }
}
