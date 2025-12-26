using AutoMapper;
using Server.Models;
using Server.Dtos;
using Server.Response;
using Server.Shared;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<Recipe, RecipeResponse>()
      .ForMember(dest => dest.Name, opt => opt.MapFrom(src =>
        src.LatestRevision != null ? src.LatestRevision.Name :
        src.PublishedRevision != null ? src.PublishedRevision.Name :
        src.Name))
      .ForMember(dest => dest.Keys, opt => opt.MapFrom(src =>
        src.LatestRevision != null ? src.LatestRevision.Keys :
        src.PublishedRevision != null ? src.PublishedRevision.Keys :
        src.Keys))
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food != null ? src.Food.Id : 0))
      .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => (src.Categories ?? new List<string>()).ToList()))
      .ForMember(dest => dest.NutritionalInformation, opt => opt.MapFrom(src => src.NutritionalInformation))
      .ForMember(dest => dest.Minerals, opt => opt.MapFrom(src => src.Minerals))
      .ForMember(dest => dest.Vitamins, opt => opt.MapFrom(src => src.Vitamins))
      .ForMember(dest => dest.AminoAcids, opt => opt.MapFrom(src => src.AminoAcids))
      .ForMember(dest => dest.EssentialAminoAcids, opt => opt.MapFrom(src => src.EssentialAminoAcids))
      .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Owner != null
        ? new AuthorSummary
        {
          Id = src.Owner.OwnerId,
          DisplayName = string.IsNullOrWhiteSpace(src.Owner.DisplayName) ? src.Owner.OwnerId : src.Owner.DisplayName,
          PictureUrl = src.Owner.PictureUrl
        }
        : new AuthorSummary { Id = src.OwnerId, DisplayName = src.OwnerId }));

    CreateMap<RecipeStep, RecipeStepResponse>().ReverseMap();

    CreateMap<Ingredient, IngredientResponse>()
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food))
      .ReverseMap();

    CreateMap<Food, FoodDto>().ReverseMap();
    CreateMap<Food, FoodResponse>();
    CreateMap<Food, FoodSummaryResponse>().ReverseMap();
  }
}
