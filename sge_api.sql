-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: sge_db
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `procedencia` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (17016875,'Salatiel Pomol','FMAT'),(17016878,'Lucero Juárez','FMAT'),(17016880,'Alberto Requena','FMAT'),(17016881,'Alejandro Ucan','FMAT'),(17016888,'Ramiro Lopez','FCA'),(18034423,'Manuel Perez','FEDU'),(23456789,'Luis Ku','FE'),(24612278,'German Lopez','FIQ');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `becarios`
--

DROP TABLE IF EXISTS `becarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `becarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `imagen` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `becarios`
--

LOCK TABLES `becarios` WRITE;
/*!40000 ALTER TABLE `becarios` DISABLE KEYS */;
INSERT INTO `becarios` VALUES (1,'admin','$2a$10$yQGtCD9EMcxLNHBJnYCXgO3KDbJL1aPuSm8DAggmr3MLaPzCMEY.y','1638078669415_img.jfif'),(20220108,'Lucero Juárez','$2a$10$i0UMERjdkvkrzNbpuifquunS.QWAQoLWAQTgECa9cLOKaDdVuga4W','1638078669415_img.jfif');
/*!40000 ALTER TABLE `becarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `inventario` varchar(30) NOT NULL,
  `disponibilidad` varchar(30) DEFAULT 'Disponible',
  `imagen` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (23543344,'Laptop','Dell','5434565434','543234564','Disponible','1637811830371_img.jpg'),(201408241,'Laptop','Lenovo','LNV2013','201408240005','Disponible','equipo20140824.jpg'),(201408242,'Videoproyector','Canon','CNN2014','201408240008','Disponible','equipo201408248.jpg'),(201408243,'Extensión','Truper','TRPR2014','201408240020','Disponible','equipo2014082208.jpg'),(201408244,'Regulador','Perfect Choose','PC2014','201408240024','Disponible','equipo20140823338.jpg'),(201408245,'Bocina','Realtek','RLTCK2014','201408240028','Disponible','equipo2014088238.jpg'),(201408246,'Tarjeta_inalámbrica','Cisco','CSC2014','201408240032','Disponible','1638111739446_img.jpg'),(201408247,'Impresora','Canon','CNN2014','201408240036','Disponible','equipo2014088.jpg');
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_p` date NOT NULL,
  `hora_p` time NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `fecha_d` date NOT NULL,
  `hora_d` time NOT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `id_becario` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipo_idx` (`id_equipo`),
  KEY `id_alumno_idx` (`id_alumno`),
  KEY `id_becario_idx` (`id_becario`),
  CONSTRAINT `id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_becario` FOREIGN KEY (`id_becario`) REFERENCES `becarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
INSERT INTO `prestamos` VALUES (21,'2021-11-28','00:53:00','Interno','2021-11-30','16:00:00','Devuelto',1,17016878,201408241),(24,'2021-11-28','12:35:00','Interno','2021-11-30','17:35:00','Devuelto',1,17016881,23543344),(25,'2021-11-28','18:51:00','Interno','2021-12-10','12:00:00','Devuelto',1,23456789,201408247),(26,'2021-11-28','20:18:00','Interno','2021-11-28','20:19:00','Devuelto',1,17016881,23543344);
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-02 17:34:41
