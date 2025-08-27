using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
  /// <inheritdoc />
  public partial class nameAndDescInEnglish : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<string>(
          name: "Description",
          table: "Foods",
          type: "text",
          nullable: false,
          defaultValue: "");

      migrationBuilder.AddColumn<string>(
          name: "Name",
          table: "Foods",
          type: "text",
          nullable: false,
          defaultValue: "");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
          name: "Description",
          table: "Foods");

      migrationBuilder.DropColumn(
          name: "Name",
          table: "Foods");
    }
  }
}
