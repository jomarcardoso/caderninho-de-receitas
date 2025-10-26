using Microsoft.EntityFrameworkCore;
using Server;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.OAuth;
using System.Security.Claims;
using System.Net.Http.Headers;
using System.Text.Json.Nodes;
using Server.Services;
using Server.Services.Auth;
using Server.Serialization;
using Server.PreProcessing;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Server.Auth;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddScoped<RelationService>();
builder.Services.AddScoped<PlainTextRecipeParser>();
builder.Services.AddScoped<PlainTextRecipePreProcessor>();
builder.Services.AddSingleton<RecipeImageOcrService>();
builder.Services.AddScoped<IGoogleTokenValidator, GoogleJsonWebSignatureTokenValidator>();
builder.Services.AddScoped<GoogleAuthService>();
builder.Services.AddSingleton<AzureBlobSasService>();

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
      })
      .AddOAuth("TikTok", options =>
      {
        options.ClientId = builder.Configuration["Authentication:TikTok:ClientId"] ?? string.Empty;
        options.ClientSecret = builder.Configuration["Authentication:TikTok:ClientSecret"] ?? string.Empty;
        options.CallbackPath = "/signin-tiktok";

        options.AuthorizationEndpoint = "https://www.tiktok.com/v2/auth/authorize/";
        options.TokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
        options.UserInformationEndpoint = "https://open.tiktokapis.com/v2/user/info/";

        options.Scope.Add("user.info.basic");
        options.SaveTokens = true;

        options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "open_id");
        options.ClaimActions.MapJsonKey(ClaimTypes.Name, "display_name");
        options.ClaimActions.MapJsonKey("urn:tiktok:avatar_url", "avatar_url");

        options.Events = new OAuthEvents
        {
          OnCreatingTicket = async context =>
          {
            // TikTok user info expects Authorization: Bearer and returns nested JSON
            var request = new HttpRequestMessage(HttpMethod.Get, options.UserInformationEndpoint);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

            using var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
            response.EnsureSuccessStatusCode();
            using var stream = await response.Content.ReadAsStreamAsync();

            var json = await JsonNode.ParseAsync(stream, cancellationToken: context.HttpContext.RequestAborted);
            // Expected shape: { data: { user: { open_id, display_name, avatar_url, ... } } }
            var user = json?["data"]?["user"] as JsonObject ?? json as JsonObject;
            if (user is not null)
            {
              var principal = context.Identity;
              string? GetString(string key) => user[key]?.GetValue<string>();

              var openId = GetString("open_id");
              var displayName = GetString("display_name");
              var avatar = GetString("avatar_url") ?? GetString("avatar_url_100");

              if (!string.IsNullOrEmpty(openId))
                principal!.AddClaim(new Claim(ClaimTypes.NameIdentifier, openId, ClaimValueTypes.String, context.Options.ClaimsIssuer));
              if (!string.IsNullOrEmpty(displayName))
                principal!.AddClaim(new Claim(ClaimTypes.Name, displayName, ClaimValueTypes.String, context.Options.ClaimsIssuer));
              if (!string.IsNullOrEmpty(avatar))
                principal!.AddClaim(new Claim("urn:tiktok:avatar_url", avatar, ClaimValueTypes.String, context.Options.ClaimsIssuer));
            }
          }
        };
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

// blazor
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();







