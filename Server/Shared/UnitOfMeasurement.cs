using System.Text.Json.Serialization;

namespace Server.Shared;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MeasurementUnit
{
  Gram,
  Liter,
}
