namespace Server.Shared;

public enum Visibility
{
  Private = 0,
  Unlisted = 1,
  Public = 2,
}

public enum TombstoneStatus
{
  Active = 0,
  RemovedByAuthor = 1,
  PolicyRemoved = 3,
}
