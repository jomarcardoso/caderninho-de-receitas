using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UserProfileRenameOwnerIdToId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "UserProfile",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_OwnerId",
                table: "UserProfile",
                newName: "IX_UserProfile_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserProfile",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_Id",
                table: "UserProfile",
                newName: "IX_UserProfile_OwnerId");
        }
    }
}
