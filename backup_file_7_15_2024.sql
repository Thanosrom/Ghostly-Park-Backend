-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: ghostlypark
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.23.10.2

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
-- Table structure for table `parked_slots`
--

DROP TABLE IF EXISTS `parked_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parked_slots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `parked_longitude` double NOT NULL,
  `parked_latitude` double NOT NULL,
  `parked_time` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parked_slots`
--

LOCK TABLES `parked_slots` WRITE;
/*!40000 ALTER TABLE `parked_slots` DISABLE KEYS */;
/*!40000 ALTER TABLE `parked_slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `carInfo` varchar(45) NOT NULL,
  `coins` int DEFAULT NULL,
  `gems` int DEFAULT NULL,
  `subscription` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (48,'example','$2b$10$BANMpv7w9MVv1sCXOiM6TeEAvG5TW0L6eUW1PbmKqp.ZM83TlSssS','example@ghostlypark.com','Corolla',50,50,0),(50,'tanasoparkara','$2b$10$X3Hga8KuVNnExWLxn31xq./Y04ffqYkDZlhmP6v1puhiUtdoA2eSa','panosn30@gmail.com','Toyota Corolla',50,50,0),(51,'sotos','$2b$10$Yrix4iX11RZJow2BTA/55u9oR81/RRNkWVyFtFV2OvijBjy2zXtKm','sotiris.686@gmail.com','opel corsa',50,50,0),(52,'GigisMousias','$2b$10$9/pPPij0ZJrz228iX6AWGuuvqtm3oGUFNBIrl.1peO6n0PUeY3CFG','gigaros.365@gmail.com','Opel Corsa',50,50,0),(53,'paressa','$2b$10$vQ.qtfCGTFPB2iXGqeBk..owEK9B0blODfeW8w8bS.Wna7Ja8vUwW','paressa.ro@gmail.com','hundai',50,50,0),(54,'vaspap','$2b$10$ZbnlThG7vrL.yOoWlLqWGOLv27WaXoN6zCAgMqWE0kLABo1mabXNm','baspap@windowslive.com','honda civic',48,49,0),(56,'Fay','$2b$10$sSq/RIbllf9/4b44ayAgee8QQJl6pdfYNR5.4VacwbfjhMhT4gu7i','fayrom32@gmail.com','Toyota Corolla ',50,50,0),(58,'Mikekoste','$2b$10$lOoksA6fBwvG1G1pPH4pL.MRwXutqvu6/gwnfwBE7UBNVYlzdvPCy','justtomorrow58@gmail.com','BMW E46',49,49,0),(60,'Fanny','$2b$10$mo6wX0MQed3pmqdAznQd1OHBKlk.XIJzItBJqd3BjhXQdSSfsiHVO','fanixylouri@outlook.com','Hyundai i10 ',50,50,0),(61,'JohnZisimo','$2b$10$MqvlZgE9KYQSRdk8RH9xvO.4jjhbXrK7HcQe6qyZCGsh/yiJWtZPm','j.zhsimopoulos@gmail.com','Fiat Punto ',46,46,0),(62,'thanosrom','$2b$10$WikI6rYCO6YKTrIA239Qe.1xMFUATXuFpO6IiuikZShvp5J1ViLE2','thanosrom95@gmail.com','Auris',49,50,0),(63,'PepiPap','$2b$10$AYfof39N4QlHIIIv.KzFgekPpA5IEBpFFYkQUiairwUrWhqYuxFr6','pepipap67@hotmail.gr','Toyota ',50,50,0),(64,'mike','$2b$10$QgYgqClYT3YM.ucMgU7.0.b/CYPr6BJBm0kR0QKR87HSaAw.jS7my','mikerom61@hotmail.gr','Mitsubishi ',50,50,0),(65,'mpia','$2b$10$oWPLSxfD6hPDcEAp3W8Bf.Pcv9.NNRQh5FY7hRRlTMDvKZh1tJW.u','Olympia.pap74@gmail.com','opelcorsa',25,24,0),(66,'olypap','$2b$10$M4kLg.1hSNTjbgljNdzdiefCrPjRycnIXRSdrSHnJD1EakJQcOUnC','olympia.pap2@gmail.com','opelcorsa',24,25,0),(67,'maria','$2b$10$ZNFNtHvzB7KCdYR.XB8/eerzCizAzXqf4fByt9xUIclpS2WViV0ny','mariapetanidou555@gmail.com','Corolla',24,25,0),(68,'ioarvanit','$2b$10$sQjGzjwang3Em17zRBJKmuv7N0pwYMK8g6sRMCkQZl4RDYhLTPKDO','ioarvanit@gmail.com','Suzuki Ignis ',21,23,0),(69,'Maraki','$2b$10$iHUCJ8ZtvHB5GzmVpAemLOpjeK3DeoQphUxPM8TIivs.CU7MKLlf2','marysdrag@gmail.com','Hyundai',25,25,0);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unparked_slots`
--

DROP TABLE IF EXISTS `unparked_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unparked_slots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `unParked_latitude` double NOT NULL,
  `unParked_longitude` double NOT NULL,
  `unParked_time` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=390 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unparked_slots`
--

LOCK TABLES `unparked_slots` WRITE;
/*!40000 ALTER TABLE `unparked_slots` DISABLE KEYS */;
/*!40000 ALTER TABLE `unparked_slots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-15 16:14:06
