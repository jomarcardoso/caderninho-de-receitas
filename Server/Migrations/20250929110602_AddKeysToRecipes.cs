using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddKeysToRecipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Recipe",
                newName: "Name_Pt");

            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddColumn<string>(
                name: "Name_En",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

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
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.DropColumn(
                name: "Keys_En",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Keys_Pt",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Name_En",
                table: "Recipe");

            migrationBuilder.RenameColumn(
                name: "Name_Pt",
                table: "Recipe",
                newName: "Name");
        }
    }
}
