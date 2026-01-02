using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UserProfileWithRevisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "FamilyName",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "UserProfile");

            migrationBuilder.RenameColumn(
                name: "Verified",
                table: "UserProfile",
                newName: "GoogleEmailVerified");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "UserProfile",
                newName: "UpdatedAtUtc");

            migrationBuilder.RenameColumn(
                name: "Theme",
                table: "UserProfile",
                newName: "Visibility");

            migrationBuilder.RenameColumn(
                name: "LastLoginAt",
                table: "UserProfile",
                newName: "ShareTokenRevokedAt");

            migrationBuilder.RenameColumn(
                name: "GivenName",
                table: "UserProfile",
                newName: "GoogleId");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "UserProfile",
                newName: "CreatedAtUtc");

            migrationBuilder.AddColumn<string>(
                name: "Emails",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoginAtUtc",
                table: "UserProfile",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LatestRevisionId",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LatestRevisionId1",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedRevisionId",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedRevisionId1",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Roles",
                table: "UserProfile",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShareToken",
                table: "UserProfile",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShareTokenCreatedAt",
                table: "UserProfile",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThemeColor",
                table: "UserProfile",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TombstoneStatus",
                table: "UserProfile",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserProfileRevision",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserProfileId = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    GivenName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    FamilyName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    PictureUrl = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Description = table.Column<string>(type: "character varying(280)", maxLength: 280, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewedByUserId = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    ReviewedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModerationNotes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfileRevision", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfileRevision_UserProfile_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_LatestRevisionId1",
                table: "UserProfile",
                column: "LatestRevisionId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_PublishedRevisionId1",
                table: "UserProfile",
                column: "PublishedRevisionId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfileRevision_CreatedAtUtc",
                table: "UserProfileRevision",
                column: "CreatedAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfileRevision_UserProfileId_Status",
                table: "UserProfileRevision",
                columns: new[] { "UserProfileId", "Status" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_UserProfileRevision_LatestRevisionId1",
                table: "UserProfile",
                column: "LatestRevisionId1",
                principalTable: "UserProfileRevision",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_UserProfileRevision_PublishedRevisionId1",
                table: "UserProfile",
                column: "PublishedRevisionId1",
                principalTable: "UserProfileRevision",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropTable(
                name: "UserProfileRevision");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "Emails",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "LastLoginAtUtc",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "LatestRevisionId",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "PublishedRevisionId",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "Roles",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "ShareToken",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "ShareTokenCreatedAt",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "ThemeColor",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "TombstoneStatus",
                table: "UserProfile");

            migrationBuilder.RenameColumn(
                name: "Visibility",
                table: "UserProfile",
                newName: "Theme");

            migrationBuilder.RenameColumn(
                name: "UpdatedAtUtc",
                table: "UserProfile",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ShareTokenRevokedAt",
                table: "UserProfile",
                newName: "LastLoginAt");

            migrationBuilder.RenameColumn(
                name: "GoogleId",
                table: "UserProfile",
                newName: "GivenName");

            migrationBuilder.RenameColumn(
                name: "GoogleEmailVerified",
                table: "UserProfile",
                newName: "Verified");

            migrationBuilder.RenameColumn(
                name: "CreatedAtUtc",
                table: "UserProfile",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserProfile",
                type: "character varying(280)",
                maxLength: 280,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "UserProfile",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FamilyName",
                table: "UserProfile",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "UserProfile",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "UserProfile",
                type: "character varying(1024)",
                maxLength: 1024,
                nullable: true);
        }
    }
}
