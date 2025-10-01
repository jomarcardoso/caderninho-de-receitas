using AutoMapper;
using Server.Models;
using Server.Dtos;
using Server.Shared;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    // Recipe → RecipeDto
    CreateMap<Recipe, RecipeResponseDto>()
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food.Id));

    // RecipeStep → RecipeStepDto
    CreateMap<RecipeStep, RecipeStepResponse>().ReverseMap();

    // Ingredient → IngredientResponseDto
    CreateMap<Ingredient, IngredientResponse>()
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food.Id))
      .ReverseMap()
      .ForPath(src => src.Food.Id, opt => opt.MapFrom(dest => dest.Food));

    // Food → FoodDto
    // CreateMap<Food, FoodDto>().ReverseMap();

    // Measure → MeasureDto (se tiver)
    // CreateMap<Measure, MeasureDto>().ReverseMap();

    // Nutrient mappings
    // CreateMap<NutritionalInformationType, NutrientResponse>()
    //   .ForMember(dest => dest.Index, opt => opt.MapFrom(src => (int)src))
    //   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NutrientData.GetName(src)))
    //   .ForMember(dest => dest.ShortName, opt => opt.MapFrom(src => NutrientData.GetShortName(src)))
    //   .ForMember(dest => dest.MeasurementUnit, opt => opt.MapFrom(src => NutrientData.GetMeasurementUnit(src)));

    // CreateMap<VitaminType, NutrientResponse>()
    //   .ForMember(dest => dest.Index, opt => opt.MapFrom(src => (int)src))
    //   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NutrientData.GetName(src)))
    //   .ForMember(dest => dest.ShortName, opt => opt.MapFrom(src => NutrientData.GetShortName(src)))
    //   .ForMember(dest => dest.MeasurementUnit, opt => opt.MapFrom(src => NutrientData.GetMeasurementUnit(src)));

    // CreateMap<MineralType, NutrientResponse>()
    //   .ForMember(dest => dest.Index, opt => opt.MapFrom(src => (int)src))
    //   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NutrientData.GetName(src)))
    //   .ForMember(dest => dest.ShortName, opt => opt.MapFrom(src => NutrientData.GetShortName(src)))
    //   .ForMember(dest => dest.MeasurementUnit, opt => opt.MapFrom(src => NutrientData.GetMeasurementUnit(src)));
  }
}
