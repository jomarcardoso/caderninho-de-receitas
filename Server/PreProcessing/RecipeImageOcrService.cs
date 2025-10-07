using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TesseractOCR;
using TesseractOCR.Enums;
using TesseractOCR.Pix;

namespace Server.PreProcessing;

public class RecipeImageOcrService : IDisposable
{
  private static readonly char[] LanguageSeparators = { ',', ';', '+', ' ', '\t', '\r', '\n' };

  private readonly ILogger<RecipeImageOcrService> logger;
  private readonly string tessDataParentPath;
  private readonly string defaultLanguageCodes;
  private readonly ConcurrentDictionary<string, Engine> engines = new(StringComparer.OrdinalIgnoreCase);
  private bool disposed;

  public RecipeImageOcrService(IConfiguration configuration, ILogger<RecipeImageOcrService> logger)
  {
    this.logger = logger ?? throw new ArgumentNullException(nameof(logger));

    string? configuredDataPath = configuration["Tesseract:TessDataPath"];
    tessDataParentPath = ResolveTessDataParentPath(configuredDataPath);

    var defaults = NormalizeLanguageCodes(configuration["Tesseract:DefaultLanguage"]).ToList();
    if (defaults.Count == 0)
    {
      defaults.Add("eng");
    }

    defaultLanguageCodes = string.Join('+', defaults);
  }

  public async Task<string> ExtractTextAsync(Stream imageStream, string? languageCode = null, CancellationToken cancellationToken = default)
  {
    if (imageStream is null)
    {
      throw new ArgumentNullException(nameof(imageStream));
    }

    EnsureNotDisposed();

    await using var memoryStream = new MemoryStream();
    await imageStream.CopyToAsync(memoryStream, cancellationToken).ConfigureAwait(false);

    if (memoryStream.Length == 0)
    {
      throw new RecipeImageOcrException("The provided image is empty.");
    }

    byte[] imageBytes = memoryStream.ToArray();

    try
    {
      using Image pix = Image.LoadFromMemory(imageBytes);
      string languageCodes = GetLanguageCodes(languageCode);
      Engine engine = GetOrCreateEngine(languageCodes);

      using Page page = engine.Process(pix, PageSegMode.Auto);
      string text = page.Text ?? string.Empty;

      return text.Trim();
    }
    catch (RecipeImageOcrException)
    {
      throw;
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Failed to extract text from recipe image.");
      throw new RecipeImageOcrException("The image could not be processed. Make sure it contains readable text and tessdata files are configured correctly.", ex);
    }
  }

  private Engine GetOrCreateEngine(string languageCodes)
  {
    try
    {
      return engines.GetOrAdd(languageCodes, CreateEngine);
    }
    catch (RecipeImageOcrException)
    {
      throw;
    }
    catch (Exception ex)
    {
      throw new RecipeImageOcrException($"Failed to initialize the OCR engine for language codes '{languageCodes}'.", ex);
    }
  }

  private Engine CreateEngine(string languageCodes)
  {
    EnsureTessDataDirectoryExists();

    logger.LogInformation("Initializing Tesseract OCR engine using languages '{LanguageCodes}'", languageCodes);

    return new Engine(
      tessDataParentPath,
      languageCodes,
      EngineMode.LstmOnly,
      Enumerable.Empty<string>(),
      new Dictionary<string, object>(),
      true,
      logger);
  }

  private string GetLanguageCodes(string? languageCode)
  {
    List<string> normalized = NormalizeLanguageCodes(languageCode).ToList();

    if (normalized.Count == 0)
    {
      return defaultLanguageCodes;
    }

    return string.Join('+', normalized);
  }

      private static IEnumerable<string> NormalizeLanguageCodes(string? languageCode)
  {
    if (string.IsNullOrWhiteSpace(languageCode))
    {
      return Enumerable.Empty<string>();
    }

    var aliases = GetLanguageAliases();
    var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
    var ordered = new List<string>();

    foreach (string token in languageCode.Split(LanguageSeparators, StringSplitOptions.RemoveEmptyEntries))
    {
      string trimmed = token.Trim();

      if (aliases.TryGetValue(trimmed, out var mapped) && !string.IsNullOrWhiteSpace(mapped))
      {
        trimmed = mapped;
      }

      if (!string.IsNullOrWhiteSpace(trimmed))
      {
        string lowered = trimmed.ToLowerInvariant();
        if (seen.Add(lowered))
        {
          ordered.Add(lowered);
        }
      }
    }

    return ordered;
  }
private static Dictionary<string, string> GetLanguageAliases()
  {
    return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
      ["en"] = "eng",
      ["eng"] = "eng",
      ["english"] = "eng",
      ["pt"] = "por",
      ["pt-br"] = "por",
      ["por"] = "por",
      ["portuguese"] = "por"
    };
  }

  private static string ResolveTessDataParentPath(string? configuredPath)
  {
    string basePath = string.IsNullOrWhiteSpace(configuredPath)
      ? AppContext.BaseDirectory
      : Path.GetFullPath(configuredPath);

    string trimmed = basePath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);

    if (string.Equals(Path.GetFileName(trimmed), "tessdata", StringComparison.OrdinalIgnoreCase))
    {
      string? parent = Path.GetDirectoryName(trimmed);
      return parent ?? basePath;
    }

    return basePath;
  }

  private void EnsureTessDataDirectoryExists()
  {
    string tessDataDirectory = Path.Combine(tessDataParentPath, "tessdata");
    if (!Directory.Exists(tessDataDirectory))
    {
      throw new RecipeImageOcrException($"The tessdata directory was not found at '{tessDataDirectory}'. Configure Tesseract:TessDataPath with the parent directory that contains tessdata.");
    }
  }

  private void EnsureNotDisposed()
  {
    if (disposed)
    {
      throw new ObjectDisposedException(nameof(RecipeImageOcrService));
    }
  }

  public void Dispose()
  {
    if (disposed)
    {
      return;
    }

    foreach (Engine engine in engines.Values)
    {
      engine.Dispose();
    }

    engines.Clear();
    disposed = true;
  }
}




