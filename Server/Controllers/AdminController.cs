using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AdminController : ControllerBase
{
  private static string LogFilePath => Path.Combine(AppContext.BaseDirectory, "logs", "food-match-low-confidence.jsonl");

  [HttpGet("food-matches/low-confidence")]
  public IActionResult GetLowConfidenceMatches([FromQuery] int quantity = 50)
  {
    quantity = Math.Clamp(quantity, 1, 500);

    if (!System.IO.File.Exists(LogFilePath))
    {
      return Ok(Array.Empty<object>());
    }

    try
    {
      var lines = System.IO.File.ReadAllLines(LogFilePath);
      var take = Math.Min(quantity, lines.Length);
      var slice = lines.Reverse().Take(take).Reverse().ToArray();

      var list = new List<object>(slice.Length);
      foreach (var line in slice)
      {
        try
        {
          var doc = JsonDocument.Parse(line);
          list.Add(JsonSerializer.Deserialize<object>(doc.RootElement.GetRawText())!);
        }
        catch
        {
          // If a line is malformed, include raw line for diagnostics
          list.Add(new { raw = line });
        }
      }

      return Ok(list);
    }
    catch
    {
      return StatusCode(500, new { error = "Failed to read low confidence log." });
    }
  }
}

