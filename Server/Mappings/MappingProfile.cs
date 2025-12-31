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
      .ForMember(dest => dest.Food, opt => opt.MapFrom(src => src.Food))
      .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => (src.Categories ?? new List<string>()).ToList()))
      .ForMember(dest => dest.NutritionalInformation, opt => opt.MapFrom(src => src.NutritionalInformation))
      .ForMember(dest => dest.Minerals, opt => opt.MapFrom(src => src.Minerals))
      .ForMember(dest => dest.Vitamins, opt => opt.MapFrom(src => src.Vitamins))
      .ForMember(dest => dest.AminoAcids, opt => opt.MapFrom(src => src.AminoAcids))
      .ForMember(dest => dest.EssentialAminoAcids, opt => opt.MapFrom(src => src.EssentialAminoAcids))
      .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Owner != null
        ? new AuthorSummaryResponse
        {
          Id = src.Owner.Id,
          Name = string.IsNullOrWhiteSpace(src.Owner.DisplayName) ? src.Owner.Id : src.Owner.DisplayName,
          Img = src.Owner.PictureUrl
        }
        : new AuthorSummaryResponse { Id = src.OwnerId, Name = src.OwnerId }));

    CreateMap<Recipe, RecipeSummaryResponse>()
      .ForMember(dest => dest.Name, opt => opt.MapFrom(src =>
        src.LatestRevision != null ? src.LatestRevision.Name :
        src.PublishedRevision != null ? src.PublishedRevision.Name :
        src.Name))
      .ForMember(dest => dest.Imgs, opt => opt.MapFrom(src => src.Imgs ?? new List<string>()))
      .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Owner != null
        ? new AuthorSummaryResponse
        {
          Id = src.Owner.Id,
          Name = string.IsNullOrWhiteSpace(src.Owner.DisplayName) ? src.Owner.Id : src.Owner.DisplayName,
          Img = src.Owner.PictureUrl
        }
        : new AuthorSummaryResponse { Id = src.OwnerId, Name = src.OwnerId }))
      .ForMember(dest => dest.NutritionalInformation, opt => opt.MapFrom(src => src.NutritionalInformation))
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
