namespace Server.Dtos;

public class RecipeStepDto
{
  public string name { get; set; }
  public string ingredients { get; set; }
  public string preparation { get; set; }
  public string additional { get; set; }
}

public class RecipeDto
{
  public int id { get; set; }
  public string name { get; set; }
  public string description { get; set; }
  public string additional { get; set; }
  public List<RecipeStepDto> steps { get; set; }
}