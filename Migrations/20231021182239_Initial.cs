using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace genealogica.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Birth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Death = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pid = table.Column<int>(type: "int", nullable: false),
                    Mid = table.Column<int>(type: "int", nullable: false),
                    Fid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "People");
        }
    }
}
