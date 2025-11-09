using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddOwnerToRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Recipe",
                type: "character varying(128)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            // Ensure any existing recipes have a corresponding UserProfile row
            // Fill required columns: OwnerId (PK), IsFeatured (non-null), CreatedAt, UpdatedAt
            migrationBuilder.Sql(@"INSERT INTO ""UserProfile"" (""OwnerId"", ""IsFeatured"", ""CreatedAt"", ""UpdatedAt"")
SELECT DISTINCT r.""OwnerId"", FALSE, NOW(), NOW()
FROM ""Recipe"" r
LEFT JOIN ""UserProfile"" u ON u.""OwnerId"" = r.""OwnerId""
WHERE u.""OwnerId"" IS NULL AND r.""OwnerId"" IS NOT NULL AND r.""OwnerId"" <> '';");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_OwnerId",
                table: "Recipe",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_UserProfile_OwnerId",
                table: "Recipe",
                column: "OwnerId",
                principalTable: "UserProfile",
                principalColumn: "OwnerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_UserProfile_OwnerId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_OwnerId",
                table: "Recipe");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Recipe",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(128)");
        }
    }
}
