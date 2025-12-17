using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameFoodIconContentToUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "FoodIcon",
                newName: "Url");

            migrationBuilder.DropColumn(
                name: "MediaType",
                table: "FoodIcon");

            migrationBuilder.CreateIndex(
                name: "IX_Food_IconId",
                table: "Food",
                column: "IconId");

            // Clean orphaned icon references before adding FK
            migrationBuilder.Sql(
                "UPDATE \"Food\" f SET \"IconId\" = NULL " +
                "WHERE \"IconId\" IS NOT NULL AND NOT EXISTS (" +
                "  SELECT 1 FROM \"FoodIcon\" fi WHERE fi.\"Id\" = f.\"IconId\"" +
                ");");

            migrationBuilder.AddForeignKey(
                name: "FK_Food_FoodIcon_IconId",
                table: "Food",
                column: "IconId",
                principalTable: "FoodIcon",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Food_FoodIcon_IconId",
                table: "Food");

            migrationBuilder.DropIndex(
                name: "IX_Food_IconId",
                table: "Food");

            migrationBuilder.AddColumn<string>(
                name: "MediaType",
                table: "FoodIcon",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "FoodIcon",
                newName: "Content");
        }
    }
}
