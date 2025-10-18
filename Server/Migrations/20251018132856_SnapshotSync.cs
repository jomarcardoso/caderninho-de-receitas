using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class SnapshotSync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Make this migration idempotent/snapshot-only: ensure target columns exist and avoid errors if prior migrations already ran
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" DROP COLUMN IF EXISTS \"Image\";");
            migrationBuilder.Sql("ALTER TABLE \"Food\" DROP COLUMN IF EXISTS \"Image\";");

            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ADD COLUMN IF NOT EXISTS \"Imgs\" text[] NOT NULL DEFAULT ARRAY[]::text[];");
            migrationBuilder.Sql("ALTER TABLE \"Food\" ADD COLUMN IF NOT EXISTS \"Imgs\" text[] NOT NULL DEFAULT ARRAY[]::text[];");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imgs",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Imgs",
                table: "Food");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Food",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
