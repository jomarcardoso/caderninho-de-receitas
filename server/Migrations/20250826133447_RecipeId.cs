using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeStep_Recipes_Recipeid",
                table: "RecipeStep");

            migrationBuilder.RenameColumn(
                name: "Recipeid",
                table: "RecipeStep",
                newName: "RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeStep_Recipeid",
                table: "RecipeStep",
                newName: "IX_RecipeStep_RecipeId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Recipes",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeStep_Recipes_RecipeId",
                table: "RecipeStep",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeStep_Recipes_RecipeId",
                table: "RecipeStep");

            migrationBuilder.RenameColumn(
                name: "RecipeId",
                table: "RecipeStep",
                newName: "Recipeid");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeStep_RecipeId",
                table: "RecipeStep",
                newName: "IX_RecipeStep_Recipeid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Recipes",
                newName: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeStep_Recipes_Recipeid",
                table: "RecipeStep",
                column: "Recipeid",
                principalTable: "Recipes",
                principalColumn: "id");
        }
    }
}
