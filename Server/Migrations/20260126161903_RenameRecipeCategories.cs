using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameRecipeCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "RecipeCategoryOpen",
                newName: "RecipeCategory");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeCategoryOpen_Slug",
                table: "RecipeCategory",
                newName: "IX_RecipeCategory_Slug");

            migrationBuilder.CreateTable(
                name: "CustomRecipeCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Slug = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Name_En = table.Column<string>(type: "text", nullable: false),
                    Name_Pt = table.Column<string>(type: "text", nullable: false),
                    NamePlural_En = table.Column<string>(type: "text", nullable: false),
                    NamePlural_Pt = table.Column<string>(type: "text", nullable: false),
                    Description_En = table.Column<string>(type: "text", nullable: false),
                    Description_Pt = table.Column<string>(type: "text", nullable: false),
                    Img = table.Column<string>(type: "text", nullable: false),
                    BannerImg = table.Column<string>(type: "text", nullable: false),
                    Visibility = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomRecipeCategory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomRecipeCategory_Slug",
                table: "CustomRecipeCategory",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomRecipeCategory");

            migrationBuilder.RenameTable(
                name: "RecipeCategory",
                newName: "RecipeCategoryOpen");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeCategory_Slug",
                table: "RecipeCategoryOpen",
                newName: "IX_RecipeCategoryOpen_Slug");
        }
    }
}
