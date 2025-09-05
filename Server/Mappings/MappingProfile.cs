using AutoMapper;
using Server.Models;
using Server.Dtos;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    // Recipe ↔ RecipeDto
    CreateMap<Recipe, RecipeResponseDto>().ReverseMap();

    // RecipeStep ↔ RecipeStepDto
    CreateMap<RecipeStep, RecipeStepResponseDto>().ReverseMap();

    // Ingredient ↔ IngredientResponseDto
    CreateMap<Ingredient, IngredientResponseDto>()
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food.Id))
      .ReverseMap()
      .ForPath(src => src.Food.Id, opt => opt.MapFrom(dest => dest.Food));

    // Food ↔ FoodDto
    // CreateMap<Food, FoodDto>().ReverseMap();

    // Measure ↔ MeasureDto (se tiver)
    // CreateMap<Measure, MeasureDto>().ReverseMap();
  }
}
