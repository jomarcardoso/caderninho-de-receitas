using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server;
using Server.Models;

static string MediaTypeFor(string ext)
{
  return ext switch
  {
    ".svg" => "image/svg+xml",
    ".png" => "image/png",
    ".webp" => "image/webp",
    ".jpg" or ".jpeg" => "image/jpeg",
    _ => "application/octet-stream",
  };
}

var baseDir = AppContext.BaseDirectory;
// repo root: tools/UpdateFoodIconCdn/bin/... -> go up 4 levels
var repoRoot = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", ".."));
var defaultUploadDir = Path.Combine(repoRoot, "db", "icons", "upload");
var configPath = Path.Combine(repoRoot, "Server", "appsettings.json");

var configuration = new ConfigurationBuilder()
  .AddJsonFile(configPath, optional: true)
  .AddEnvironmentVariables()
  .Build();

var connStr =
  Environment.GetEnvironmentVariable("ICON_DB_CONNECTION") ??
  configuration.GetConnectionString("PostgresConnection") ??
  "Host=localhost;Port=5432;Database=caderninho;Username=admin;Password=admin";

var cdnBase =
  Environment.GetEnvironmentVariable("ICON_CDN_BASE") ??
  configuration.GetSection("Gcs")?.GetValue<string>("PublicBaseUrl") ??
  "https://caderninho-de-receitas.appspot.com/foodicons";

var uploadDir =
  Environment.GetEnvironmentVariable("ICON_UPLOAD_DIR") ??
  defaultUploadDir;

if (!Directory.Exists(uploadDir))
{
  Console.Error.WriteLine($"[icons] Pasta de upload não encontrada: {uploadDir}");
  return 1;
}

var files = Directory.GetFiles(uploadDir);
if (files.Length == 0)
{
  Console.Error.WriteLine("[icons] Nenhum arquivo encontrado em upload.");
  return 1;
}

var fileMap = new Dictionary<int, (string fileName, string mediaType)>();
var idRegex = new Regex(@"^(\d+)");

foreach (var file in files)
{
  var name = Path.GetFileName(file);
  var match = idRegex.Match(name);
  if (!match.Success) continue;
  if (!int.TryParse(match.Groups[1].Value, out var id) || id <= 0) continue;
  var ext = Path.GetExtension(name).ToLowerInvariant();
  fileMap[id] = (name, MediaTypeFor(ext));
}

if (fileMap.Count == 0)
{
  Console.Error.WriteLine("[icons] Nenhum arquivo com prefixo numérico (id) encontrado.");
  return 1;
}

Console.WriteLine($"[icons] Arquivos mapeados: {fileMap.Count}");

var options = new DbContextOptionsBuilder<AppDbContext>()
  .UseNpgsql(connStr)
  .Options;

using var db = new AppDbContext(options);

var icons = await db.FoodIcon.AsTracking().ToListAsync();
var updated = 0;
var missing = 0;

foreach (var icon in icons)
{
  if (!fileMap.TryGetValue(icon.Id, out var data))
  {
    missing++;
    continue;
  }

  var url = $"{cdnBase.TrimEnd('/')}/{data.fileName}";
  icon.Content = url;
  icon.MediaType = data.mediaType;
  updated++;
}

await db.SaveChangesAsync();

Console.WriteLine($"[icons] Atualizados: {updated}");
Console.WriteLine($"[icons] Sem arquivo correspondente: {missing}");
Console.WriteLine("[icons] Concluído.");

return 0;
