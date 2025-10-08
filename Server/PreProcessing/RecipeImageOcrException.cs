namespace Server.PreProcessing;

public class RecipeImageOcrException : Exception
{
  public RecipeImageOcrException(string message) : base(message)
  {
  }

  public RecipeImageOcrException(string message, Exception innerException) : base(message, innerException)
  {
  }
}

