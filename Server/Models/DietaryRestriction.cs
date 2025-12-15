namespace Server.Models;

// Enum sets for dietary restrictions so we can reuse them across entities and DTOs.
public enum AllergyRestriction
{
  Peanut,
  TreeNuts,
  Milk,
  Egg,
  Wheat,
  Soy,
  Fish,
  Shellfish,
  Sesame,
  Corn,
  Mustard,
  Celery,
  Sulfite,
  Cocoa,
  Gelatin,
}

public enum IntoleranceRestriction
{
  Lactose,
  GlutenSensitive,
  Fructose,
  Histamine,
  FriedFatty,
  SimpleSugars,
  Caffeine,
}

public enum MedicalRestriction
{
  Diabetes,
  Prediabetes,
  HighCholesterol,
  HighTriglycerides,
  Hypertension,
  KidneyDisease,
  Celiac,
  Ibs,
  Gerd,
  Gastritis,
  Crohn,
  UlcerativeColitis,
}

public enum DietStyleRestriction
{
  Vegetarian,
  Vegan,
  OvoLacto,
  Pescetarian,
  LowCarb,
  Keto,
  Paleo,
  Mediterranean,
  Whole30,
  LowFodmap,
  HighProtein,
  PlantBased,
}

public enum CulturalRestriction
{
  Kosher,
  Halal,
  Hindu,
  Buddhist,
  Adventist,
}

public enum PersonalPreferenceRestriction
{
  NoSpicy,
  NoVerySweet,
  NoFried,
  NoAlcohol,
  NoRedMeat,
  NoWhiteMeat,
}
