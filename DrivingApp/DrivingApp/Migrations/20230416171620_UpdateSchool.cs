using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrivingApp.Migrations
{
    public partial class UpdateSchool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Schools",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Schools");
        }
    }
}
