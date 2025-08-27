using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
  /// <inheritdoc />
  public partial class addMineralsVitaminsAndAminoacids : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "type",
          table: "foods",
          newName: "Type");

      migrationBuilder.RenameColumn(
          name: "totalFat",
          table: "foods",
          newName: "TotalFat");

      migrationBuilder.RenameColumn(
          name: "sugar",
          table: "foods",
          newName: "Sugar");

      migrationBuilder.RenameColumn(
          name: "saturedFats",
          table: "foods",
          newName: "SaturedFats");

      migrationBuilder.RenameColumn(
          name: "proteins",
          table: "foods",
          newName: "Proteins");

      migrationBuilder.RenameColumn(
          name: "polyunsaturatedFats",
          table: "foods",
          newName: "PolyunsaturatedFats");

      migrationBuilder.RenameColumn(
          name: "name",
          table: "foods",
          newName: "Name");

      migrationBuilder.RenameColumn(
          name: "monounsaturatedFats",
          table: "foods",
          newName: "MonounsaturatedFats");

      migrationBuilder.RenameColumn(
          name: "keys",
          table: "foods",
          newName: "Keys");

      migrationBuilder.RenameColumn(
          name: "image",
          table: "foods",
          newName: "Image");

      migrationBuilder.RenameColumn(
          name: "icon",
          table: "foods",
          newName: "Icon");

      migrationBuilder.RenameColumn(
          name: "gl",
          table: "foods",
          newName: "Gl");

      migrationBuilder.RenameColumn(
          name: "gi",
          table: "foods",
          newName: "Gi");

      migrationBuilder.RenameColumn(
          name: "dietaryFiber",
          table: "foods",
          newName: "DietaryFiber");

      migrationBuilder.RenameColumn(
          name: "description",
          table: "foods",
          newName: "Description");

      migrationBuilder.RenameColumn(
          name: "cholesterol",
          table: "foods",
          newName: "Cholesterol");

      migrationBuilder.RenameColumn(
          name: "carbohydrates",
          table: "foods",
          newName: "Carbohydrates");

      migrationBuilder.RenameColumn(
          name: "calories",
          table: "foods",
          newName: "Calories");

      migrationBuilder.RenameColumn(
          name: "ashes",
          table: "foods",
          newName: "Ashes");

      migrationBuilder.RenameColumn(
          name: "acidification",
          table: "foods",
          newName: "Acidification");

      migrationBuilder.RenameColumn(
          name: "recipe",
          table: "foods",
          newName: "IsRecipe");

      migrationBuilder.RenameColumn(
          name: "rawId",
          table: "foods",
          newName: "UnitOfMeasurement");

      migrationBuilder.AddColumn<float>(
          name: "A",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Alanine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "AlphaCarotene",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Arginine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "AsparticAcid",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B1",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B11",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B12",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B2",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B3",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B5",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B6",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B7",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "B9",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "BetaCarotene",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "C",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Calcium",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Choline",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Copper",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "CryptoxanthinCarotene",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Cystine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "D",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "D2",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "D3",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "E",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Fluoride",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "GlutamicAcid",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Glutamine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Glycine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Histidine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Iron",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Isoleucine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "K",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Leucine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Lycopene",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Lysine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Magnesium",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Manganese",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Methionine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Phenylalanine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Phosphorus",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Potassium",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Proline",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Selenium",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Serine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Sodium",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Threonine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Tryptophan",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Tyrosine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Valine",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.AddColumn<float>(
          name: "Zinc",
          table: "foods",
          type: "real",
          nullable: false,
          defaultValue: 0f);

      migrationBuilder.CreateTable(
          name: "Measure",
          columns: table => new
          {
            Id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            Type = table.Column<int>(type: "integer", nullable: false),
            Quantity = table.Column<float>(type: "real", nullable: false),
            FoodId = table.Column<int>(type: "integer", nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Measure", x => x.Id);
            table.ForeignKey(
                      name: "FK_Measure_foods_FoodId",
                      column: x => x.FoodId,
                      principalTable: "foods",
                      principalColumn: "Id");
          });

      migrationBuilder.CreateIndex(
          name: "IX_Measure_FoodId",
          table: "Measure",
          column: "FoodId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Measure");

      migrationBuilder.DropColumn(
          name: "A",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Alanine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "AlphaCarotene",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Arginine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "AsparticAcid",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B1",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B11",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B12",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B2",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B3",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B5",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B6",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B7",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "B9",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "BetaCarotene",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "C",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Calcium",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Choline",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Copper",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "CryptoxanthinCarotene",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Cystine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "D",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "D2",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "D3",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "E",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Fluoride",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "GlutamicAcid",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Glutamine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Glycine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Histidine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Iron",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Isoleucine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "K",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Leucine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Lycopene",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Lysine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Magnesium",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Manganese",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Methionine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Phenylalanine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Phosphorus",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Potassium",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Proline",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Selenium",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Serine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Sodium",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Threonine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Tryptophan",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Tyrosine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Valine",
          table: "foods");

      migrationBuilder.DropColumn(
          name: "Zinc",
          table: "foods");

      migrationBuilder.RenameColumn(
          name: "Type",
          table: "foods",
          newName: "type");

      migrationBuilder.RenameColumn(
          name: "TotalFat",
          table: "foods",
          newName: "totalFat");

      migrationBuilder.RenameColumn(
          name: "Sugar",
          table: "foods",
          newName: "sugar");

      migrationBuilder.RenameColumn(
          name: "SaturedFats",
          table: "foods",
          newName: "saturedFats");

      migrationBuilder.RenameColumn(
          name: "Proteins",
          table: "foods",
          newName: "proteins");

      migrationBuilder.RenameColumn(
          name: "PolyunsaturatedFats",
          table: "foods",
          newName: "polyunsaturatedFats");

      migrationBuilder.RenameColumn(
          name: "Name",
          table: "foods",
          newName: "name");

      migrationBuilder.RenameColumn(
          name: "MonounsaturatedFats",
          table: "foods",
          newName: "monounsaturatedFats");

      migrationBuilder.RenameColumn(
          name: "Keys",
          table: "foods",
          newName: "keys");

      migrationBuilder.RenameColumn(
          name: "Image",
          table: "foods",
          newName: "image");

      migrationBuilder.RenameColumn(
          name: "Icon",
          table: "foods",
          newName: "icon");

      migrationBuilder.RenameColumn(
          name: "Gl",
          table: "foods",
          newName: "gl");

      migrationBuilder.RenameColumn(
          name: "Gi",
          table: "foods",
          newName: "gi");

      migrationBuilder.RenameColumn(
          name: "DietaryFiber",
          table: "foods",
          newName: "dietaryFiber");

      migrationBuilder.RenameColumn(
          name: "Description",
          table: "foods",
          newName: "description");

      migrationBuilder.RenameColumn(
          name: "Cholesterol",
          table: "foods",
          newName: "cholesterol");

      migrationBuilder.RenameColumn(
          name: "Carbohydrates",
          table: "foods",
          newName: "carbohydrates");

      migrationBuilder.RenameColumn(
          name: "Calories",
          table: "foods",
          newName: "calories");

      migrationBuilder.RenameColumn(
          name: "Ashes",
          table: "foods",
          newName: "ashes");

      migrationBuilder.RenameColumn(
          name: "Acidification",
          table: "foods",
          newName: "acidification");

      migrationBuilder.RenameColumn(
          name: "UnitOfMeasurement",
          table: "foods",
          newName: "rawId");

      migrationBuilder.RenameColumn(
          name: "IsRecipe",
          table: "foods",
          newName: "recipe");
    }
  }
}
