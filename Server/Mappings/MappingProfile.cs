using AutoMapper;
using Server.Models;
using Server.Dtos;
using Server.Response;
using Server.Shared;
using System.Linq;
using Server.Services;

public class MappingProfile : Profile
{
  private static UserProfileSummaryResponse MapUserSummary(UserProfile? owner, string fallbackId)
  {
    if (owner is null) return new UserProfileSummaryResponse { Id = fallbackId, DisplayName = fallbackId };

    return UserProfileResponseBuilder.BuildSummary(owner, isAdmin: false, callerId: null);
  }

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
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food))
      .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => (src.Categories ?? new List<string>()).ToList()))
      .ForMember(dest => dest.NutritionalInformation, opt => opt.MapFrom(src => src.NutritionalInformation))
      .ForMember(dest => dest.Minerals, opt => opt.MapFrom(src => src.Minerals))
      .ForMember(dest => dest.Vitamins, opt => opt.MapFrom(src => src.Vitamins))
      .ForMember(dest => dest.AminoAcids, opt => opt.MapFrom(src => src.AminoAcids))
      .ForMember(dest => dest.EssentialAminoAcids, opt => opt.MapFrom(src => src.EssentialAminoAcids))
      .ForMember(dest => dest.IsPublic, opt => opt.MapFrom(src => src.IsPublic))
      .ForMember(dest => dest.Owner, opt => opt.MapFrom(src => MapUserSummary(src.Owner, src.OwnerId)));

    CreateMap<Recipe, RecipeSummaryResponse>()
      .ForMember(dest => dest.Name, opt => opt.MapFrom(src =>
        src.LatestRevision != null ? src.LatestRevision.Name :
        src.PublishedRevision != null ? src.PublishedRevision.Name :
        src.Name))
      .ForMember(dest => dest.Imgs, opt => opt.MapFrom(src => src.Imgs ?? new List<string>()))
      .ForMember(dest => dest.Owner, opt => opt.MapFrom(src => MapUserSummary(src.Owner, src.OwnerId)))
      .ForMember(dest => dest.NutritionalInformation, opt => opt.MapFrom(src => src.NutritionalInformation))
      .ForMember(dest => dest.IsPublic, opt => opt.MapFrom(src => src.IsPublic))
      .ForMember(dest => dest.IsOwner, opt => opt.Ignore());

    CreateMap<RecipeStep, RecipeStepResponse>().ReverseMap();

    CreateMap<Ingredient, IngredientResponse>()
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food))
      .ReverseMap();

    CreateMap<Food, FoodDto>().ReverseMap();
    CreateMap<Food, FoodResponse>();
    CreateMap<Food, FoodSummaryResponse>().ReverseMap();
  }
}
