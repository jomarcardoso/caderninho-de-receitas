using Microsoft.EntityFrameworkCore.Migrations;
using Server;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20251018182000_RecipeImgsToArray")]
    public partial class RecipeImgsToArray : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Ensure no incompatible default exists before type change
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" DROP DEFAULT;");
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" TYPE text[] USING CASE WHEN \"Imgs\" IS NULL OR \"Imgs\" = '' THEN ARRAY[]::text[] ELSE ARRAY[\"Imgs\"] END;");
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" SET NOT NULL;");
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" SET DEFAULT ARRAY[]::text[];");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" TYPE text USING (CASE WHEN \"Imgs\" IS NULL OR array_length(\"Imgs\",1) IS NULL THEN '' ELSE \"Imgs\"[1] END);");
            migrationBuilder.Sql("ALTER TABLE \"Recipe\" ALTER COLUMN \"Imgs\" DROP DEFAULT;");
        }
    }
}
