using Microsoft.AspNetCore.Authentication.Cookies;
using api.Models;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure MongoDB Settings
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<MongoDBService>();

// Configure Cookie Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
      options.LoginPath = "/api/user/login"; // Redirect to login path on unauthorized access
      options.LogoutPath = "/api/user/logout"; // Redirect to logout path (optional)
      options.ExpireTimeSpan = TimeSpan.FromDays(7); // Set cookie expiration time
      options.SlidingExpiration = true; // Renew cookie expiration on each request
    });

// Add CORS services and configure the policy
builder.Services.AddCors(options =>
{
  // options.AddPolicy("AllowAll",
  //     builder =>
  //     {
  //         builder.AllowAnyOrigin()
  //                 .AllowAnyMethod()
  //                 .AllowAnyHeader();
  //     });

  options.AddPolicy("AllowFrontend",
          builder =>
          {
            builder.WithOrigins("http://localhost:3000") // Replace with your React URL
                      .AllowCredentials()
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
          });
});

// Add other services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Enable Swagger in development environment
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// Add CORS to the pipeline before authentication and authorization middleware
app.UseCors("AllowFrontend");

app.UseAuthentication(); // Ensure this comes before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
