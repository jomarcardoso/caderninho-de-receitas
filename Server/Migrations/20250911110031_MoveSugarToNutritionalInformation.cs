using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class MoveSugarToNutritionalInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sugar",
                table: "Food",
                newName: "NutritionalInformation_Sugar");

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Sugar",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Sugar",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Sugar",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Sugar",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Sugar",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Sugar",
                table: "Ingredient");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Sugar",
                table: "Food",
                newName: "Sugar");
        }
    }
}
