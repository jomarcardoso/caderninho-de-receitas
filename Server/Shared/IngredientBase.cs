namespace Server.Shared;

public abstract class IngredientBase<TFood> : INutrientsBase
{
  public string Text { get; set; } = string.Empty;
  public TFood Food { get; set; }
  // literal quantity, in liters or grams
  public double Quantity { get; set; } = 0;
  // quantity described, cups, spoons...
  public MeasureType MeasureType { get; set; } = MeasureType.Unity;
  public double MeasureQuantity { get; set; } = 0;
  public NutritionalInformationBase NutritionalInformation { get; set; } = new();
  public MineralsBase Minerals { get; set; } = new();
  public VitaminsBase Vitamins { get; set; } = new();
  public AminoAcidsBase AminoAcids { get; set; } = new();

  protected IngredientBase() { }

  protected IngredientBase(
    string text,
    TFood food,
    double quantity,
    MeasureType measureType,
    double measureQuantity,
    NutritionalInformationBase nutritionalInformation,
    MineralsBase minerals,
    VitaminsBase vitamins,
    AminoAcidsBase aminoAcids
  )
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    MeasureType = measureType;
    MeasureQuantity = measureQuantity;
    NutritionalInformation = nutritionalInformation;
    Minerals = minerals;
    Vitamins = vitamins;
    AminoAcids = aminoAcids;
  }
}
