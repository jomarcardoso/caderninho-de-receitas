using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Server.Services;

public interface IImageOptimizationService
{
  Task<ImageValidationResult> ValidateAsync(Stream input, CancellationToken cancellationToken = default);

  Task<ImageProcessResult> ToWebpAsync(Stream input, WebpOptions options, CancellationToken cancellationToken = default);

  Task<ImageProcessResult> ResizeAndWebpAsync(Stream input, int maxWidth, int maxHeight, WebpOptions options, CancellationToken cancellationToken = default);
}

public record WebpOptions
{
  public int Quality { get; init; } = 50;
  public WebpEncodingMethod Method { get; init; } = WebpEncodingMethod.Default;
  public bool NearLossless { get; init; } = false;
  public bool StripMetadata { get; init; } = true;
}

public record ImageProcessResult(Stream Output, int Width, int Height, string ContentType);

public record ImageValidationResult(bool IsValid, string? Reason)
{
  public static ImageValidationResult Ok() => new(true, null);

  public static ImageValidationResult Fail(string reason) => new(false, reason);
}

public sealed class ImageOptimizationService : IImageOptimizationService
{
  private static readonly HashSet<string> SupportedExtensions = new(StringComparer.OrdinalIgnoreCase)
  {
    "jpg", "jpeg", "png", "bmp", "gif", "webp"
  };

  private const long DefaultMaxLengthBytes = 10 * 1024 * 1024;
  private const string WebpContentType = "image/webp";

  public async Task<ImageValidationResult> ValidateAsync(Stream input, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(input);

    if (!input.CanSeek)
    {
      return ImageValidationResult.Fail("Input stream must support seeking");
    }

    if (input.Length > DefaultMaxLengthBytes)
    {
      return ImageValidationResult.Fail("File too large");
    }

    input.Position = 0;
    IImageFormat? format = await Image.DetectFormatAsync(input, cancellationToken);
    input.Position = 0;

    if (format is null)
    {
      return ImageValidationResult.Fail("Unsupported format");
    }

    var extension = format.FileExtensions.FirstOrDefault();
    if (extension is null || !SupportedExtensions.Contains(extension))
    {
      return ImageValidationResult.Fail("Unsupported format");
    }

    return ImageValidationResult.Ok();
  }

  public async Task<ImageProcessResult> ToWebpAsync(Stream input, WebpOptions options, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(input);
    ArgumentNullException.ThrowIfNull(options);
    EnsureSeekable(input);

    input.Position = 0;
    using var image = await Image.LoadAsync(input, cancellationToken);
    PrepareMetadata(image, options);
    var encoder = CreateEncoder(options);

    var output = new MemoryStream();
    await image.SaveAsync(output, encoder, cancellationToken);
    output.Position = 0;

    return new ImageProcessResult(output, image.Width, image.Height, WebpContentType);
  }

  public async Task<ImageProcessResult> ResizeAndWebpAsync(Stream input, int maxWidth, int maxHeight, WebpOptions options, CancellationToken cancellationToken = default)
  {
    ArgumentNullException.ThrowIfNull(input);
    ArgumentNullException.ThrowIfNull(options);
    EnsureSeekable(input);

    input.Position = 0;
    using var image = await Image.LoadAsync(input, cancellationToken);

    if (image.Width > maxWidth || image.Height > maxHeight)
    {
      image.Mutate(ctx => ctx.Resize(new ResizeOptions
      {
        Mode = ResizeMode.Max,
        Size = new Size(maxWidth, maxHeight),
        Sampler = KnownResamplers.Lanczos3
      }));
    }

    PrepareMetadata(image, options);
    var encoder = CreateEncoder(options);

    var output = new MemoryStream();
    await image.SaveAsync(output, encoder, cancellationToken);
    output.Position = 0;

    return new ImageProcessResult(output, image.Width, image.Height, WebpContentType);
  }

  private static void EnsureSeekable(Stream input)
  {
    if (!input.CanSeek)
    {
      throw new InvalidOperationException("Input stream must support seeking");
    }
  }

  private static void PrepareMetadata(Image image, WebpOptions options)
  {
    if (options.StripMetadata)
    {
      image.Metadata.ExifProfile = null;
      image.Metadata.IptcProfile = null;
      image.Metadata.XmpProfile = null;
    }
  }

  private static WebpEncoder CreateEncoder(WebpOptions options)
  {
    return new WebpEncoder
    {
      FileFormat = WebpFileFormatType.Lossy,
      Quality = options.Quality,
      Method = options.Method,
      NearLossless = options.NearLossless
    };
  }
}
