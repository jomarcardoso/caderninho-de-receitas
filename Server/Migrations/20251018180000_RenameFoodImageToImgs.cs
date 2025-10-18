using Microsoft.EntityFrameworkCore.Migrations;
using Server;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20251018180000_RenameFoodImageToImgs")]
    public partial class RenameFoodImageToImgs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Food",
                newName: "Imgs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Imgs",
                table: "Food",
                newName: "Image");
        }
    }
}
