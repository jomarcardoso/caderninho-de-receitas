using Microsoft.EntityFrameworkCore.Migrations;
using Server;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20251018181500_RenameRecipeImageToImgs")]
    public partial class RenameRecipeImageToImgs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Recipe",
                newName: "Imgs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Imgs",
                table: "Recipe",
                newName: "Image");
        }
    }
}
