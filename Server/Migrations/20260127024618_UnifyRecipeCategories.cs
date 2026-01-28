using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UnifyRecipeCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "RecipeCategory",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.Sql(
@"
CREATE TEMP TABLE tmp_custom_recipe_category_map AS
SELECT c.""Id"" AS old_id, rc.""Id"" AS new_id
FROM ""CustomRecipeCategory"" c
LEFT JOIN ""RecipeCategory"" rc
  ON lower(rc.""Slug"") = lower(c.""Slug"");
");

            migrationBuilder.Sql(
@"
INSERT INTO ""RecipeCategory""
  (""Slug"", ""Name_En"", ""Name_Pt"", ""NamePlural_En"", ""NamePlural_Pt"",
   ""Description_En"", ""Description_Pt"", ""Img"", ""BannerImg"", ""Visibility"", ""CreatedAt"")
SELECT
  c.""Slug"", c.""Name_En"", c.""Name_Pt"", c.""NamePlural_En"", c.""NamePlural_Pt"",
  c.""Description_En"", c.""Description_Pt"", c.""Img"", c.""BannerImg"", c.""Visibility"", c.""CreatedAt""
FROM ""CustomRecipeCategory"" c
WHERE NOT EXISTS (
  SELECT 1
  FROM ""RecipeCategory"" rc
  WHERE lower(rc.""Slug"") = lower(c.""Slug"")
);
");

            migrationBuilder.Sql(
@"
UPDATE tmp_custom_recipe_category_map m
SET new_id = rc.""Id""
FROM ""CustomRecipeCategory"" c
JOIN ""RecipeCategory"" rc
  ON lower(rc.""Slug"") = lower(c.""Slug"")
WHERE m.old_id = c.""Id"" AND m.new_id IS NULL;
");

            migrationBuilder.Sql(
@"
UPDATE ""Recipe"" r
SET ""Categories"" = COALESCE((
  SELECT string_agg(DISTINCT id::text, ',')
  FROM (
    SELECT trim(value)::int AS id
    FROM unnest(string_to_array(COALESCE(r.""Categories"", ''), ',')) AS value
    WHERE trim(value) ~ '^[0-9]+$'
    UNION
    SELECT COALESCE(m.new_id, trim(value)::int) AS id
    FROM unnest(string_to_array(COALESCE(r.""CustomCategories"", ''), ',')) AS value
    LEFT JOIN tmp_custom_recipe_category_map m
      ON m.old_id = trim(value)::int
    WHERE trim(value) ~ '^[0-9]+$'
  ) ids
  WHERE id > 0
), '');
");

            migrationBuilder.Sql(
@"
DROP TABLE IF EXISTS tmp_custom_recipe_category_map;
");

            migrationBuilder.Sql(
@"
UPDATE ""RecipeCategory""
SET ""Featured"" = TRUE
WHERE ""Visibility"" = 1;
");

            migrationBuilder.DropTable(
                name: "CustomRecipeCategory");

            migrationBuilder.DropColumn(
                name: "CustomCategories",
                table: "Recipe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Featured",
                table: "RecipeCategory");

            migrationBuilder.AddColumn<string>(
                name: "CustomCategories",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "CustomRecipeCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BannerImg = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Img = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Visibility = table.Column<int>(type: "integer", nullable: false),
                    Description_En = table.Column<string>(type: "text", nullable: false),
                    Description_Pt = table.Column<string>(type: "text", nullable: false),
                    Name_En = table.Column<string>(type: "text", nullable: false),
                    Name_Pt = table.Column<string>(type: "text", nullable: false),
                    NamePlural_En = table.Column<string>(type: "text", nullable: false),
                    NamePlural_Pt = table.Column<string>(type: "text", nullable: false)
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
    }
}
