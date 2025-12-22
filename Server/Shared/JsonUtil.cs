using System.Text.Json;

namespace Server.Shared;

public static class JsonUtil
{
  private static readonly JsonSerializerOptions Options = new() { WriteIndented = false };

  public static string ToJson<T>(T obj) => JsonSerializer.Serialize(obj, Options);

  public static T FromJson<T>(string json) =>
    JsonSerializer.Deserialize<T>(json, Options)
    ?? throw new InvalidOperationException("Invalid JSON payload.");
}
