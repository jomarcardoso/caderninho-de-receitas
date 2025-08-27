using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class oneMeasuresCollection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Measure_foods_FoodId",
                table: "Measure");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeStep_recipes_Recipeid",
                table: "RecipeStep");

            migrationBuilder.DropPrimaryKey(
                name: "PK_recipes",
                table: "recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_foods",
                table: "foods");

            migrationBuilder.RenameTable(
                name: "recipes",
                newName: "Recipes");

            migrationBuilder.RenameTable(
                name: "foods",
                newName: "Foods");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Foods",
                table: "Foods",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Measure_Foods_FoodId",
                table: "Measure",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeStep_Recipes_Recipeid",
                table: "RecipeStep",
                column: "Recipeid",
                principalTable: "Recipes",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Measure_Foods_FoodId",
                table: "Measure");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeStep_Recipes_Recipeid",
                table: "RecipeStep");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Foods",
                table: "Foods");

            migrationBuilder.RenameTable(
                name: "Recipes",
                newName: "recipes");

            migrationBuilder.RenameTable(
                name: "Foods",
                newName: "foods");

            migrationBuilder.AddPrimaryKey(
                name: "PK_recipes",
                table: "recipes",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_foods",
                table: "foods",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Measure_foods_FoodId",
                table: "Measure",
                column: "FoodId",
                principalTable: "foods",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeStep_recipes_Recipeid",
                table: "RecipeStep",
                column: "Recipeid",
                principalTable: "recipes",
                principalColumn: "id");
        }
    }
}
