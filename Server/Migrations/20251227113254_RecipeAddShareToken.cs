using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeAddShareToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AminoAcidsScore",
                table: "RecipeRevisionStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ShareToken",
                table: "Recipe",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShareTokenCreatedAt",
                table: "Recipe",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShareTokenRevokedAt",
                table: "Recipe",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AminoAcidsScore",
                table: "RecipeRevisionStep");

            migrationBuilder.DropColumn(
                name: "ShareToken",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "ShareTokenCreatedAt",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "ShareTokenRevokedAt",
                table: "Recipe");
        }
    }
}
