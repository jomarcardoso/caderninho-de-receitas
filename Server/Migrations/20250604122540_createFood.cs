using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class createFood : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    image = table.Column<string>(type: "text", nullable: false),
                    gi = table.Column<float>(type: "real", nullable: false),
                    calories = table.Column<float>(type: "real", nullable: false),
                    acidification = table.Column<float>(type: "real", nullable: false),
                    carbohydrates = table.Column<float>(type: "real", nullable: false),
                    ashes = table.Column<float>(type: "real", nullable: false),
                    proteins = table.Column<float>(type: "real", nullable: false),
                    saturedFats = table.Column<float>(type: "real", nullable: false),
                    monounsaturatedFats = table.Column<float>(type: "real", nullable: false),
                    polyunsaturatedFats = table.Column<float>(type: "real", nullable: false),
                    cholesterol = table.Column<float>(type: "real", nullable: false),
                    totalFat = table.Column<float>(type: "real", nullable: false),
                    dietaryFiber = table.Column<float>(type: "real", nullable: false),
                    sugar = table.Column<float>(type: "real", nullable: false),
                    gl = table.Column<float>(type: "real", nullable: false),
                    rawId = table.Column<int>(type: "integer", nullable: false),
                    recipe = table.Column<bool>(type: "boolean", nullable: false),
                    icon = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_foods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "recipes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Additional = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "RecipeStep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Ingredients = table.Column<string>(type: "text", nullable: false),
                    Preparation = table.Column<string>(type: "text", nullable: false),
                    Additional = table.Column<string>(type: "text", nullable: false),
                    Recipeid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeStep_recipes_Recipeid",
                        column: x => x.Recipeid,
                        principalTable: "recipes",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeStep_Recipeid",
                table: "RecipeStep",
                column: "Recipeid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "foods");

            migrationBuilder.DropTable(
                name: "RecipeStep");

            migrationBuilder.DropTable(
                name: "recipes");
        }
    }
}
