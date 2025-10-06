namespace Server.Shared;

public class NutritionalInformationBase
{
  public double Acidification { get; set; } = 0;
  public double Ashes { get; set; } = 0;
  public double Calories { get; set; } = 0;
  public double Carbohydrates { get; set; } = 0;
  public double Cholesterol { get; set; } = 0;
  public double DietaryFiber { get; set; } = 0;
  public double Gi { get; set; } = 0;
  public double Gl { get; set; } = 0;
  public double MonounsaturatedFats { get; set; } = 0;
  public double PolyunsaturatedFats { get; set; } = 0;
  public double Proteins { get; set; } = 0;
  public double SaturedFats { get; set; } = 0;
  public double Sugar { get; set; }
  public double TotalFat { get; set; } = 0;

  public NutritionalInformationBase() { }

  public NutritionalInformationBase(NutritionalInformationBase nutritionalInformation, double quantity)
  {
    Ashes = nutritionalInformation.Ashes * quantity / 100;
    Acidification = nutritionalInformation.Acidification * quantity / 100;
    Calories = nutritionalInformation.Calories * quantity / 100;
    Carbohydrates = nutritionalInformation.Carbohydrates * quantity / 100;
    DietaryFiber = nutritionalInformation.DietaryFiber * quantity / 100;
    Proteins = nutritionalInformation.Proteins * quantity / 100;
    Gi = nutritionalInformation.Gi * quantity / 100;
    Gl = nutritionalInformation.Gl * quantity / 100;
    SaturedFats = nutritionalInformation.SaturedFats * quantity / 100;
    MonounsaturatedFats = nutritionalInformation.MonounsaturatedFats * quantity / 100;
    PolyunsaturatedFats = nutritionalInformation.PolyunsaturatedFats * quantity / 100;
    Cholesterol = nutritionalInformation.Cholesterol * quantity / 100;
    TotalFat = nutritionalInformation.TotalFat * quantity / 100;
  }

  public NutritionalInformationBase Add(NutritionalInformationBase nutritionalInformation)
  {
    Ashes += nutritionalInformation.Ashes;
    Acidification += nutritionalInformation.Acidification;
    Calories += nutritionalInformation.Calories;
    Carbohydrates += nutritionalInformation.Carbohydrates;
    DietaryFiber += nutritionalInformation.DietaryFiber;
    Proteins += nutritionalInformation.Proteins;
    Gi += nutritionalInformation.Gi;
    Gl += nutritionalInformation.Gl;
    SaturedFats += nutritionalInformation.SaturedFats;
    MonounsaturatedFats += nutritionalInformation.MonounsaturatedFats;
    PolyunsaturatedFats += nutritionalInformation.PolyunsaturatedFats;
    Cholesterol += nutritionalInformation.Cholesterol;
    TotalFat += nutritionalInformation.TotalFat;

    return this;
  }
}
