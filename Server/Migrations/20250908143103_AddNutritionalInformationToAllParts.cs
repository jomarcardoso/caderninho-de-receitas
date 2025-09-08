using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddNutritionalInformationToAllParts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Alanine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Arginine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_AsparticAcid",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Cystine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_GlutamicAcid",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glutamine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Glycine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Histidine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Isoleucine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Leucine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Lysine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Methionine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Phenylalanine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Proline",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Serine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Threonine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tryptophan",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Tyrosine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AminoAcids_Valine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Calcium",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Copper",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Fluoride",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Iron",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Magnesium",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Manganese",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Phosphorus",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Potassium",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Selenium",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Sodium",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Minerals_Zinc",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Acidification",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Ashes",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Calories",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Carbohydrates",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Cholesterol",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_DietaryFiber",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gi",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Gl",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_Proteins",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_SaturedFats",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NutritionalInformation_TotalFat",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_A",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_AlphaCarotene",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B1",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B11",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B12",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B2",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B3",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B5",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B6",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B7",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_B9",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_BetaCarotene",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_C",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Choline",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D2",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_D3",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_E",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_K",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Vitamins_Lycopene",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AminoAcids_Alanine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Arginine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_AsparticAcid",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Cystine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_GlutamicAcid",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glutamine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Glycine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Histidine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Isoleucine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Leucine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Lysine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Methionine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Phenylalanine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Proline",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Serine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Threonine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tryptophan",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Tyrosine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "AminoAcids_Valine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Calcium",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Copper",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Fluoride",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Iron",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Magnesium",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Manganese",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Phosphorus",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Potassium",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Selenium",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Sodium",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Minerals_Zinc",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Acidification",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Ashes",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Calories",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Carbohydrates",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Cholesterol",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_DietaryFiber",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gi",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Gl",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_MonounsaturatedFats",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_PolyunsaturatedFats",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_Proteins",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_SaturedFats",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "NutritionalInformation_TotalFat",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_A",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_AlphaCarotene",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B1",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B11",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B12",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B2",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B3",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B5",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B6",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B7",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_B9",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_BetaCarotene",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_C",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_Choline",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_CryptoxanthinCarotene",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_D",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_D2",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_D3",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_E",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_K",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "Vitamins_Lycopene",
                table: "RecipeStep");
        }
    }
}
