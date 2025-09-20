using Server.Models;
using Server.Shared;

namespace Server.Dtos;

public class FoodResponse : FoodBase
{
  public EssentialAminoAcids EssentialAminoAcids { get; set; } = new();
}

public class FoodsResponse : CommonResponse
{
  public List<Food> Foods { get; set; } = new();
}
