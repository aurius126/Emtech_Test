-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: emtech
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'TICS'),(2,'Matematicas'),(3,'Historia'),(4,'Psicologia');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periods`
--

DROP TABLE IF EXISTS `periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `period` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periods`
--

LOCK TABLES `periods` WRITE;
/*!40000 ALTER TABLE `periods` DISABLE KEYS */;
INSERT INTO `periods` VALUES (1,'Primavera 2024',1),(2,'Primavera 2021',0),(3,'Primavera 2022',0),(4,'Primavera 2023',0);
/*!40000 ALTER TABLE `periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `second_name` varchar(30) DEFAULT NULL,
  `surname` varchar(30) NOT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `course` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `percent` int(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `students_ID_IDX` (`id`) USING BTREE,
  KEY `students_FK` (`course`),
  KEY `students_FK_1` (`period`),
  CONSTRAINT `students_FK` FOREIGN KEY (`course`) REFERENCES `courses` (`id`),
  CONSTRAINT `students_FK_1` FOREIGN KEY (`period`) REFERENCES `periods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Julio','','Castro','','john.doe@example.com','9842347771',2,1,1,25),(6,'Jesus','Leonel','Dominguez','Farfan','jesusleonel126@gmail.com','9831003989',1,1,1,0),(20,'Maria','','Morales','','maria@gmail.com','9845784224',1,1,1,75),(23,'Jesus','Leonel','Dominguez','Farfan','jesusleonel126@gmail.com','9831003989',1,2,1,0),(24,'Maria','Isabel','Gomez','Hernandez','mariaisabel@gmail.com','9876543210',2,1,1,0),(25,'Pedro','Antonio','Martinez','Lopez','pedro.antonio@example.com','9871234567',3,3,1,0),(26,'Ana','Gabriela','Fernandez','Ramirez','anagabriela@example.com','9567890123',3,3,1,0),(27,'Juan','Pablo','Garcia','Perez','juanpablo@example.com','9456789012',3,1,1,0),(28,'Juan','Pablo','Garcia','Perez','juanpablo@example.com','9456789012',3,1,0,0);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'emtech'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 20:58:05
