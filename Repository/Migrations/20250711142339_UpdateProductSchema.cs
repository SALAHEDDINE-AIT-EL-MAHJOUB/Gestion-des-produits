using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class UpdateProductSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLists_Products_ProductId",
                table: "ProductLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductLists",
                table: "ProductLists");

            migrationBuilder.DropIndex(
                name: "IX_ProductLists_ProductId",
                table: "ProductLists");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ProductLists");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Produits");

            migrationBuilder.RenameTable(
                name: "ProductLists",
                newName: "ListProduits");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Produits",
                newName: "Prix");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Produits",
                newName: "Nom");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Produits",
                newName: "PhotoUrl");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ListProduits",
                newName: "Nom");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreation",
                table: "Produits",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Produits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ListProduitId",
                table: "Produits",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produits",
                table: "Produits",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListProduits",
                table: "ListProduits",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Produits",
                table: "Produits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ListProduits",
                table: "ListProduits");

            migrationBuilder.DropColumn(
                name: "DateCreation",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "ListProduitId",
                table: "Produits");

            migrationBuilder.RenameTable(
                name: "Produits",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "ListProduits",
                newName: "ProductLists");

            migrationBuilder.RenameColumn(
                name: "Prix",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Products",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "ProductLists",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ProductLists",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductLists",
                table: "ProductLists",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductLists_ProductId",
                table: "ProductLists",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLists_Products_ProductId",
                table: "ProductLists",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
