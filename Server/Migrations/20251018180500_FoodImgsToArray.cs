using Microsoft.EntityFrameworkCore.Migrations;
using Server;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20251018180500_FoodImgsToArray")]
    public partial class FoodImgsToArray : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // PostgreSQL: convert text column to text[] using existing value as single-element array
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" DROP DEFAULT;");
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" TYPE text[] USING CASE WHEN \"Imgs\" IS NULL OR \"Imgs\" = '' THEN ARRAY[]::text[] ELSE ARRAY[\"Imgs\"] END;");
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" SET NOT NULL;");
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" SET DEFAULT ARRAY[]::text[];");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Convert back to text by taking first element or empty string
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" TYPE text USING (CASE WHEN \"Imgs\" IS NULL OR array_length(\"Imgs\",1) IS NULL THEN '' ELSE \"Imgs\"[1] END);");
            migrationBuilder.Sql("ALTER TABLE \"Food\" ALTER COLUMN \"Imgs\" DROP DEFAULT;");
        }
    }
}
