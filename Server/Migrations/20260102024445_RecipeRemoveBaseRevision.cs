using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RecipeRemoveBaseRevision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeRevisions_RecipeRevisions_BaseRevisionId",
                table: "RecipeRevisions");

            migrationBuilder.DropIndex(
                name: "IX_RecipeRevisions_BaseRevisionId",
                table: "RecipeRevisions");

            migrationBuilder.DropColumn(
                name: "BaseRevisionId",
                table: "RecipeRevisions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BaseRevisionId",
                table: "RecipeRevisions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecipeRevisions_BaseRevisionId",
                table: "RecipeRevisions",
                column: "BaseRevisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeRevisions_RecipeRevisions_BaseRevisionId",
                table: "RecipeRevisions",
                column: "BaseRevisionId",
                principalTable: "RecipeRevisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
