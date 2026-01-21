using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeMoveImgsToRevision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<string>>(
                name: "Imgs",
                table: "RecipeRevisions",
                type: "text[]",
                nullable: true);

            migrationBuilder.Sql(
                """
                UPDATE "RecipeRevisions" AS rr
                SET "Imgs" = r."Imgs"
                FROM "Recipe" AS r
                WHERE r."LatestRevisionId" IS NOT NULL
                  AND rr."Id" = r."LatestRevisionId";

                UPDATE "RecipeRevisions" AS rr
                SET "Imgs" = r."Imgs"
                FROM "Recipe" AS r
                WHERE rr."Imgs" IS NULL
                  AND r."PublishedRevisionId" IS NOT NULL
                  AND rr."Id" = r."PublishedRevisionId";

                UPDATE "RecipeRevisions"
                SET "Imgs" = ARRAY[]::text[]
                WHERE "Imgs" IS NULL;
                """);

            migrationBuilder.AlterColumn<List<string>>(
                name: "Imgs",
                table: "RecipeRevisions",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldNullable: true,
                defaultValue: new string[0]);

            migrationBuilder.DropColumn(
                name: "Imgs",
                table: "Recipe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<string>>(
                name: "Imgs",
                table: "Recipe",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.Sql(
                """
                UPDATE "Recipe" AS r
                SET "Imgs" = rr."Imgs"
                FROM "RecipeRevisions" AS rr
                WHERE r."LatestRevisionId" IS NOT NULL
                  AND rr."Id" = r."LatestRevisionId";

                UPDATE "Recipe" AS r
                SET "Imgs" = rr."Imgs"
                FROM "RecipeRevisions" AS rr
                WHERE r."Imgs" = ARRAY[]::text[]
                  AND r."PublishedRevisionId" IS NOT NULL
                  AND rr."Id" = r."PublishedRevisionId";
                """);

            migrationBuilder.DropColumn(
                name: "Imgs",
                table: "RecipeRevisions");
        }
    }
}
