using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveReplaceIsPublicForVisibility : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecipeRevisions_RecipeId_Status",
                table: "RecipeRevisions");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_IsPublic_TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "RecipeShare");

            migrationBuilder.DropColumn(
                name: "ReviewedAtUtc",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "ReviewedByUserId",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "RecipeList");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Recipe");

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "UserProfile",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "RecipeShare",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "RecipeList",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
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

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_Visibility_TombstoneStatus",
                table: "UserProfile",
                columns: new[] { "Visibility", "TombstoneStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_RecipeId",
                table: "RecipeRevisions",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe",
                columns: new[] { "Visibility", "TombstoneStatus" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProfile_Visibility_TombstoneStatus",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_RecipeRevisions_RecipeId",
                table: "RecipeRevisions");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_Visibility_TombstoneStatus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "RecipeShare");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "RecipeList");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Recipe");

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "UserProfile",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "RecipeShare",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewedAtUtc",
                table: "RecipeRevisions",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReviewedByUserId",
                table: "RecipeRevisions",
                type: "character varying(80)",
                maxLength: 80,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RecipeRevisions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "RecipeList",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Recipe",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_RecipeId_Status",
                table: "RecipeRevisions",
                columns: new[] { "RecipeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_IsPublic_TombstoneStatus",
                table: "Recipe",
                columns: new[] { "IsPublic", "TombstoneStatus" });
        }
    }
}
