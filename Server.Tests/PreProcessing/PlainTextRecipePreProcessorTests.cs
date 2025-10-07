using System;
using NUnit.Framework;
using Server.PreProcessing;

namespace Server.Tests.PreProcessing;

public class PlainTextRecipePreProcessorTests
{
  private PlainTextRecipePreProcessor preProcessor = null!;

  [SetUp]
  public void SetUp()
  {
    preProcessor = new PlainTextRecipePreProcessor();
  }

  [Test]
  public void Normalize_ReturnsSameContent_WhenAlreadyStructured()
  {
    string structured = """
Name: Pancakes
Keys: breakfast
Description: Fluffy pancakes.
Ingredients:
- Flour
Steps:
1. Mix
""".Trim();

    string result = preProcessor.Normalize(structured);

    Assert.That(result, Is.EqualTo(structured));
  }

  [Test]
  public void Normalize_ProducesStructuredText_FromGenericFormat()
  {
    string text = """
Grandma Pancakes
A family favorite breakfast recipe.
Ingredient List:
- 2 cups flour
- 1 cup milk
Directions:
Step 1: Mix ingredients.
Step 2: Cook on hot griddle.
Notes: Serve warm with syrup.
""";

    string result = preProcessor.Normalize(text);

    Assert.Multiple(() =>
    {
      Assert.That(result, Does.Contain("Name: Grandma Pancakes"));
      Assert.That(result, Does.Contain($"Ingredients:{Environment.NewLine}- 2 cups flour"));
      Assert.That(result, Does.Contain($"Steps:{Environment.NewLine}1. Mix ingredients."));
      Assert.That(result, Does.Contain("2. Cook on hot griddle."));
      Assert.That(result, Does.Contain($"Additional:{Environment.NewLine}Serve warm with syrup."));
    });
  }

  [Test]
  public void Normalize_IncludesKeys_FromTagLine()
  {
    string text = """
Best Brownies Ever
Tags: Dessert; Chocolate
Ingredients:
- Cocoa
Directions:
1. Bake.
""";

    string result = preProcessor.Normalize(text);

    Assert.That(result, Does.Contain("Keys: dessert,chocolate"));
  }

  [Test]
  public void Normalize_ThrowsWhenNameMissing()
  {
    string text = """
Ingredients:
- Flour
- Water
""";

    Assert.That(() => preProcessor.Normalize(text),
      Throws.TypeOf<PlainTextRecipePreProcessorException>()
        .With.Message.EqualTo("The recipe name could not be identified."));
  }
}





