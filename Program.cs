using Microsoft.EntityFrameworkCore;

internal class Program
{
    public static Settings settings = new Settings();

    private static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        settings = new Settings
        {
            azureConnectionString = builder.Configuration.GetConnectionString("azureConnectionString"),
            emailPassword = builder.Configuration.GetValue<string>("emailPassword")
        };
        builder.Services.AddControllersWithViews();
        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(settings.azureConnectionString));

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
            pattern: "{controller}/{action=Index}/{id?}"
        );

        // app.Map("/user/confirm", async context =>
        // {
        //     context.Response.ContentType = "application/javascript";
        //     await context.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/src/components/", "EmailConfirmPage.js"));
        // });

        app.MapFallbackToFile("index.html");

        app.Run();
    }
}