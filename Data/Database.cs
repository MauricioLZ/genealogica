//using MySql.Data.MySqlClient;

using Microsoft.Data.SqlClient;

public class Database
{
#if DEBUG

    private const string DatabaseAddress = "DESKTOP-76J9BA3";
    private const string DatabaseUserId = "root";
    private const string DatabaseUserPassword = "";

#else

    private const string DatabaseAddress = "";
    private const string DatabaseUserId = "";
    private const string DatabaseUserPassword = "";

#endif

    private string Server { get; set; } = DatabaseAddress;
    public string DatabaseName { get; set; } = "Genealogica";
    private string UserId { get; set; } = DatabaseUserId;
    private string Password { get; set; } = DatabaseUserPassword;

    private string ConnectionString
    {
        get
        {
            return "Data Source=" + DatabaseAddress + ";Initial Catalog=GenealogicaDB;Integrated Security=True;TrustServerCertificate=True";
        }
    }

    public SqlConnection? Connect()
    {
        try 
        {
            SqlConnection connection = new SqlConnection(ConnectionString);
            connection.Open();
            return connection;
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
            return null;
        }
    }
}