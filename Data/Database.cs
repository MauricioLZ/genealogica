using Microsoft.Data.SqlClient;

public class Database
{
#if DEBUG
    private const string ConnectionString = "Data Source=DESKTOP-76J9BA3;Initial Catalog=GenealogicaDB;Integrated Security=True;TrustServerCertificate=True";
    //private const string ConnectionString = "Server=tcp:genealogica.database.windows.net,1433;Initial Catalog=GenealogicaDB;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=\"Active Directory Default\";";
#else
    private const string ConnectionString = "Server=tcp:genealogica.database.windows.net,1433;Initial Catalog=GenealogicaDB;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=\"Active Directory Default\";";
#endif


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