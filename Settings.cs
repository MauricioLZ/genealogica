public class Settings 
{
    public string ServerConnectionString {get; set; }
    public string LocalConnectionString {get; set; }

    public static Settings instance;

    public Settings()
    {
        if (instance == null) 
        {
            instance = this;
        }
    }
}