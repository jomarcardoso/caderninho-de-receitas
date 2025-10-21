using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
[Route("recipe")]
public class PublicRecipeController : Controller
{
  private readonly AppDbContext _context;

  public PublicRecipeController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetRecipePage(int id)
  {
    var recipe = await _context.Recipe.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
    if (recipe is null) return NotFound();
    if (!recipe.IsPublic) return NotFound();

    string title = recipe.Name ?? $"Recipe {id}";
    string description = string.IsNullOrWhiteSpace(recipe.Description) ? string.Empty : recipe.Description!;
    if (description.Length > 180) description = description.Substring(0, 177) + "...";

    string image = recipe.Imgs?.FirstOrDefault() ?? string.Empty;
    var url = $"{Request.Scheme}://{Request.Host}/recipe/{id}";
    var langAttr = recipe.Language.ToString().ToLowerInvariant();
    var ctaText = recipe.Language == Server.Shared.Language.Pt ? "Abrir no navegador" : "Open in browser";

    var sb = new System.Text.StringBuilder();
    sb.AppendLine("<!doctype html>");
    sb.AppendLine("<html lang=\"" + langAttr + "\">");
    sb.AppendLine("  <head>");
    sb.AppendLine("    <meta charset=\"utf-8\" />");
    sb.AppendLine("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />");
    sb.AppendLine("    <title>" + System.Net.WebUtility.HtmlEncode(title) + "</title>");
    sb.AppendLine("    <link rel=\"canonical\" href=\"" + url + "\" />");
    sb.AppendLine("    <meta property=\"og:title\" content=\"" + System.Net.WebUtility.HtmlEncode(title) + "\" />");
    sb.AppendLine("    <meta property=\"og:description\" content=\"" + System.Net.WebUtility.HtmlEncode(description) + "\" />");
    if (!string.IsNullOrWhiteSpace(image))
    {
      sb.AppendLine("    <meta property=\"og:image\" content=\"" + image + "\" />");
      sb.AppendLine("    <meta name=\"twitter:image\" content=\"" + image + "\" />");
    }
    sb.AppendLine("    <meta property=\"og:url\" content=\"" + url + "\" />");
    sb.AppendLine("    <meta property=\"og:type\" content=\"article\" />");
    sb.AppendLine("    <meta name=\"twitter:card\" content=\"summary_large_image\" />");
    sb.AppendLine("    <meta name=\"twitter:title\" content=\"" + System.Net.WebUtility.HtmlEncode(title) + "\" />");
    sb.AppendLine("    <meta name=\"twitter:description\" content=\"" + System.Net.WebUtility.HtmlEncode(description) + "\" />");
    sb.AppendLine("  </head>");
    sb.AppendLine("  <body>");
    sb.AppendLine("    <main>");
    sb.AppendLine("      <h1>" + System.Net.WebUtility.HtmlEncode(title) + "</h1>");
    if (!string.IsNullOrWhiteSpace(image))
    {
      sb.AppendLine("      <img alt=\"\" src=\"" + image + "\" style=\"max-width:100%;height:auto\" />");
    }
    sb.AppendLine("      <p>" + System.Net.WebUtility.HtmlEncode(description) + "</p>");
    // Deep link priority: app scheme -> PWA -> site
    var appScheme = $"recepta://recipe/{id}";
    var pwaUrl = url; // fallback to same public URL; adjust if you have a dedicated PWA route
    sb.AppendLine("      <p><a href=\"" + url + "\">" + ctaText + "</a></p>");
    sb.AppendLine("      <script>");
    sb.AppendLine("        (function(){");
    sb.AppendLine("          try {");
        sb.AppendLine("            var appUrl = '" + appScheme + "';");
        sb.AppendLine("            var webUrl = '" + url + "';");
        sb.AppendLine("            var pwaUrl = '" + pwaUrl + "';");
        sb.AppendLine("            var isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);");
        sb.AppendLine("            if (isMobile) {");
        sb.AppendLine("              var t = Date.now();");
        sb.AppendLine("              var iframe = document.createElement('iframe');");
        sb.AppendLine("              iframe.style.display = 'none';");
        sb.AppendLine("              iframe.src = appUrl;");
        sb.AppendLine("              document.body.appendChild(iframe);");
        sb.AppendLine("              setTimeout(function(){");
        sb.AppendLine("                var elapsed = Date.now() - t;");
        sb.AppendLine("                if (elapsed < 1200) { window.location.replace(pwaUrl); }");
        sb.AppendLine("              }, 1000);");
        sb.AppendLine("            }");
        sb.AppendLine("          } catch(e) { /* ignore */ }");
        sb.AppendLine("        })();");
    sb.AppendLine("      </script>");
    sb.AppendLine("    </main>");
    sb.AppendLine("  </body>");
    sb.AppendLine("</html>");

    return Content(sb.ToString(), "text/html; charset=utf-8");
  }
}
