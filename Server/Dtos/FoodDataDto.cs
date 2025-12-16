using Server.Models;

namespace Server.Dtos;

public class FoodResponse : Food { }

public class FoodsDataResponse : CommonDataResponse
{
  public List<Food> Foods { get; set; } = new();
}
