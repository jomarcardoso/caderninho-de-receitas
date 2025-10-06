using Server.Shared;

namespace Server.Dtos;

public static class MeasureData
{
  public static readonly Dictionary<MeasureType, LanguageTextAndPluralBase> Map = new()
  {
    { MeasureType.Cup, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Cup", Pt = "Xícara" }, PluralText = new LanguageTextBase { En = "Cups", Pt = "Xícaras" } } },
    { MeasureType.Spoon, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Tablespoon", Pt = "Colher de Sopa" }, PluralText = new LanguageTextBase { En = "Tablespoons", Pt = "Colheres de Sopa" } } },
    { MeasureType.TeaSpoon, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Teaspoon", Pt = "Colher de Chá" }, PluralText = new LanguageTextBase { En = "Teaspoons", Pt = "Colheres de Chá" } } },
    { MeasureType.Unity, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Unit", Pt = "Unidade" }, PluralText = new LanguageTextBase { En = "Units", Pt = "Unidades" } } },
    { MeasureType.UnitySmall, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Small Unit", Pt = "Unidade Pequena" }, PluralText = new LanguageTextBase { En = "Small Units", Pt = "Unidades Pequenas" } } },
    { MeasureType.UnityLarge, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Large Unit", Pt = "Unidade Grande" }, PluralText = new LanguageTextBase { En = "Large Units", Pt = "Unidades Grandes" } } },
    { MeasureType.Literal, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Literal", Pt = "Literal" }, PluralText = new LanguageTextBase { En = "Literals", Pt = "Literais" } } },
    { MeasureType.Can, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Can", Pt = "Lata" }, PluralText = new LanguageTextBase { En = "Cans", Pt = "Latas" } } },
    { MeasureType.Glass, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Glass", Pt = "Copo" }, PluralText = new LanguageTextBase { En = "Glasses", Pt = "Copos" } } },
    { MeasureType.Breast, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Breast", Pt = "Peito" }, PluralText = new LanguageTextBase { En = "Breasts", Pt = "Peitos" } } },
    { MeasureType.Clove, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Clove", Pt = "Dente" }, PluralText = new LanguageTextBase { En = "Cloves", Pt = "Dentes" } } },
    { MeasureType.Slice, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Slice", Pt = "Fatia" }, PluralText = new LanguageTextBase { En = "Slices", Pt = "Fatias" } } },
    { MeasureType.Bunch, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Bunch", Pt = "Maço" }, PluralText = new LanguageTextBase { En = "Bunches", Pt = "Maços" } } },
    { MeasureType.Ml, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Milliliter", Pt = "Mililitro" }, PluralText = new LanguageTextBase { En = "Milliliters", Pt = "Mililitros" } } },
    { MeasureType.Liter, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Liter", Pt = "Litro" }, PluralText = new LanguageTextBase { En = "Liters", Pt = "Litros" } } },
    { MeasureType.Gram, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Gram", Pt = "Grama" }, PluralText = new LanguageTextBase { En = "Grams", Pt = "Gramas" } } },
    { MeasureType.Kilo, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Kilogram", Pt = "Quilo" }, PluralText = new LanguageTextBase { En = "Kilograms", Pt = "Quilos" } } },
    { MeasureType.Pinch, new LanguageTextAndPluralBase { Text = new LanguageTextBase { En = "Pinch", Pt = "Pitada" }, PluralText = new LanguageTextBase { En = "Pinches", Pt = "Pitadas" } } }
  };

  public static readonly List<LanguageTextAndPluralBase> List = Map.Values
    // .OrderBy(m => m.Type)
    .ToList();

  static MeasureData()
  {
    var allEnumValues = Enum.GetValues<MeasureType>();
    var missing = allEnumValues.Except(Map.Keys).ToList();
    if (missing.Any())
    {
      throw new InvalidOperationException(
        $"MeasureData.Map is missing mappings for: {string.Join(", ", missing)}");
    }
  }
}
