using Microsoft.ML;
using Microsoft.ML.Data;

namespace server.Services.Recipe
{
    public class Ia
    {
    }

    public class HouseData
    {
        public float Size { get; set; }
        public float Price { get; set; }
    }

    // Resultado da previsão
    public class Prediction
    {
        [ColumnName("Score")]
        public float Price { get; set; }
    }

    class Program
    {
        static void Main()
        {
            var mlContext = new MLContext();

            var data = new[]
            {
            new HouseData { Size = 1.1F, Price = 1.2F },
            new HouseData { Size = 1.9F, Price = 2.3F },
            new HouseData { Size = 2.8F, Price = 3.0F },
        };

            var trainingData = mlContext.Data.LoadFromEnumerable(data);

            var pipeline = mlContext.Transforms.Concatenate("Features", "Size")
                .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "Price", maximumNumberOfIterations: 100));

            var model = pipeline.Fit(trainingData);

            var predictionFunction = mlContext.Model.CreatePredictionEngine<HouseData, Prediction>(model);

            var sizeToPredict = new HouseData { Size = 2.5F };
            var prediction = predictionFunction.Predict(sizeToPredict);

            Console.WriteLine($"Predicted price for size: {sizeToPredict.Size} is {prediction.Price}");
        }
    }
}
