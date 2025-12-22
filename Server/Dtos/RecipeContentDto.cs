using System.Collections.Generic;

namespace Server.Dtos;

public record RecipeContentDto(
  int SchemaVersion,
  string Title,
  string? Description,
  List<string> Ingredients,
  List<string> Steps,
  int? Servings,
  int? PrepMinutes,
  int? CookMinutes
);
