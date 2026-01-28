using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFoodAndCategoryRevisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "RecipeCategoryOpen",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NamePlural_En",
                table: "RecipeCategoryOpen",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NamePlural_Pt",
                table: "RecipeCategoryOpen",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "RecipeCategoryOpen",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CustomCategories",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "FoodRevision",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FoodId = table.Column<int>(type: "integer", nullable: true),
                    Payload = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "character varying(128)", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewedByUserId = table.Column<string>(type: "character varying(128)", nullable: true),
                    ReviewedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodRevision", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FoodRevision_UserProfile_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FoodRevision_UserProfile_ReviewedByUserId",
                        column: x => x.ReviewedByUserId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "RecipeCategoryRevision",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RecipeCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Payload = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "character varying(128)", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewedByUserId = table.Column<string>(type: "character varying(128)", nullable: true),
                    ReviewedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeCategoryRevision", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeCategoryRevision_UserProfile_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipeCategoryRevision_UserProfile_ReviewedByUserId",
                        column: x => x.ReviewedByUserId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodRevision_CreatedByUserId",
                table: "FoodRevision",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodRevision_FoodId_Status",
                table: "FoodRevision",
                columns: new[] { "FoodId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_FoodRevision_Pending",
                table: "FoodRevision",
                columns: new[] { "Status", "CreatedAtUtc" },
                filter: "\"Status\" = 1");

            migrationBuilder.CreateIndex(
                name: "IX_FoodRevision_ReviewedByUserId",
                table: "FoodRevision",
                column: "ReviewedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeCategoryRevision_CreatedByUserId",
                table: "RecipeCategoryRevision",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeCategoryRevision_Pending",
                table: "RecipeCategoryRevision",
                columns: new[] { "Status", "CreatedAtUtc" },
                filter: "\"Status\" = 1");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeCategoryRevision_RecipeCategoryId_Status",
                table: "RecipeCategoryRevision",
                columns: new[] { "RecipeCategoryId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeCategoryRevision_ReviewedByUserId",
                table: "RecipeCategoryRevision",
                column: "ReviewedByUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodRevision");

            migrationBuilder.DropTable(
                name: "RecipeCategoryRevision");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "RecipeCategoryOpen");

            migrationBuilder.DropColumn(
                name: "NamePlural_En",
                table: "RecipeCategoryOpen");

            migrationBuilder.DropColumn(
                name: "NamePlural_Pt",
                table: "RecipeCategoryOpen");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "RecipeCategoryOpen");

            migrationBuilder.DropColumn(
                name: "CustomCategories",
                table: "Recipe");
        }
    }
}
