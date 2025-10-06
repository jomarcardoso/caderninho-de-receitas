using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRecipe",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Gram",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Kilo",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Liter",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Literal",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Ml",
                table: "Food");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRecipe",
                table: "Food",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Gram",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Kilo",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Liter",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Literal",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Ml",
                table: "Food",
                type: "double precision",
                nullable: true);
        }
    }
}
