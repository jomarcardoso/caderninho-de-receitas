using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class IngredientWithNutritionInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Zinc",
                table: "Foods",
                newName: "Minerals_Zinc");

            migrationBuilder.RenameColumn(
                name: "Valine",
                table: "Foods",
                newName: "AminoAcids_Valine");

            migrationBuilder.RenameColumn(
                name: "Tyrosine",
                table: "Foods",
                newName: "AminoAcids_Tyrosine");

            migrationBuilder.RenameColumn(
                name: "Tryptophan",
                table: "Foods",
                newName: "AminoAcids_Tryptophan");

            migrationBuilder.RenameColumn(
                name: "Threonine",
                table: "Foods",
                newName: "AminoAcids_Threonine");

            migrationBuilder.RenameColumn(
                name: "Sodium",
                table: "Foods",
                newName: "Minerals_Sodium");

            migrationBuilder.RenameColumn(
                name: "Serine",
                table: "Foods",
                newName: "AminoAcids_Serine");

            migrationBuilder.RenameColumn(
                name: "Selenium",
                table: "Foods",
                newName: "Minerals_Selenium");

            migrationBuilder.RenameColumn(
                name: "Proline",
                table: "Foods",
                newName: "AminoAcids_Proline");

            migrationBuilder.RenameColumn(
                name: "Potassium",
                table: "Foods",
                newName: "Minerals_Potassium");

            migrationBuilder.RenameColumn(
                name: "Phosphorus",
                table: "Foods",
                newName: "Minerals_Phosphorus");

            migrationBuilder.RenameColumn(
                name: "Phenylalanine",
                table: "Foods",
                newName: "AminoAcids_Phenylalanine");

            migrationBuilder.RenameColumn(
                name: "Methionine",
                table: "Foods",
                newName: "AminoAcids_Methionine");

            migrationBuilder.RenameColumn(
                name: "Manganese",
                table: "Foods",
                newName: "Minerals_Manganese");

            migrationBuilder.RenameColumn(
                name: "Magnesium",
                table: "Foods",
                newName: "Minerals_Magnesium");

            migrationBuilder.RenameColumn(
                name: "Lysine",
                table: "Foods",
                newName: "AminoAcids_Lysine");

            migrationBuilder.RenameColumn(
                name: "Lycopene",
                table: "Foods",
                newName: "Vitamins_Lycopene");

            migrationBuilder.RenameColumn(
                name: "Leucine",
                table: "Foods",
                newName: "AminoAcids_Leucine");

            migrationBuilder.RenameColumn(
                name: "K",
                table: "Foods",
                newName: "Vitamins_K");

            migrationBuilder.RenameColumn(
                name: "Isoleucine",
                table: "Foods",
                newName: "AminoAcids_Isoleucine");

            migrationBuilder.RenameColumn(
                name: "Iron",
                table: "Foods",
                newName: "Minerals_Iron");

            migrationBuilder.RenameColumn(
                name: "Histidine",
                table: "Foods",
                newName: "AminoAcids_Histidine");

            migrationBuilder.RenameColumn(
                name: "Glycine",
                table: "Foods",
                newName: "AminoAcids_Glycine");

            migrationBuilder.RenameColumn(
                name: "Glutamine",
                table: "Foods",
                newName: "AminoAcids_Glutamine");

            migrationBuilder.RenameColumn(
                name: "GlutamicAcid",
                table: "Foods",
                newName: "AminoAcids_GlutamicAcid");

            migrationBuilder.RenameColumn(
                name: "Fluoride",
                table: "Foods",
                newName: "Minerals_Fluoride");

            migrationBuilder.RenameColumn(
                name: "E",
                table: "Foods",
                newName: "Vitamins_E");

            migrationBuilder.RenameColumn(
                name: "D3",
                table: "Foods",
                newName: "Vitamins_D3");

            migrationBuilder.RenameColumn(
                name: "D2",
                table: "Foods",
                newName: "Vitamins_D2");

            migrationBuilder.RenameColumn(
                name: "D",
                table: "Foods",
                newName: "Vitamins_D");

            migrationBuilder.RenameColumn(
                name: "Cystine",
                table: "Foods",
                newName: "AminoAcids_Cystine");

            migrationBuilder.RenameColumn(
                name: "CryptoxanthinCarotene",
                table: "Foods",
                newName: "Vitamins_CryptoxanthinCarotene");

            migrationBuilder.RenameColumn(
                name: "Copper",
                table: "Foods",
                newName: "Minerals_Copper");

            migrationBuilder.RenameColumn(
                name: "Choline",
                table: "Foods",
                newName: "Vitamins_Choline");

            migrationBuilder.RenameColumn(
                name: "Calcium",
                table: "Foods",
                newName: "Minerals_Calcium");

            migrationBuilder.RenameColumn(
                name: "C",
                table: "Foods",
                newName: "Vitamins_C");

            migrationBuilder.RenameColumn(
                name: "BetaCarotene",
                table: "Foods",
                newName: "Vitamins_BetaCarotene");

            migrationBuilder.RenameColumn(
                name: "B9",
                table: "Foods",
                newName: "Vitamins_B9");

            migrationBuilder.RenameColumn(
                name: "B7",
                table: "Foods",
                newName: "Vitamins_B7");

            migrationBuilder.RenameColumn(
                name: "B6",
                table: "Foods",
                newName: "Vitamins_B6");

            migrationBuilder.RenameColumn(
                name: "B5",
                table: "Foods",
                newName: "Vitamins_B5");

            migrationBuilder.RenameColumn(
                name: "B3",
                table: "Foods",
                newName: "Vitamins_B3");

            migrationBuilder.RenameColumn(
                name: "B2",
                table: "Foods",
                newName: "Vitamins_B2");

            migrationBuilder.RenameColumn(
                name: "B12",
                table: "Foods",
                newName: "Vitamins_B12");

            migrationBuilder.RenameColumn(
                name: "B11",
                table: "Foods",
                newName: "Vitamins_B11");

            migrationBuilder.RenameColumn(
                name: "B1",
                table: "Foods",
                newName: "Vitamins_B1");

            migrationBuilder.RenameColumn(
                name: "AsparticAcid",
                table: "Foods",
                newName: "AminoAcids_AsparticAcid");

            migrationBuilder.RenameColumn(
                name: "Arginine",
                table: "Foods",
                newName: "AminoAcids_Arginine");

            migrationBuilder.RenameColumn(
                name: "AlphaCarotene",
                table: "Foods",
                newName: "Vitamins_AlphaCarotene");

            migrationBuilder.RenameColumn(
                name: "Alanine",
                table: "Foods",
                newName: "AminoAcids_Alanine");

            migrationBuilder.RenameColumn(
                name: "A",
                table: "Foods",
                newName: "Vitamins_A");

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Alanine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Arginine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_AsparticAcid",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Cystine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_GlutamicAcid",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glutamine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glycine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Histidine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Isoleucine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Leucine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Lysine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Methionine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Phenylalanine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Proline",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Serine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Threonine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tryptophan",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tyrosine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Valine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Calories",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Carbohydrates",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DietaryFiber",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Calcium",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Copper",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Fluoride",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Iron",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Magnesium",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Manganese",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Phosphorus",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Potassium",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Selenium",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Sodium",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Zinc",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Proteins",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalFat",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_A",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_AlphaCarotene",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B1",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B11",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B12",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B2",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B3",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B5",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B6",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B7",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B9",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_BetaCarotene",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_C",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Choline",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D2",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D3",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_E",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_K",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Lycopene",
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
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Arginine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_AsparticAcid",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Cystine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_GlutamicAcid",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glutamine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glycine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Histidine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Isoleucine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Leucine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Lysine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Methionine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Phenylalanine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Proline",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Serine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Threonine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tryptophan",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tyrosine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Valine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "DietaryFiber",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Calcium",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Copper",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Fluoride",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Iron",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Magnesium",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Manganese",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Phosphorus",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Potassium",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Selenium",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Sodium",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Minerals_Zinc",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Proteins",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "TotalFat",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_A",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_AlphaCarotene",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B1",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B11",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B12",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B2",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B3",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B5",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B6",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B7",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_B9",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_BetaCarotene",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_C",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_Choline",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_D",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_D2",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_D3",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_E",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_K",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "Vitamins_Lycopene",
                table: "Ingredient");

            migrationBuilder.RenameColumn(
                name: "Vitamins_Lycopene",
                table: "Foods",
                newName: "Lycopene");

            migrationBuilder.RenameColumn(
                name: "Vitamins_K",
                table: "Foods",
                newName: "K");

            migrationBuilder.RenameColumn(
                name: "Vitamins_E",
                table: "Foods",
                newName: "E");

            migrationBuilder.RenameColumn(
                name: "Vitamins_D3",
                table: "Foods",
                newName: "D3");

            migrationBuilder.RenameColumn(
                name: "Vitamins_D2",
                table: "Foods",
                newName: "D2");

            migrationBuilder.RenameColumn(
                name: "Vitamins_D",
                table: "Foods",
                newName: "D");

            migrationBuilder.RenameColumn(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "Foods",
                newName: "CryptoxanthinCarotene");

            migrationBuilder.RenameColumn(
                name: "Vitamins_Choline",
                table: "Foods",
                newName: "Choline");

            migrationBuilder.RenameColumn(
                name: "Vitamins_C",
                table: "Foods",
                newName: "C");

            migrationBuilder.RenameColumn(
                name: "Vitamins_BetaCarotene",
                table: "Foods",
                newName: "BetaCarotene");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B9",
                table: "Foods",
                newName: "B9");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B7",
                table: "Foods",
                newName: "B7");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B6",
                table: "Foods",
                newName: "B6");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B5",
                table: "Foods",
                newName: "B5");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B3",
                table: "Foods",
                newName: "B3");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B2",
                table: "Foods",
                newName: "B2");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B12",
                table: "Foods",
                newName: "B12");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B11",
                table: "Foods",
                newName: "B11");

            migrationBuilder.RenameColumn(
                name: "Vitamins_B1",
                table: "Foods",
                newName: "B1");

            migrationBuilder.RenameColumn(
                name: "Vitamins_AlphaCarotene",
                table: "Foods",
                newName: "AlphaCarotene");

            migrationBuilder.RenameColumn(
                name: "Vitamins_A",
                table: "Foods",
                newName: "A");

            migrationBuilder.RenameColumn(
                name: "Minerals_Zinc",
                table: "Foods",
                newName: "Zinc");

            migrationBuilder.RenameColumn(
                name: "Minerals_Sodium",
                table: "Foods",
                newName: "Sodium");

            migrationBuilder.RenameColumn(
                name: "Minerals_Selenium",
                table: "Foods",
                newName: "Selenium");

            migrationBuilder.RenameColumn(
                name: "Minerals_Potassium",
                table: "Foods",
                newName: "Potassium");

            migrationBuilder.RenameColumn(
                name: "Minerals_Phosphorus",
                table: "Foods",
                newName: "Phosphorus");

            migrationBuilder.RenameColumn(
                name: "Minerals_Manganese",
                table: "Foods",
                newName: "Manganese");

            migrationBuilder.RenameColumn(
                name: "Minerals_Magnesium",
                table: "Foods",
                newName: "Magnesium");

            migrationBuilder.RenameColumn(
                name: "Minerals_Iron",
                table: "Foods",
                newName: "Iron");

            migrationBuilder.RenameColumn(
                name: "Minerals_Fluoride",
                table: "Foods",
                newName: "Fluoride");

            migrationBuilder.RenameColumn(
                name: "Minerals_Copper",
                table: "Foods",
                newName: "Copper");

            migrationBuilder.RenameColumn(
                name: "Minerals_Calcium",
                table: "Foods",
                newName: "Calcium");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Valine",
                table: "Foods",
                newName: "Valine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Tyrosine",
                table: "Foods",
                newName: "Tyrosine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Tryptophan",
                table: "Foods",
                newName: "Tryptophan");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Threonine",
                table: "Foods",
                newName: "Threonine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Serine",
                table: "Foods",
                newName: "Serine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Proline",
                table: "Foods",
                newName: "Proline");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Phenylalanine",
                table: "Foods",
                newName: "Phenylalanine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Methionine",
                table: "Foods",
                newName: "Methionine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Lysine",
                table: "Foods",
                newName: "Lysine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Leucine",
                table: "Foods",
                newName: "Leucine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Isoleucine",
                table: "Foods",
                newName: "Isoleucine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Histidine",
                table: "Foods",
                newName: "Histidine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Glycine",
                table: "Foods",
                newName: "Glycine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Glutamine",
                table: "Foods",
                newName: "Glutamine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_GlutamicAcid",
                table: "Foods",
                newName: "GlutamicAcid");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Cystine",
                table: "Foods",
                newName: "Cystine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_AsparticAcid",
                table: "Foods",
                newName: "AsparticAcid");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Arginine",
                table: "Foods",
                newName: "Arginine");

            migrationBuilder.RenameColumn(
                name: "AminoAcids_Alanine",
                table: "Foods",
                newName: "Alanine");
        }
    }
}
