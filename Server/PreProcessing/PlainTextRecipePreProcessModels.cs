namespace Server.PreProcessing;

public class PlainTextRecipePreProcessRequest
{
  public string Content { get; set; } = string.Empty;
}

public class PlainTextRecipePreProcessResponse
{
  public string StructuredContent { get; set; } = string.Empty;
}
