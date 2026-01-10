using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeRenameRevisionStepToStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeRevisionIngredient");

            migrationBuilder.DropTable(
                name: "RecipeRevisionStep");

            migrationBuilder.CreateTable(
                name: "RecipeStep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RecipeRevisionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Preparation = table.Column<string>(type: "text", nullable: false),
                    Additional = table.Column<string>(type: "text", nullable: false),
                    IngredientsText = table.Column<string>(type: "text", nullable: true),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Sugar = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
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
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcidsScore = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeStep_RecipeRevisions_RecipeRevisionId",
                        column: x => x.RecipeRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(type: "text", nullable: false),
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    MeasureType = table.Column<int>(type: "integer", nullable: false),
                    MeasureQuantity = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Sugar = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
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
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    AminoAcidsScore = table.Column<double>(type: "double precision", nullable: false),
                    RecipeRevisionStepId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredient", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredient_Food_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Food",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ingredient_RecipeStep_RecipeRevisionStepId",
                        column: x => x.RecipeRevisionStepId,
                        principalTable: "RecipeStep",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_FoodId",
                table: "Ingredient",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_RecipeRevisionStepId",
                table: "Ingredient",
                column: "RecipeRevisionStepId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeStep_RecipeRevisionId",
                table: "RecipeStep",
                column: "RecipeRevisionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "RecipeStep");

            migrationBuilder.CreateTable(
                name: "RecipeRevisionStep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Additional = table.Column<string>(type: "text", nullable: false),
                    AminoAcidsScore = table.Column<double>(type: "double precision", nullable: false),
                    IngredientsText = table.Column<string>(type: "text", nullable: true),
                    Preparation = table.Column<string>(type: "text", nullable: false),
                    RecipeRevisionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
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
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Sugar = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
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
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeRevisionStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeRevisionStep_RecipeRevisions_RecipeRevisionId",
                        column: x => x.RecipeRevisionId,
                        principalTable: "RecipeRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeRevisionIngredient",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    MeasureQuantity = table.Column<double>(type: "double precision", nullable: false),
                    MeasureType = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    RecipeRevisionStepId = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
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
                    AminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Histidine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Isoleucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Leucine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Lysine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Methionine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Phenylalanine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Threonine = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Tryptophan = table.Column<double>(type: "double precision", nullable: false),
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Calcium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Copper = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Fluoride = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Iron = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Magnesium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Manganese = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Phosphorus = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Potassium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Selenium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Minerals_Zinc = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Acidification = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Ashes = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Calories = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Cholesterol = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_DietaryFiber = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gi = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Gl = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_MonounsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_PolyunsaturatedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Proteins = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_SaturedFats = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_Sugar = table.Column<double>(type: "double precision", nullable: false),
                    NutritionalInformation_TotalFat = table.Column<double>(type: "double precision", nullable: false),
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
                    Vitamins_Lycopene = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeRevisionIngredient", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeRevisionIngredient_Food_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Food",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeRevisionIngredient_RecipeRevisionStep_RecipeRevisionS~",
                        column: x => x.RecipeRevisionStepId,
                        principalTable: "RecipeRevisionStep",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisionIngredient_FoodId",
                table: "RecipeRevisionIngredient",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisionIngredient_RecipeRevisionStepId",
                table: "RecipeRevisionIngredient",
                column: "RecipeRevisionStepId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisionStep_RecipeRevisionId",
                table: "RecipeRevisionStep",
                column: "RecipeRevisionId");
        }
    }
}
