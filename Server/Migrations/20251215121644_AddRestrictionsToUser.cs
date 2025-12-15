using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRestrictionsToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Allergies",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CulturalRestrictions",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DietStyles",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Intolerances",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MedicalRestrictions",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PersonalPreferences",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Allergies",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "CulturalRestrictions",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "DietStyles",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "Intolerances",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "MedicalRestrictions",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "PersonalPreferences",
                table: "UserProfile");
        }
    }
}
