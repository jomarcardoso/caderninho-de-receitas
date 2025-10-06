using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddEssentialAminoAcids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AminoAcidsScore",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Histidine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Leucine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Lysine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Methionine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Threonine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EssentialAminoAcids_Valine",
                table: "Food",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AminoAcidsScore",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Histidine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Isoleucine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Leucine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Lysine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Methionine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Phenylalanine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Threonine",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Tryptophan",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "EssentialAminoAcids_Valine",
                table: "Food");
        }
    }
}
