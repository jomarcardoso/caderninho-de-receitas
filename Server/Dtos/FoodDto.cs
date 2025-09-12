using Server.Models;

namespace Server.Dtos;

public class FoodsDto : CommonDto
{
  public List<Food> Foods { get; set; } = new();
}
