namespace Server.Shared;

public abstract class IngredientBase<TFood> : Nutrients
{
  public string Text { get; set; } = string.Empty;
  public TFood Food { get; set; }
  // literal quantity, in liters or grams
  public double Quantity { get; set; } = 0;
  // quantity described, cups, spoons...
  public Measure Measure { get; set; }
  public NutritionalInformation NutritionalInformation { get; set; } = new();
  public Minerals Minerals { get; set; } = new();
  public Vitamins Vitamins { get; set; } = new();
  public AminoAcids AminoAcids { get; set; } = new();

  protected IngredientBase() { }

  protected IngredientBase(
    string text,
    TFood food,
    double quantity,
    Measure measure,
    NutritionalInformation nutritionalInformation,
    Minerals minerals,
    Vitamins vitamins,
    AminoAcids aminoAcids
  )
  {
    Text = text;
    Food = food;
    Quantity = quantity;
    Measure = measure;
    NutritionalInformation = nutritionalInformation;
    Minerals = minerals;
    Vitamins = vitamins;
    AminoAcids = aminoAcids;
  }
}
