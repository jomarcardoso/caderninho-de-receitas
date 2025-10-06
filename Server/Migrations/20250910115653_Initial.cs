using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Food",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NamePt = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    DescriptionPt = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Sugar = table.Column<double>(type: "double precision", nullable: false),
                    UnitOfMeasurement = table.Column<int>(type: "integer", nullable: false),
                    Keys = table.Column<string>(type: "text", nullable: false),
                    KeysPt = table.Column<string>(type: "text", nullable: false),
                    IsRecipe = table.Column<bool>(type: "boolean", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_A = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_AlphaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B1 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B11 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B12 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B5 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B6 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B7 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B9 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_BetaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_C = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Choline = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_CryptoxanthinCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_E = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_K = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Alanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Arginine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_AsparticAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Cystine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_GlutamicAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glutamine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glycine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Proline = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Serine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tyrosine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Food", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OwnerId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Additional = table.Column<string>(type: "text", nullable: true),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_A = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_AlphaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B1 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B11 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B12 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B5 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B6 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B7 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B9 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_BetaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_C = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Choline = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_CryptoxanthinCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_E = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_K = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Alanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Arginine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_AsparticAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Cystine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_GlutamicAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glutamine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glycine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Proline = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Serine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tyrosine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Measure",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "RecipeStep",
                columns: table => new
                {
                    RecipeId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Preparation = table.Column<string>(type: "text", nullable: false),
                    Additional = table.Column<string>(type: "text", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_A = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_AlphaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B1 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B11 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B12 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B5 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B6 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B7 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B9 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_BetaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_C = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Choline = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_CryptoxanthinCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_E = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_K = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Alanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Arginine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_AsparticAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Cystine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_GlutamicAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glutamine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glycine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Proline = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Serine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tyrosine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeStep", x => new { x.RecipeId, x.Id });
                    table.ForeignKey(
                        name: "FK_RecipeStep_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    RecipeStepRecipeId = table.Column<int>(type: "integer", nullable: false),
                    RecipeStepId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(type: "text", nullable: false),
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    MeasureType = table.Column<int>(type: "integer", nullable: false),
                    MeasureQuantity = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_A = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_AlphaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B1 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B11 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B12 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B5 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B6 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B7 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_B9 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_BetaCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_C = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Choline = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_CryptoxanthinCarotene = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D2 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_D3 = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_E = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_K = table.Column<double>(type: "double precision", nullable: false),
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Alanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Arginine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_AsparticAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Cystine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_GlutamicAcid = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glutamine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Glycine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Proline = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Serine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Tyrosine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredient", x => new { x.RecipeStepRecipeId, x.RecipeStepId, x.Id });
                    table.ForeignKey(
                        name: "FK_Ingredient_Food_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Food",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ingredient_RecipeStep_RecipeStepRecipeId_RecipeStepId",
                        columns: x => new { x.RecipeStepRecipeId, x.RecipeStepId },
                        principalTable: "RecipeStep",
                        principalColumns: new[] { "RecipeId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_FoodId",
                table: "Ingredient",
                column: "FoodId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "Measure");

            migrationBuilder.DropTable(
                name: "RecipeStep");

            migrationBuilder.DropTable(
                name: "Food");

            migrationBuilder.DropTable(
                name: "Recipe");
        }
    }
}
