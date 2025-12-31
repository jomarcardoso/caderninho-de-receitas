using Microsoft.EntityFrameworkCore;
using Server;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.Net.Http.Headers;
using System.Text.Json.Nodes;
using System.Text.Json;
using System.Text.Json.Serialization;
using Server.Services;
using Server.Services.Auth;
using Server.Serialization;
using Server.PreProcessing;
using Server.Auth;
using Server.Options;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);
var isSwaggerExport = string.Equals(Environment.GetEnvironmentVariable("SWAGGER_EXPORT"), "1", StringComparison.OrdinalIgnoreCase);

// Add services to the container.

builder.Services.AddControllers()
  .AddJsonOptions(options =>
  {
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
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
  // Evita colisão de nomes de schemas para tipos aninhados com o mesmo nome
  c.CustomSchemaIds(type => type.FullName?.Replace('+', '.') ?? type.Name);
});

// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// DB - dependency injection of dbContext in Controllers
builder.Services.AddDbContext<AppDbContext>(options =>
{
  if (isSwaggerExport)
  {
    options.UseInMemoryDatabase("SwaggerDocs");
  }
  else
  {
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
  }
});

// DB - dependency injection of dbContext in Controllers
builder.Services.AddScoped<FoodService>();
builder.Services.AddScoped<IngredientService>();
builder.Services.AddScoped<RecipeService>();
builder.Services.AddScoped<RelationService>();
builder.Services.AddScoped<PlainTextRecipeParser>();
builder.Services.AddScoped<PlainTextRecipePreProcessor>();
builder.Services.AddSingleton<RecipeImageOcrService>();
builder.Services.AddScoped<IImageOptimizationService, ImageOptimizationService>();
builder.Services.Configure<GcsOptions>(builder.Configuration.GetSection("Gcs"));
builder.Services.AddSingleton<GcsStorageService>();
builder.Services.AddScoped<IGoogleTokenValidator, GoogleJsonWebSignatureTokenValidator>();
builder.Services.AddScoped<GoogleAuthService>();
builder.Services.AddSingleton<AzureBlobSasService>();
builder.Services.AddScoped<UserProfileService>();
builder.Services.AddHostedService<FeaturedExpiryService>();
var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();
if (string.IsNullOrWhiteSpace(jwtOptions.Secret))
{
  if (builder.Environment.IsDevelopment())
  {
    // Generate an ephemeral secret to keep development running, but warn the developer
    var fallbackKey = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    jwtOptions.Secret = fallbackKey;
    Console.WriteLine("[Auth] Warning: Jwt:Secret is not configured. Generated a temporary development key for this run.");
  }
  else
  {
    throw new InvalidOperationException("Jwt:Secret must be configured via appsettings or environment variables.");
  }
}
else
{
  var secretBytes = Encoding.UTF8.GetBytes(jwtOptions.Secret);
  if (secretBytes.Length < 32)
  {
    var normalized = Convert.ToBase64String(SHA256.HashData(secretBytes));
    jwtOptions.Secret = normalized;
    Console.WriteLine("[Auth] Warning: Jwt:Secret was shorter than 256 bits. Normalized via SHA256 hash for this process.");
  }
}
if (string.IsNullOrWhiteSpace(jwtOptions.Issuer))
{
  jwtOptions.Issuer = "caderninho";
}
if (string.IsNullOrWhiteSpace(jwtOptions.Audience))
{
  jwtOptions.Audience = jwtOptions.Issuer;
}
builder.Services.AddSingleton(jwtOptions);
builder.Services.AddSingleton<JwtTokenService>();

builder.Services.AddAuthorization(options =>
{
  options.AddPolicy("AdminOrHigher", policy =>
    policy.RequireRole("Admin", "Owner"));
  options.AddPolicy("KeeperOrHigher", policy =>
    policy.RequireRole("Keeper", "Admin", "Owner"));
});

// blazor
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
        builder.WithOrigins(
                 "http://localhost:5173",
                 "https://localhost:5173",
                 "http://localhost:3000",
                 "https://localhost:3000"
               )
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
      });
});

builder.Services
  .AddAuthentication(options =>
  {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer(options =>
  {
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateIssuerSigningKey = true,
      ValidIssuer = jwtOptions.Issuer,
      ValidAudience = jwtOptions.Audience,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret)),
      ClockSkew = TimeSpan.FromMinutes(1),
    };
  });

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


builder.Services.AddSingleton<IClaimsTransformation, Server.Auth.AdminRoleClaimsTransformation>();
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

// DB: ensure schema and reseed Food ID sequence (Postgres)
if (!isSwaggerExport)
{
  using (var scope = app.Services.CreateScope())
  {
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Apply pending migrations (preferred over EnsureCreated for relational DBs)
    try { db.Database.Migrate(); } catch { /* ignore on in-memory/dev */ }

    // Reseed Food.Id sequence to avoid PK conflicts after restores
    try
    {
      var reseedSql = @"SELECT setval(pg_get_serial_sequence('""Food""', 'Id'), COALESCE((SELECT MAX(""Id"") FROM ""Food""), 0), true);";
      db.Database.ExecuteSqlRaw(reseedSql);
    }
    catch { /* ignore if not Postgres or table/sequence not present */ }
  }
}

app.Run();








