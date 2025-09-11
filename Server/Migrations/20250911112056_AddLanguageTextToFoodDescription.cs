using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddLanguageTextToFoodDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DescriptionPt",
                table: "Food",
                newName: "Description_Pt");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Food",
                newName: "Description_En");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description_Pt",
                table: "Food",
                newName: "DescriptionPt");

            migrationBuilder.RenameColumn(
                name: "Description_En",
                table: "Food",
                newName: "Description");
        }
    }
}
