using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        

        string appConfigConnectionString = builder.Configuration.GetConnectionString("AppConfig");
        builder.Configuration.AddAzureAppConfiguration(appConfigConnectionString);

        Settings settings = new Settings
        {
            ServerConnectionString = builder.Configuration.GetConnectionString("azureConnectionString")
        };
        builder.Services.Configure<Settings>(builder.Configuration.GetSection("genealogica:Settings"));
        builder.Services.AddControllersWithViews();
        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(settings.ServerConnectionString));

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html");

        app.Run();
    }
}