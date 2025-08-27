using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
  /// <inheritdoc />
  public partial class renameKeysToPt : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "Keys",
          table: "Foods",
          newName: "KeysPt");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "KeysPt",
          table: "Foods",
          newName: "Keys");
    }
  }
}
