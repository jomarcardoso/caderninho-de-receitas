using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeCategoryIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
@"
UPDATE ""Recipe"" r
SET ""Categories"" = COALESCE((
    SELECT string_agg(id::text, ',')
    FROM (
        SELECT DISTINCT
            CASE
                WHEN trim(value) ~ '^[0-9]+$' THEN trim(value)::int
                ELSE rc.""Id""
            END AS id
        FROM unnest(string_to_array(COALESCE(r.""Categories"", ''), ',')) AS value
        LEFT JOIN ""RecipeCategoryOpen"" rc
            ON lower(rc.""Slug"") = lower(trim(value))
        WHERE trim(value) <> ''
    ) AS mapped
    WHERE id IS NOT NULL AND id > 0
), '');
");

            migrationBuilder.Sql(
@"
UPDATE ""Recipe"" r
SET ""CustomCategories"" = COALESCE((
    SELECT string_agg(id::text, ',')
    FROM (
        SELECT DISTINCT
            CASE
                WHEN trim(value) ~ '^[0-9]+$' THEN trim(value)::int
                ELSE rc.""Id""
            END AS id
        FROM unnest(string_to_array(COALESCE(r.""CustomCategories"", ''), ',')) AS value
        LEFT JOIN ""RecipeCategoryOpen"" rc
            ON lower(rc.""Slug"") = lower(trim(value))
        WHERE trim(value) <> ''
    ) AS mapped
    WHERE id IS NOT NULL AND id > 0
), '');
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
