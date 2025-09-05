using Microsoft.EntityFrameworkCore;
using Server;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Server.Services;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Server.Auth;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
  .AddJsonOptions(options =>
  {
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
  });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
  {
    Title = "Caderninho de Receitas - API",
    Version = "v1",
  });
});

// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// DB - dependency injection of dbContext in Controllers
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));

// DB - dependency injection of dbContext in Controllers
builder.Services.AddScoped<FoodService>();
builder.Services.AddScoped<IngredientService>();
builder.Services.AddScoped<RecipeService>();

// blazor
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor(); // Blazor Server
builder.Services.AddScoped<PageTitleService>();

// Add http client
builder.Services.AddHttpClient("Default", client =>
{
  client.BaseAddress = new Uri(builder.Configuration["BaseAddress"] ?? "https://localhost:7269/");
});
builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("Default"));

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigin",
      builder =>
      {
        builder.WithOrigins("http://localhost:8000", "https://localhost:8000")
                 .AllowAnyMethod()
                 .AllowAnyHeader();
      });
});

if (builder.Environment.IsDevelopment())
{
  // fake login
  builder.Services.AddAuthentication("Test")
      .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", null);
}
else
{
  // login
  builder.Services
      .AddAuthentication(options =>
      {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
      })
      .AddCookie()
      .AddGoogle(googleOptions =>
      {
        googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
      });
}

// builder.Services.AddAuthentication().AddGoogle(googleOptions =>
// {
//     googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
//     googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
// });

// builder.Services
//     .AddAuthentication(options =>
//     {
//         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     })
//     .AddJwtBearer(options =>
//     {
//         options.Authority = "https://accounts.google.com";
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidIssuer = "https://accounts.google.com",
//             ValidateAudience = true,
//             ValidAudience = "<seu-client-id-do-google>",
//             ValidateLifetime = true
//         };
//     });

builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowSpecificOrigin");

// auth
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// test DB
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  // db.Database.Migrate();
  db.Database.EnsureCreated();
}

// blazor
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
