using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class IngredientAndRecipeWithNutritionalInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "RecipeStep",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "IngredientsText",
                table: "RecipeStep",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "TotalFat",
                table: "Ingredient",
                newName: "NutritionalInformation_TotalFat");

            migrationBuilder.RenameColumn(
                name: "Proteins",
                table: "Ingredient",
                newName: "NutritionalInformation_Proteins");

            migrationBuilder.RenameColumn(
                name: "DietaryFiber",
                table: "Ingredient",
                newName: "NutritionalInformation_DietaryFiber");

            migrationBuilder.RenameColumn(
                name: "Carbohydrates",
                table: "Ingredient",
                newName: "NutritionalInformation_Carbohydrates");

            migrationBuilder.RenameColumn(
                name: "Calories",
                table: "Ingredient",
                newName: "NutritionalInformation_Calories");

            migrationBuilder.RenameColumn(
                name: "TotalFat",
                table: "Foods",
                newName: "NutritionalInformation_TotalFat");

            migrationBuilder.RenameColumn(
                name: "SaturedFats",
                table: "Foods",
                newName: "NutritionalInformation_SaturedFats");

            migrationBuilder.RenameColumn(
                name: "Proteins",
                table: "Foods",
                newName: "NutritionalInformation_Proteins");

            migrationBuilder.RenameColumn(
                name: "PolyunsaturatedFats",
                table: "Foods",
                newName: "NutritionalInformation_PolyunsaturatedFats");

            migrationBuilder.RenameColumn(
                name: "MonounsaturatedFats",
                table: "Foods",
                newName: "NutritionalInformation_MonounsaturatedFats");

            migrationBuilder.RenameColumn(
                name: "Gl",
                table: "Foods",
                newName: "NutritionalInformation_Gl");

            migrationBuilder.RenameColumn(
                name: "Gi",
                table: "Foods",
                newName: "NutritionalInformation_Gi");

            migrationBuilder.RenameColumn(
                name: "DietaryFiber",
                table: "Foods",
                newName: "NutritionalInformation_DietaryFiber");

            migrationBuilder.RenameColumn(
                name: "Cholesterol",
                table: "Foods",
                newName: "NutritionalInformation_Cholesterol");

            migrationBuilder.RenameColumn(
                name: "Carbohydrates",
                table: "Foods",
                newName: "NutritionalInformation_Carbohydrates");

            migrationBuilder.RenameColumn(
                name: "Calories",
                table: "Foods",
                newName: "NutritionalInformation_Calories");

            migrationBuilder.RenameColumn(
                name: "Ashes",
                table: "Foods",
                newName: "NutritionalInformation_Ashes");

            migrationBuilder.RenameColumn(
                name: "Acidification",
                table: "Foods",
                newName: "NutritionalInformation_Acidification");

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Alanine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Arginine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_AsparticAcid",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Cystine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_GlutamicAcid",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glutamine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glycine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Histidine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Isoleucine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Leucine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Lysine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Methionine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Phenylalanine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Proline",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Serine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Threonine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tryptophan",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tyrosine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Valine",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Calcium",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Copper",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Fluoride",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Iron",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Magnesium",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Manganese",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Phosphorus",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Potassium",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Selenium",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Sodium",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Zinc",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Acidification",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Ashes",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Calories",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Carbohydrates",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Cholesterol",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_DietaryFiber",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gi",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gl",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Proteins",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_SaturedFats",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_TotalFat",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_A",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_AlphaCarotene",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B1",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B11",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B12",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B2",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B3",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B5",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B6",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B7",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B9",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_BetaCarotene",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_C",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Choline",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D2",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D3",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_E",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_K",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Lycopene",
                table: "Recipes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Gl",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Acidification",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Ashes",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Cholesterol",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gi",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gl",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_SaturedFats",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AminoAcids_Alanine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Arginine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_AsparticAcid",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Cystine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_GlutamicAcid",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glutamine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glycine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Histidine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Isoleucine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Leucine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Lysine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Methionine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Phenylalanine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Proline",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Serine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Threonine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tryptophan",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tyrosine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Valine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Calcium",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Copper",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Fluoride",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Iron",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Magnesium",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Manganese",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Phosphorus",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Potassium",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Selenium",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Sodium",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Minerals_Zinc",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Acidification",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Ashes",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Calories",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Carbohydrates",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Cholesterol",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_DietaryFiber",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gi",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gl",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Proteins",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_SaturedFats",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_TotalFat",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_A",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_AlphaCarotene",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B1",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B11",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B12",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B2",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B3",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B5",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B6",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B7",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_B9",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_BetaCarotene",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_C",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_Choline",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_D",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_D2",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_D3",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_E",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_K",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vitamins_Lycopene",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Gl",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Acidification",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Ashes",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Cholesterol",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gi",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gl",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_SaturedFats",
                table: "Ingredient");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "RecipeStep",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "RecipeStep",
                newName: "IngredientsText");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_TotalFat",
                table: "Ingredient",
                newName: "TotalFat");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Proteins",
                table: "Ingredient",
                newName: "Proteins");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_DietaryFiber",
                table: "Ingredient",
                newName: "DietaryFiber");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Carbohydrates",
                table: "Ingredient",
                newName: "Carbohydrates");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Calories",
                table: "Ingredient",
                newName: "Calories");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_TotalFat",
                table: "Foods",
                newName: "TotalFat");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_SaturedFats",
                table: "Foods",
                newName: "SaturedFats");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Proteins",
                table: "Foods",
                newName: "Proteins");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "Foods",
                newName: "PolyunsaturatedFats");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "Foods",
                newName: "MonounsaturatedFats");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Gl",
                table: "Foods",
                newName: "Gl");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Gi",
                table: "Foods",
                newName: "Gi");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_DietaryFiber",
                table: "Foods",
                newName: "DietaryFiber");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Cholesterol",
                table: "Foods",
                newName: "Cholesterol");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Carbohydrates",
                table: "Foods",
                newName: "Carbohydrates");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Calories",
                table: "Foods",
                newName: "Calories");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Ashes",
                table: "Foods",
                newName: "Ashes");

            migrationBuilder.RenameColumn(
                name: "NutritionalInformation_Acidification",
                table: "Foods",
                newName: "Acidification");
        }
    }
}
