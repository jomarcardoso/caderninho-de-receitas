using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class RecipeVersioning2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove old Guid-based artifacts
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeRevisions_RecipesV2_RecipeId",
                table: "RecipeRevisions");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipesV2_RecipeRevisions_LatestRevisionId",
                table: "RecipesV2");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipesV2_RecipeRevisions_PublishedRevisionId",
                table: "RecipesV2");

            migrationBuilder.DropTable(
                name: "RecipeRevisions");

            migrationBuilder.DropTable(
                name: "RecipesV2");

            // Add versioning columns to Recipe (int PK)
            migrationBuilder.AddColumn<Guid>(
                name: "LatestRevisionId",
                table: "Recipe",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MergedIntoRecipeId",
                table: "Recipe",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedRevisionId",
                table: "Recipe",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TombstoneStatus",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            // Recreate RecipeRevisions with RecipeId as int and self FK for BaseRevisionId
            migrationBuilder.CreateTable(
                name: "RecipeRevisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecipeId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BaseRevisionId = table.Column<Guid>(type: "uuid", nullable: true),
                    ChangeSummary = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ContentJson = table.Column<string>(type: "text", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewedByUserId = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    ReviewedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModerationNotes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeRevisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeRevisions_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeRevisions_RecipeRevisions_BaseRevisionId",
                        column: x => x.BaseRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_LatestRevisionId",
                table: "Recipe",
                column: "LatestRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_MergedIntoRecipeId",
                table: "Recipe",
                column: "MergedIntoRecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_PublishedRevisionId",
                table: "Recipe",
                column: "PublishedRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Slug",
                table: "Recipe",
                column: "Slug");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe",
                columns: new[] { "Visibility", "TombstoneStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_BaseRevisionId",
                table: "RecipeRevisions",
                column: "BaseRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_CreatedAtUtc",
                table: "RecipeRevisions",
                column: "CreatedAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_RecipeId_Status",
                table: "RecipeRevisions",
                columns: new[] { "RecipeId", "Status" });

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_RecipeRevisions_LatestRevisionId",
                table: "Recipe",
                column: "LatestRevisionId",
                principalTable: "RecipeRevisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_RecipeRevisions_PublishedRevisionId",
                table: "Recipe",
                column: "PublishedRevisionId",
                principalTable: "RecipeRevisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_Recipe_MergedIntoRecipeId",
                table: "Recipe",
                column: "MergedIntoRecipeId",
                principalTable: "Recipe",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_RecipeRevisions_LatestRevisionId",
                table: "Recipe");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_RecipeRevisions_PublishedRevisionId",
                table: "Recipe");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_Recipe_MergedIntoRecipeId",
                table: "Recipe");

            migrationBuilder.DropTable(
                name: "RecipeRevisions");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_LatestRevisionId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_MergedIntoRecipeId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_PublishedRevisionId",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_Slug",
                table: "Recipe");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "LatestRevisionId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "MergedIntoRecipeId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "PublishedRevisionId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Recipe");
        }
    }
}
