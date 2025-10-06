using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddLanguageTextToFoodName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NamePt",
                table: "Food",
                newName: "Name_Pt");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Food",
                newName: "Name_En");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name_Pt",
                table: "Food",
                newName: "NamePt");

            migrationBuilder.RenameColumn(
                name: "Name_En",
                table: "Food",
                newName: "Name");
        }
    }
}
