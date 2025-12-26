namespace Server.Shared;

/// <summary>
/// Marker interface for nutrient-bearing types. Currently identical to INutrientsBase,
/// kept separate to allow future migration away from the *Base types.
/// </summary>
public interface INutrients : INutrientsBase
{
}
