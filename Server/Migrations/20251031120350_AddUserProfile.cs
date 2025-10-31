using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    OwnerId = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    GivenName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    FamilyName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    PictureUrl = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Locale = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: true),
                    Bio = table.Column<string>(type: "character varying(280)", maxLength: 280, nullable: true),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    FeaturedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.OwnerId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_OwnerId",
                table: "UserProfile",
                column: "OwnerId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfile");
        }
    }
}
