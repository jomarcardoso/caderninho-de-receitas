using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeWithLanguage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Keys_En",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Keys_Pt",
                table: "Recipe");

            migrationBuilder.RenameColumn(
                name: "Name_Pt",
                table: "Recipe",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Name_En",
                table: "Recipe",
                newName: "Keys");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Recipe",
                newName: "Name_Pt");

            migrationBuilder.RenameColumn(
                name: "Keys",
                table: "Recipe",
                newName: "Name_En");

            migrationBuilder.AddColumn<string>(
                name: "Keys_En",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Keys_Pt",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
