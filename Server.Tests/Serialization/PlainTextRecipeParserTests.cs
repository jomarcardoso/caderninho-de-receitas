using System;
using NUnit.Framework;
using Server.Dtos;
using Server.Serialization;

namespace Server.Tests.Serialization;

public class PlainTextRecipeParserTests
{
  private PlainTextRecipeParser parser = null!;

  [SetUp]
  public void SetUp()
  {
    parser = new PlainTextRecipeParser();
  }

  [Test]
  public void Parse_ReturnsNormalizedDto_WhenJsonPayloadProvided()
  {
    string json = @"{
  ""name"": ""  Chocolate Cake  "",
  ""keys"": ""Dessert"",
  ""description"": ""  Decadent and moist  "",
  ""additional"": ""  Serve with ice cream  "",
  ""steps"": [
    {
      ""title"": ""  Mix Batter  "",
      ""preparation"": ""   Combine dry and wet ingredients   "",
      ""additional"": ""  Optional nuts  "",
      ""ingredientsText"": ""  flour\n sugar  ""
    }
  ]
}";

    RecipeDto result = parser.Parse(json);

    Assert.Multiple(() =>
    {
      Assert.That(result.Name, Is.EqualTo("Chocolate Cake"));
      Assert.That(result.Keys, Is.EqualTo("Dessert"));
      Assert.That(result.Description, Is.EqualTo("Decadent and moist"));
      Assert.That(result.Additional, Is.EqualTo("Serve with ice cream"));
      Assert.That(result.Steps, Has.Count.EqualTo(1));
      Assert.That(result.Steps[0].Title, Is.EqualTo("Mix Batter"));
      Assert.That(result.Steps[0].Preparation, Is.EqualTo("Combine dry and wet ingredients"));
      Assert.That(result.Steps[0].Additional, Is.EqualTo("Optional nuts"));
      Assert.That(result.Steps[0].IngredientsText, Is.EqualTo("flour\n sugar"));
    });
  }

  [Test]
  public void Parse_StructuredPlainText_ExtractsSections()
  {
    string text = @"Name: Tomato Soup
Keys: Soup; Tomato
Description: Warm soup for cold days
Ingredients:
- Tomatoes
- Water
Steps:
1. Chop tomatoes.
Step 2: Simmer for 20 minutes.
Additional:
Serve hot.
";

    RecipeDto result = parser.Parse(text);

    Assert.Multiple(() =>
    {
      Assert.That(result.Name, Is.EqualTo("Tomato Soup"));
      Assert.That(result.Keys, Is.EqualTo("soup,tomato"));
      Assert.That(result.Description, Is.EqualTo("Warm soup for cold days"));
      Assert.That(result.Additional, Is.EqualTo("Serve hot."));
      Assert.That(result.Steps, Has.Count.EqualTo(2));
      Assert.That(result.Steps[0].Title, Is.EqualTo("Step 1"));
      Assert.That(result.Steps[0].Preparation, Is.EqualTo("1. Chop tomatoes."));
      Assert.That(result.Steps[0].IngredientsText, Is.EqualTo(string.Join(Environment.NewLine, "Tomatoes", "Water")));
      Assert.That(result.Steps[1].Title, Is.EqualTo("Step 2"));
      Assert.That(result.Steps[1].Preparation, Is.EqualTo("Simmer for 20 minutes."));
    });
  }

  [Test]
  public void Parse_ThrowsWhenPayloadEmpty()
  {
    Assert.That(
      () => parser.Parse("   "),
      Throws.TypeOf<PlainTextRecipeParserException>()
        .With.Message.EqualTo("Recipe content must not be empty."));
  }

  [Test]
  public void Parse_ThrowsWhenNameMissing()
  {
    string text = @"Description: Missing name example
Ingredients:
- Flour
- Water";

    Assert.That(
      () => parser.Parse(text),
      Throws.TypeOf<PlainTextRecipeParserException>()
        .With.Message.EqualTo("The recipe name could not be identified."));
  }
}
