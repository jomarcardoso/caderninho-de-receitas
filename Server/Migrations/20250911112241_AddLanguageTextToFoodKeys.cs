using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddLanguageTextToFoodKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KeysPt",
                table: "Food",
                newName: "Keys_Pt");

            migrationBuilder.RenameColumn(
                name: "Keys",
                table: "Food",
                newName: "Keys_En");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Keys_Pt",
                table: "Food",
                newName: "KeysPt");

            migrationBuilder.RenameColumn(
                name: "Keys_En",
                table: "Food",
                newName: "Keys");
        }
    }
}
