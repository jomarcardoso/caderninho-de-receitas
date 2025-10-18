using Server.Models;

namespace Server.Dtos;

public class FoodResponse : Food { }

public class FoodsResponse : CommonResponse
{
  public List<Food> Foods { get; set; } = new();
  public Dictionary<string, string> FoodIcons { get; set; } = new();
}
