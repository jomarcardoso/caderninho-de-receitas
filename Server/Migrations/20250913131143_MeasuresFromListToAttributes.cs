using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class MeasuresFromListToAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Measure");

            migrationBuilder.AddColumn<double>(
                name: "Measures_Breast",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Bunch",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Can",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Clove",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Cup",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Glass",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Gram",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Kilo",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Liter",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Literal",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Ml",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Pinch",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Slice",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Spoon",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_TeaSpoon",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_Unity",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_UnityLarge",
                table: "Food",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Measures_UnitySmall",
                table: "Food",
                type: "double precision",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Measures_Breast",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Bunch",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Can",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Clove",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Cup",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Glass",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Gram",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Kilo",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Liter",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Literal",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Ml",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Pinch",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Slice",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Spoon",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_TeaSpoon",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_Unity",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_UnityLarge",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Measures_UnitySmall",
                table: "Food");

            migrationBuilder.CreateTable(
                name: "Measure",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measure", x => new { x.FoodId, x.Id });
                    table.ForeignKey(
                        name: "FK_Measure_Food_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Food",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
