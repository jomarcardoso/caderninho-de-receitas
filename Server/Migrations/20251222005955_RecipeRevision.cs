using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeRevision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_Food_FoodId",
                table: "Recipe");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "RecipeStep");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_FoodId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Alanine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Arginine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_AsparticAcid",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Cystine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_GlutamicAcid",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glutamine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glycine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Histidine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Isoleucine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Leucine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Lysine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Methionine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Phenylalanine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Proline",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Serine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Threonine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tryptophan",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tyrosine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Valine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Histidine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Leucine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Lysine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Methionine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Threonine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Valine",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Keys",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Calcium",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Copper",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Fluoride",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Iron",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Magnesium",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Manganese",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Phosphorus",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Potassium",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Selenium",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Sodium",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Minerals_Zinc",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Acidification",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Ashes",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Calories",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Carbohydrates",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Cholesterol",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_DietaryFiber",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gi",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gl",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Proteins",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_SaturedFats",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Sugar",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_TotalFat",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_A",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_AlphaCarotene",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B1",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B11",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B12",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B2",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B3",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B5",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B6",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B7",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_B9",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_BetaCarotene",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_C",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_Choline",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_D",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_D2",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_D3",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_E",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_K",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Vitamins_Lycopene",
                table: "Recipe");

            migrationBuilder.AddColumn<string>(
                name: "Keys",
                table: "RecipeRevisions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Language",
                table: "RecipeRevisions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "RecipeRevisions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "CopiedFromRecipeId",
                table: "Recipe",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "Recipe",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAtUtc",
                table: "Recipe",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "RecipeRevisionStep",
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
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
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
                    RecipeRevisionStepId = table.Column<int>(type: "integer", nullable: false),
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
                    EssentialAminoAcids_Valine = table.Column<double>(type: "double precision", nullable: false)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeRevisionIngredient");

            migrationBuilder.DropTable(
                name: "RecipeRevisionStep");

            migrationBuilder.DropColumn(
                name: "Keys",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "CreatedAtUtc",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "UpdatedAtUtc",
                table: "Recipe");

            migrationBuilder.AlterColumn<int>(
                name: "CopiedFromRecipeId",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Alanine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Arginine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_AsparticAcid",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Cystine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_GlutamicAcid",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glutamine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glycine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Histidine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Isoleucine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Leucine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Lysine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Methionine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Phenylalanine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Proline",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Serine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Threonine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tryptophan",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tyrosine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Valine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Histidine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Leucine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Lysine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Methionine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Threonine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Valine",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Keys",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Language",
                table: "Recipe",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Calcium",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Copper",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Fluoride",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Iron",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Magnesium",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Manganese",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Phosphorus",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Potassium",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Selenium",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Sodium",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Zinc",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Recipe",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Acidification",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Ashes",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Calories",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Carbohydrates",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Cholesterol",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_DietaryFiber",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gi",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gl",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Proteins",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_SaturedFats",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Sugar",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_TotalFat",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_A",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_AlphaCarotene",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B1",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B11",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B12",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B2",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B3",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B5",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B6",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B7",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B9",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_BetaCarotene",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_C",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Choline",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D2",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D3",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_E",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_K",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Lycopene",
                table: "Recipe",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "RecipeStep",
                columns: table => new
                {
                    RecipeId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Additional = table.Column<string>(type: "text", nullable: false),
                    IngredientsText = table.Column<string>(type: "text", nullable: true),
                    Preparation = table.Column<string>(type: "text", nullable: false),
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
                    FoodId = table.Column<int>(type: "integer", nullable: false),
                    MeasureQuantity = table.Column<double>(type: "double precision", nullable: false),
                    MeasureType = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
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
                name: "IX_Recipe_FoodId",
                table: "Recipe",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_FoodId",
                table: "Ingredient",
                column: "FoodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_Food_FoodId",
                table: "Recipe",
                column: "FoodId",
                principalTable: "Food",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
