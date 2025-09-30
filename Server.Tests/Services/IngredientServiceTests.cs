using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Server.Services;
using Server.Models;
using Server.Shared;

namespace Server.Tests.Services;

[TestFixture]
public class IngredientServiceTests
{
  private IngredientService service;
  private AppDbContext context = null!;
  private FoodService foodService;

  [SetUp]
  public void Setup()
  {
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseInMemoryDatabase(databaseName: "TestDb")
        .Options;

    context = new AppDbContext(options);
    foodService = new FoodService(context);
    service = new IngredientService(foodService);
  }

  [TearDown]
  public void TearDown()
  {
    context.Dispose();
  }

  [TestCase("feijão cozido", "", MeasureType.Unity, "feijão cozido")]

  [TestCase("1 xícara de arroz", "1 xícara", MeasureType.Cup, "de arroz")]
  [TestCase("6 1/2 xícaras de farinha", "6 1/2 xícaras", MeasureType.Cup, "de farinha")]
  [TestCase("60 1/3 xícaras de feijão", "60 1/3 xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("quatro xícaras de feijão", "quatro xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("quatro e meia xícaras de feijão", "quatro e meia xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("60 xícaras de feijão", "60 xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("6 xícaras de feijão", "6 xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("1 xícara de feijão", "1 xícara", MeasureType.Cup, "de feijão")]
  [TestCase("duas xícaras de feijão", "duas xícaras", MeasureType.Cup, "de feijão")]
  [TestCase("duas xícaras e meia de feijão", "duas xícaras e meia", MeasureType.Cup, "de feijão")]
  [TestCase("3 xícaras e dois terços de feijão", "3 xícaras e dois terços", MeasureType.Cup, "de feijão")]

  [TestCase("1 colher de arroz", "1 colher", MeasureType.Spoon, "de arroz")]
  [TestCase("6 1/2 colheres de farinha", "6 1/2 colheres", MeasureType.Spoon, "de farinha")]
  [TestCase("60 1/3 colheres de feijão", "60 1/3 colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("quatro colheres de feijão", "quatro colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("quatro e meia colheres de feijão", "quatro e meia colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("60 colheres de feijão", "60 colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("6 colheres de feijão", "6 colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("1 colher de feijão", "1 colher", MeasureType.Spoon, "de feijão")]
  [TestCase("duas colheres de feijão", "duas colheres", MeasureType.Spoon, "de feijão")]
  [TestCase("duas colheres e meia de feijão", "duas colheres e meia", MeasureType.Spoon, "de feijão")]
  [TestCase("3 colheres e dois terços de feijão", "3 colheres e dois terços", MeasureType.Spoon, "de feijão")]

  [TestCase("1 colher de sopa de arroz", "1 colher de sopa", MeasureType.Spoon, "de arroz")]
  [TestCase("6 1/2 colheres de sopa de farinha", "6 1/2 colheres de sopa", MeasureType.Spoon, "de farinha")]
  [TestCase("60 1/3 colheres de sopa de feijão", "60 1/3 colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("quatro colheres de sopa de feijão", "quatro colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("quatro e meia colheres de sopa de feijão", "quatro e meia colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("60 colheres de sopa de feijão", "60 colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("6 colheres de sopa de feijão", "6 colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("1 colher de sopa de feijão", "1 colher de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("duas colheres de sopa de feijão", "duas colheres de sopa", MeasureType.Spoon, "de feijão")]
  [TestCase("duas colheres de sopa e meia de feijão", "duas colheres de sopa e meia", MeasureType.Spoon, "de feijão")]
  [TestCase("3 colheres de sopa e dois terços de feijão", "3 colheres de sopa e dois terços", MeasureType.Spoon, "de feijão")]

  [TestCase("1 colher pequena de arroz", "1 colher pequena", MeasureType.TeaSpoon, "de arroz")]
  [TestCase("6 1/2 colheres pequena de farinha", "6 1/2 colheres pequena", MeasureType.TeaSpoon, "de farinha")]
  [TestCase("60 1/3 colheres pequena de feijão", "60 1/3 colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro colheres pequena de feijão", "quatro colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro e meia colheres pequena de feijão", "quatro e meia colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("60 colheres pequena de feijão", "60 colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("6 colheres pequena de feijão", "6 colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("1 colher pequena de feijão", "1 colher pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colheres pequena de feijão", "duas colheres pequena", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colheres pequena e meia de feijão", "duas colheres pequena e meia", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("3 colheres pequena e dois terços de feijão", "3 colheres pequena e dois terços", MeasureType.TeaSpoon, "de feijão")]

  [TestCase("1 colher de chá de arroz", "1 colher de chá", MeasureType.TeaSpoon, "de arroz")]
  [TestCase("6 1/2 colheres de chá de farinha", "6 1/2 colheres de chá", MeasureType.TeaSpoon, "de farinha")]
  [TestCase("60 1/3 colheres de chá de feijão", "60 1/3 colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro colheres de chá de feijão", "quatro colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro e meia colheres de chá de feijão", "quatro e meia colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("60 colheres de chá de feijão", "60 colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("6 colheres de chá de feijão", "6 colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("1 colher de chá de feijão", "1 colher de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colheres de chá de feijão", "duas colheres de chá", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colheres de chá e meia de feijão", "duas colheres de chá e meia", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("3 colheres de chá e dois terços de feijão", "3 colheres de chá e dois terços", MeasureType.TeaSpoon, "de feijão")]

  [TestCase("1 colherinha de arroz", "1 colherinha", MeasureType.TeaSpoon, "de arroz")]
  [TestCase("6 1/2 colherinhas de farinha", "6 1/2 colherinhas", MeasureType.TeaSpoon, "de farinha")]
  [TestCase("60 1/3 colherinhas de feijão", "60 1/3 colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro colherinhas de feijão", "quatro colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("quatro e meia colherinhas de feijão", "quatro e meia colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("60 colherinhas de feijão", "60 colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("6 colherinhas de feijão", "6 colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("1 colherinha de feijão", "1 colherinha", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colherinhas de feijão", "duas colherinhas", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("duas colherinhas e meia de feijão", "duas colherinhas e meia", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("3 colherinhas e dois terços de feijão", "3 colherinhas e dois terços", MeasureType.TeaSpoon, "de feijão")]
  [TestCase("1 abacate", "1", MeasureType.Unity, "abacate")]
  [TestCase("1 e meio abacate", "1 e meio", MeasureType.Unity, "abacate")]
  // TODO
  // [TestCase("1 abacate e meio", "1 e meio", MeasureType.Unity, "abacate")]

  [TestCase("400ml de leite", "400ml", MeasureType.Ml, "de leite")]
  [TestCase("9ml de leite", "9ml", MeasureType.Ml, "de leite")]
  [TestCase("400 ml de leite", "400 ml", MeasureType.Ml, "de leite")]
  [TestCase("9 ml de leite", "9 ml", MeasureType.Ml, "de leite")]
  [TestCase("400mililitros de leite", "400mililitros", MeasureType.Ml, "de leite")]
  [TestCase("9mililitros de leite", "9mililitros", MeasureType.Ml, "de leite")]
  [TestCase("400 mililitros de leite", "400 mililitros", MeasureType.Ml, "de leite")]
  [TestCase("9 mililitros de leite", "9 mililitros", MeasureType.Ml, "de leite")]
  [TestCase("400ml de leite", "400ml", MeasureType.Ml, "de leite")]

  [TestCase("9l de leite", "9l", MeasureType.Liter, "de leite")]
  [TestCase("400 l de leite", "400 l", MeasureType.Liter, "de leite")]
  [TestCase("9 l de leite", "9 l", MeasureType.Liter, "de leite")]
  [TestCase("400litros de leite", "400litros", MeasureType.Liter, "de leite")]
  [TestCase("9litros de leite", "9litros", MeasureType.Liter, "de leite")]
  [TestCase("400 litros de leite", "400 litros", MeasureType.Liter, "de leite")]
  [TestCase("9 litros de leite", "9 litros", MeasureType.Liter, "de leite")]
  [TestCase("9 litros e meio de leite", "9 litros e meio", MeasureType.Liter, "de leite")]

  [TestCase("200 gramas de queijo", "200 gramas", MeasureType.Gram, "de queijo")]
  [TestCase("200g de queijo", "200g", MeasureType.Gram, "de queijo")]
  [TestCase("1g de queijo", "1g", MeasureType.Gram, "de queijo")]
  [TestCase("1 grama de queijo", "1 grama", MeasureType.Gram, "de queijo")]

  [TestCase("1 kilo de queijo", "1 kilo", MeasureType.Kilo, "de queijo")]
  [TestCase("2 kilos de queijo", "2 kilos", MeasureType.Kilo, "de queijo")]
  [TestCase("20 kilos de queijo", "20 kilos", MeasureType.Kilo, "de queijo")]
  [TestCase("3 e meio kilos de queijo", "3 e meio kilos", MeasureType.Kilo, "de queijo")]
  [TestCase("3 kilos e meio de queijo", "3 kilos e meio", MeasureType.Kilo, "de queijo")]
  [TestCase("3 kilos e 1/2 de queijo", "3 kilos e 1/2", MeasureType.Kilo, "de queijo")]

  [TestCase("1 lata de molho de tomate", "1 lata", MeasureType.Can, "de molho de tomate")]
  [TestCase("duas latas de molho de tomate", "duas latas", MeasureType.Can, "de molho de tomate")]
  [TestCase("2 latas de molho de tomate", "2 latas", MeasureType.Can, "de molho de tomate")]
  [TestCase("20 latas de molho de tomate", "20 latas", MeasureType.Can, "de molho de tomate")]
  [TestCase("3 e meio latas de molho de tomate", "3 e meio latas", MeasureType.Can, "de molho de tomate")]
  [TestCase("3 latas e meio de molho de tomate", "3 latas e meio", MeasureType.Can, "de molho de tomate")]
  [TestCase("3 latas e 1/2 de molho de tomate", "3 latas e 1/2", MeasureType.Can, "de molho de tomate")]

  [TestCase("1 copo de água", "1 copo", MeasureType.Glass, "de água")]
  [TestCase("duas copos de água", "duas copos", MeasureType.Glass, "de água")]
  [TestCase("2 copos de água", "2 copos", MeasureType.Glass, "de água")]
  [TestCase("20 copos de água", "20 copos", MeasureType.Glass, "de água")]
  [TestCase("3 e meio copos de água", "3 e meio copos", MeasureType.Glass, "de água")]
  [TestCase("3 copos e meio de água", "3 copos e meio", MeasureType.Glass, "de água")]
  [TestCase("3 copos e 1/2 de água", "3 copos e 1/2", MeasureType.Glass, "de água")]

  [TestCase("1 fatia de pão", "1 fatia", MeasureType.Slice, "de pão")]
  [TestCase("duas fatias de pão", "duas fatias", MeasureType.Slice, "de pão")]
  [TestCase("2 fatias de pão", "2 fatias", MeasureType.Slice, "de pão")]
  [TestCase("20 fatias de pão", "20 fatias", MeasureType.Slice, "de pão")]
  [TestCase("3 e meio fatias de pão", "3 e meio fatias", MeasureType.Slice, "de pão")]
  [TestCase("3 fatias e meio de pão", "3 fatias e meio", MeasureType.Slice, "de pão")]
  [TestCase("3 fatias e 1/2 de pão", "3 fatias e 1/2", MeasureType.Slice, "de pão")]

  [TestCase("uma pitada de sal", "uma pitada", MeasureType.Pinch, "de sal")]
  [TestCase("1 cup of rice", "1 cup", MeasureType.Cup, "of rice")]
  [TestCase("two tablespoons of sugar", "two tablespoons", MeasureType.Spoon, "of sugar")]
  [TestCase("3 tsp of salt", "3 tsp", MeasureType.TeaSpoon, "of salt")]
  [TestCase("half a cup of milk", "half a cup", MeasureType.Cup, "of milk")]
  [TestCase("a pinch of pepper", "a pinch", MeasureType.Pinch, "of pepper")]
  [TestCase("2 cloves of garlic", "2 cloves", MeasureType.Clove, "of garlic")]
  [TestCase("1 can of tomatoes", "1 can", MeasureType.Can, "of tomatoes")]
  [TestCase("3 slices of bread", "3 slices", MeasureType.Slice, "of bread")]
  [TestCase("1 glass of water", "1 glass", MeasureType.Glass, "of water")]
  [TestCase("large apple", "", MeasureType.UnityLarge, "large apple")]
  [TestCase("small chili pepper", "", MeasureType.UnitySmall, "small chili pepper")]
  [TestCase("Salt to taste", "to taste", MeasureType.Literal, "Salt")]
  [TestCase("Bay leaves (for each pot)", "(for each pot)", MeasureType.Literal, "Bay leaves")]
  public void SplitTextInMeasureAndRest(string input, string expectedMeasure, MeasureType expectedMeasureType, string expectedRest)
  {
    service.Text = input;
    var result = service.SplitTextInMeasureAndRest();

    Assert.That(result.MeasureText, Is.EqualTo(expectedMeasure));
    Assert.That(result.MeasureType, Is.EqualTo(expectedMeasureType));
    Assert.That(result.Rest, Is.EqualTo(expectedRest));
  }

  [TestCase("1 xícara", 1d)]
  [TestCase("6 1/2 xícaras", 6.5d)]
  [TestCase("quatro e meia xícaras", 4.5d)]
  [TestCase("duas colheres e meia", 2.5d)]
  [TestCase("3 colheres e dois terços", 3.6666666667d)]
  [TestCase("1/2 xícara", 0.5d)]
  [TestCase("meia colher", 0.5d)]
  [TestCase("um terço de xícara", 0.3333333333d)]
  [TestCase("dois terços de xícara", 0.6666666667d)]
  [TestCase("3/4 xícara", 0.75d)]
  [TestCase("200 gramas", 200d)]
  [TestCase("1g", 1d)]
  [TestCase("3 kilos e meio", 3.5d)]
  [TestCase("0,5 litro", 0.5d)]
  [TestCase("", 1d)]
  [TestCase(null, 1d)]
  [TestCase("one and a half cups", 1.5d)]
  [TestCase("half cup", 0.5d)]
  [TestCase("three quarters cup", 0.75d)]
  [TestCase("two thirds cup", 0.6666666667d)]
  [TestCase("a couple of cups", 2d)]
  [TestCase("1.5 cups", 1.5d)]
  public void ParseMeasureQuantity_ParsesExpectedValue(string? measureText, double expected)
  {
    var result = IngredientService.ParseMeasureQuantity(measureText);

    Assert.That(result, Is.EqualTo(expected).Within(0.0001));
  }
}
