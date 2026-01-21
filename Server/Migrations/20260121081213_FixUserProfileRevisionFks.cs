using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class FixUserProfileRevisionFks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "LatestRevisionId1",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "PublishedRevisionId1",
                table: "UserProfile");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_LatestRevisionId",
                table: "UserProfile",
                column: "LatestRevisionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_PublishedRevisionId",
                table: "UserProfile",
                column: "PublishedRevisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_UserProfileRevision_LatestRevisionId",
                table: "UserProfile",
                column: "LatestRevisionId",
                principalTable: "UserProfileRevision",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_UserProfileRevision_PublishedRevisionId",
                table: "UserProfile",
                column: "PublishedRevisionId",
                principalTable: "UserProfileRevision",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_LatestRevisionId",
                table: "UserProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfileRevision_PublishedRevisionId",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_LatestRevisionId",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_PublishedRevisionId",
                table: "UserProfile");

            migrationBuilder.AddColumn<Guid>(
                name: "LatestRevisionId1",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PublishedRevisionId1",
                table: "UserProfile",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_LatestRevisionId1",
                table: "UserProfile",
                column: "LatestRevisionId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_PublishedRevisionId1",
                table: "UserProfile",
                column: "PublishedRevisionId1");

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
    }
}
