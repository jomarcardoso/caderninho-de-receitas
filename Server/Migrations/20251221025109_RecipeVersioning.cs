using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeVersioning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecipeRevisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecipeId = table.Column<Guid>(type: "uuid", nullable: false),
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
                        name: "FK_RecipeRevisions_RecipeRevisions_BaseRevisionId",
                        column: x => x.BaseRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecipesV2",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "character varying(140)", maxLength: 140, nullable: false),
                    Visibility = table.Column<int>(type: "integer", nullable: false),
                    TombstoneStatus = table.Column<int>(type: "integer", nullable: false),
                    MergedIntoRecipeId = table.Column<Guid>(type: "uuid", nullable: true),
                    PublishedRevisionId = table.Column<Guid>(type: "uuid", nullable: true),
                    LatestRevisionId = table.Column<Guid>(type: "uuid", nullable: true),
                    OwnerUserId = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipesV2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipesV2_RecipeRevisions_LatestRevisionId",
                        column: x => x.LatestRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipesV2_RecipeRevisions_PublishedRevisionId",
                        column: x => x.PublishedRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipesV2_RecipesV2_MergedIntoRecipeId",
                        column: x => x.MergedIntoRecipeId,
                        principalTable: "RecipesV2",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_RecipesV2_LatestRevisionId",
                table: "RecipesV2",
                column: "LatestRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipesV2_MergedIntoRecipeId",
                table: "RecipesV2",
                column: "MergedIntoRecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipesV2_PublishedRevisionId",
                table: "RecipesV2",
                column: "PublishedRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipesV2_Slug",
                table: "RecipesV2",
                column: "Slug");

            migrationBuilder.CreateIndex(
                name: "IX_RecipesV2_Visibility_TombstoneStatus",
                table: "RecipesV2",
                columns: new[] { "Visibility", "TombstoneStatus" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeRevisions_RecipesV2_RecipeId",
                table: "RecipeRevisions",
                column: "RecipeId",
                principalTable: "RecipesV2",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeRevisions_RecipesV2_RecipeId",
                table: "RecipeRevisions");

            migrationBuilder.DropTable(
                name: "RecipesV2");

            migrationBuilder.DropTable(
                name: "RecipeRevisions");
        }
    }
}
