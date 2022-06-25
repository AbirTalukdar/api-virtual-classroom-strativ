DROP DATABASE IF EXISTS `virtual_classroom`;
CREATE DATABASE IF NOT EXISTS `virtual_classroom` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `virtual_classroom`;

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL DEFAULT '',
	`password` varchar(255) NOT NULL DEFAULT '',
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`admin_id` int(10) unsigned NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT '',
	`email` varchar(255) NOT NULL DEFAULT '',
	`password` varchar(255) NOT NULL DEFAULT '',
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`classroom_id` int(10) unsigned NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT '',
	`email` varchar(255) NOT NULL DEFAULT '',
	`schoolID` int(10) unsigned NOT NULL,
	`password` varchar(255) NOT NULL DEFAULT '',
	`code` int(10) unsigned NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `assignments`;
CREATE TABLE IF NOT EXISTS `assignments`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`classroom_id` int(10) unsigned NOT NULL,
	`total_mark` int(255) NOT NULL,
	`deadline` date NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `exams`;
CREATE TABLE IF NOT EXISTS `exams`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`classroom_id` int(10) unsigned NOT NULL,
	`total_mark` int(255) NOT NULL,
	`deadline` date NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `classrooms`;
CREATE TABLE IF NOT EXISTS `classrooms`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`teacher_id` int(10) unsigned NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT '',
	`subject_code` int(10) unsigned NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `exam_students`;
CREATE TABLE IF NOT EXISTS `exam_students`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`exam_id` int(10) unsigned NOT NULL,
	`student_id` int(10) unsigned NOT NULL,
	`obtained_mark` int(255) NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `assignment_students`;
CREATE TABLE IF NOT EXISTS `assignment_students`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`assignment_id` int(10) unsigned NOT NULL,
	`student_id` int(10) unsigned NOT NULL,
	`obtained_mark` int(255) NOT NULL,
	`deadline_status` BOOLEAN NOT NULL,
	`created_at` timestamp NULL DEFAULT NULL,
	PRIMARY KEY (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;