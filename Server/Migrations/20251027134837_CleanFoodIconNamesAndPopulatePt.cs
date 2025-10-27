using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class CleanFoodIconNamesAndPopulatePt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove .svg/.png suffix (case-insensitive) from English name and ensure uniqueness
            migrationBuilder.Sql(@"DO $$
DECLARE
BEGIN
  -- Prepare a mapping of new names ensuring uniqueness by suffixing duplicates
  CREATE TEMP TABLE tmp_icon_names AS
  WITH base AS (
    SELECT ""Id"",
           regexp_replace(""Name_En"", '\.(svg|png)$', '', 'i') AS base
    FROM ""FoodIcon""
  ), ranked AS (
    SELECT b.""Id"",
           b.base,
           ROW_NUMBER() OVER (PARTITION BY b.base ORDER BY b.""Id"") AS rn
    FROM base b
  )
  SELECT r.""Id"",
         CASE WHEN r.rn = 1 THEN r.base ELSE r.base || '_' || r.rn END AS new_en,
         r.base AS base
  FROM ranked r;

  -- Update Name_En to new unique values
  UPDATE ""FoodIcon"" f
  SET ""Name_En"" = t.new_en
  FROM tmp_icon_names t
  WHERE f.""Id"" = t.""Id"";

  -- Populate Name_Pt if empty/null: replace hyphens/underscores with spaces and title-case
  UPDATE ""FoodIcon""
  SET ""Name_Pt"" = INITCAP(REPLACE(REPLACE(t.base, '-', ' '), '_', ' '))
  FROM tmp_icon_names t
  WHERE ""FoodIcon"".""Id"" = t.""Id""
    AND (""FoodIcon"".""Name_Pt"" IS NULL OR ""FoodIcon"".""Name_Pt"" = '');

  DROP TABLE IF EXISTS tmp_icon_names;
END $$;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // No-op: data-cleaning migration. Cannot safely restore extensions or previous PT names.
        }
    }
}
