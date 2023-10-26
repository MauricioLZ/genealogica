using Microsoft.Data.SqlClient;

public class Database
{
    public async Task<SqlConnection?> Connect()
    {
        string? connectionString = Env.azureConnectionString;

        try 
        {
            SqlConnection connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            return connection;
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
            return null;
        }
    }
}