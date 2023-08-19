﻿// <auto-generated />
using System;
using DrivingApp.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DrivingApp.Migrations
{
    [DbContext(typeof(DrivingAppContext))]
    [Migration("20230816162256_AddTimeInRoute")]
    partial class AddTimeInRoute
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DrivingApp.Model.Appointment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<short?>("ClassType")
                        .HasColumnType("smallint");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<short?>("ExamStatus")
                        .HasColumnType("smallint");

                    b.Property<long?>("ExaminerId")
                        .HasColumnType("bigint");

                    b.Property<long?>("InstructorId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsExam")
                        .HasColumnType("bit");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("StudentId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ExaminerId");

                    b.HasIndex("InstructorId");

                    b.HasIndex("StudentId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("DrivingApp.Model.Route", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Coordinates")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("InstructorId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("StudentId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Routes");
                });

            modelBuilder.Entity("DrivingApp.Model.School", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<long>("PhoneNumber")
                        .HasColumnType("bigint");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Schools");
                });

            modelBuilder.Entity("DrivingApp.Model.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<short>("Role")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("DrivingApp.Model.Admin", b =>
                {
                    b.HasBaseType("DrivingApp.Model.User");

                    b.HasDiscriminator().HasValue("Admin");
                });

            modelBuilder.Entity("DrivingApp.Model.Examiner", b =>
                {
                    b.HasBaseType("DrivingApp.Model.User");

                    b.Property<short>("Category")
                        .HasColumnType("smallint")
                        .HasColumnName("Examiner_Category");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2")
                        .HasColumnName("Examiner_DateOfBirth");

                    b.Property<long>("Jmbg")
                        .HasMaxLength(13)
                        .HasColumnType("bigint")
                        .HasColumnName("Examiner_Jmbg");

                    b.Property<long>("PhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("bigint")
                        .HasColumnName("Examiner_PhoneNumber");

                    b.HasDiscriminator().HasValue("Examiner");
                });

            modelBuilder.Entity("DrivingApp.Model.Instructor", b =>
                {
                    b.HasBaseType("DrivingApp.Model.User");

                    b.Property<short>("Category")
                        .HasColumnType("smallint")
                        .HasColumnName("Instructor_Category");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2")
                        .HasColumnName("Instructor_DateOfBirth");

                    b.Property<long>("Jmbg")
                        .HasMaxLength(13)
                        .HasColumnType("bigint")
                        .HasColumnName("Instructor_Jmbg");

                    b.Property<long>("PhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("bigint")
                        .HasColumnName("Instructor_PhoneNumber");

                    b.Property<long>("SchoolId")
                        .HasColumnType("bigint")
                        .HasColumnName("Instructor_SchoolId");

                    b.HasIndex("SchoolId");

                    b.HasDiscriminator().HasValue("Instructor");
                });

            modelBuilder.Entity("DrivingApp.Model.Student", b =>
                {
                    b.HasBaseType("DrivingApp.Model.User");

                    b.Property<short>("Category")
                        .HasColumnType("smallint");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<long?>("InstructorId")
                        .HasColumnType("bigint");

                    b.Property<long>("Jmbg")
                        .HasMaxLength(13)
                        .HasColumnType("bigint");

                    b.Property<long>("NumberOfClasses")
                        .HasColumnType("bigint");

                    b.Property<long>("NumberOfExams")
                        .HasColumnType("bigint");

                    b.Property<bool>("PassedDriving")
                        .HasColumnType("bit");

                    b.Property<bool>("PassedTheory")
                        .HasColumnType("bit");

                    b.Property<long>("PhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("bigint");

                    b.Property<long?>("SchoolId")
                        .HasColumnType("bigint");

                    b.HasIndex("SchoolId");

                    b.HasDiscriminator().HasValue("Student");
                });

            modelBuilder.Entity("DrivingApp.Model.Appointment", b =>
                {
                    b.HasOne("DrivingApp.Model.Examiner", "Examiner")
                        .WithMany()
                        .HasForeignKey("ExaminerId")
                        .OnDelete(DeleteBehavior.ClientCascade);

                    b.HasOne("DrivingApp.Model.Instructor", "Instructor")
                        .WithMany()
                        .HasForeignKey("InstructorId")
                        .OnDelete(DeleteBehavior.ClientCascade);

                    b.HasOne("DrivingApp.Model.Student", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.Navigation("Examiner");

                    b.Navigation("Instructor");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("DrivingApp.Model.Instructor", b =>
                {
                    b.HasOne("DrivingApp.Model.School", null)
                        .WithMany("Instructors")
                        .HasForeignKey("SchoolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DrivingApp.Model.Student", b =>
                {
                    b.HasOne("DrivingApp.Model.School", null)
                        .WithMany("Students")
                        .HasForeignKey("SchoolId");
                });

            modelBuilder.Entity("DrivingApp.Model.School", b =>
                {
                    b.Navigation("Instructors");

                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
