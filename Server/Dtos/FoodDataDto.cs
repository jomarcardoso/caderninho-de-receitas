using Server.Models;
using Server.Response;

namespace Server.Dtos;

public class FoodsDataResponse : CommonDataResponse
{
  public List<FoodResponse> Foods { get; set; } = new();
}
