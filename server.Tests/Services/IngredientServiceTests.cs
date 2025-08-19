using NUnit.Framework;
using server.Services.Ingredient;

namespace server.Tests.Services
{
    [TestFixture]
    public class IngredientServiceTests
    {
        [Test]
        public void Test_DeveRetornarResultadoEsperado()
        {
            // Arrange
            var service = new IngredientService();

            // Act
            var resultado = service.Test();

            // Assert
            Assert.AreEqual("resultado esperado", resultado);
        }
    }
}
