using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class FoodIconNameToLanguageText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FoodIcon_Name",
                table: "FoodIcon");

            // Promote existing Name to Name_En
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "FoodIcon",
                newName: "Name_En");

            // Add Name_Pt (empty for now)
            migrationBuilder.AddColumn<string>(
                name: "Name_Pt",
                table: "FoodIcon",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FoodIcon_Name_En",
                table: "FoodIcon",
                column: "Name_En",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FoodIcon_Name_En",
                table: "FoodIcon");

            migrationBuilder.DropColumn(
                name: "Name_Pt",
                table: "FoodIcon");

            migrationBuilder.RenameColumn(
                name: "Name_En",
                table: "FoodIcon",
                newName: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_FoodIcon_Name",
                table: "FoodIcon",
                column: "Name",
                unique: true);
        }
    }
}
