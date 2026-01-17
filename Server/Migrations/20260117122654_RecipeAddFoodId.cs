using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeAddFoodId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Recipe",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_FoodId",
                table: "Recipe",
                column: "FoodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_Food_FoodId",
                table: "Recipe",
                column: "FoodId",
                principalTable: "Food",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_Food_FoodId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_FoodId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Recipe");
        }
    }
}
