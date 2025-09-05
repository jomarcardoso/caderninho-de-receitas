using Server.Shared;

namespace Server.Dtos;


public class IngredientDto
{
  public string Text { get; set; } = string.Empty;
}

public class IngredientResponseDto : IngredientBase<int> { }
