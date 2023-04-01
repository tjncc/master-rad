using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrivingApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<short>(type: "smallint", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Examiner_PhoneNumber = table.Column<long>(type: "bigint", maxLength: 15, nullable: true),
                    Examiner_DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Examiner_Jmbg = table.Column<long>(type: "bigint", maxLength: 13, nullable: true),
                    Examiner_Category = table.Column<short>(type: "smallint", nullable: true),
                    Instructor_PhoneNumber = table.Column<long>(type: "bigint", maxLength: 15, nullable: true),
                    Instructor_DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Instructor_Jmbg = table.Column<long>(type: "bigint", maxLength: 13, nullable: true),
                    Instructor_Category = table.Column<short>(type: "smallint", nullable: true),
                    Instructor_SchoolId = table.Column<long>(type: "bigint", nullable: true),
                    PhoneNumber = table.Column<long>(type: "bigint", maxLength: 15, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Jmbg = table.Column<long>(type: "bigint", maxLength: 13, nullable: true),
                    Category = table.Column<short>(type: "smallint", nullable: true),
                    NumberOfClasses = table.Column<long>(type: "bigint", nullable: true),
                    NumberOfExams = table.Column<long>(type: "bigint", nullable: true),
                    PassedTheory = table.Column<bool>(type: "bit", nullable: true),
                    SchoolId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Schools_Instructor_SchoolId",
                        column: x => x.Instructor_SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DrivingClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassType = table.Column<short>(type: "smallint", nullable: false),
                    IsConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    InstructorId = table.Column<long>(type: "bigint", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false),
                    SchoolId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrivingClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrivingClasses_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DrivingClasses_Users_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DrivingClasses_Users_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PassedPolygon = table.Column<bool>(type: "bit", nullable: false),
                    PassedDriving = table.Column<bool>(type: "bit", nullable: false),
                    ExaminerId = table.Column<long>(type: "bigint", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exams_Users_ExaminerId",
                        column: x => x.ExaminerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Exams_Users_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DrivingClasses_InstructorId",
                table: "DrivingClasses",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_DrivingClasses_SchoolId",
                table: "DrivingClasses",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_DrivingClasses_StudentId",
                table: "DrivingClasses",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_ExaminerId",
                table: "Exams",
                column: "ExaminerId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_StudentId",
                table: "Exams",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Instructor_SchoolId",
                table: "Users",
                column: "Instructor_SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SchoolId",
                table: "Users",
                column: "SchoolId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrivingClasses");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Schools");
        }
    }
}
