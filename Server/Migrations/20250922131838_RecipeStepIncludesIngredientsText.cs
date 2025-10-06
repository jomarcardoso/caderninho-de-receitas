using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeStepIncludesIngredientsText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Histidine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Isoleucine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Leucine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Lysine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Methionine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Threonine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Tryptophan",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Valine",
                table: "RecipeStep",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "IngredientsText",
                table: "RecipeStep",
                type: "text",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Histidine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Leucine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Lysine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Methionine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Threonine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Valine",
                table: "Ingredient",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Histidine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Isoleucine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Leucine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Lysine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Methionine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Threonine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Tryptophan",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Valine",
                table: "RecipeStep");

            migrationBuilder.DropColumn(
                name: "IngredientsText",
                table: "RecipeStep");

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
                name: "EssentialAminoAcids_Histidine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Leucine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Lysine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Methionine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Threonine",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Valine",
                table: "Ingredient");
        }
    }
}
