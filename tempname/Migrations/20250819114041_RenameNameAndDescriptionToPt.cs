using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RenameNameAndDescriptionToPt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Foods",
                newName: "NamePt");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Foods",
                newName: "DescriptionPt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NamePt",
                table: "Foods",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "DescriptionPt",
                table: "Foods",
                newName: "Description");
        }
    }
}
