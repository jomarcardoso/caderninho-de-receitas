using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceVisibilityToIsPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Recipe");

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "UserProfile",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_IsPublic_TombstoneStatus",
                table: "Recipe",
                columns: new[] { "IsPublic", "TombstoneStatus" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Recipe_IsPublic_TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "UserProfile");

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "UserProfile",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe",
                columns: new[] { "Visibility", "TombstoneStatus" });
        }
    }
}
