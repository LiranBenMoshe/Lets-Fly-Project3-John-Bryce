-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 08:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations-website`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(19, 1),
(19, 7),
(19, 27),
(19, 8),
(19, 6),
(19, 5),
(19, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(19, 'Liran', 'User', 'user@gmail.com', '$2b$10$WFPamDBtLvjjld5fDTlzt.SFUM3V3.QeY1X0OA6tbQSEMUasTfOZO', 2),
(20, 'Liran', 'Admin', 'admin@gmail.com', '$2b$10$Zjd6vcK0xF7mMJWbbkeC/O..VrutyhQgmnk6zuqunvbzJmHQ8jFXC', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(450) NOT NULL,
  `startDate` varchar(10) NOT NULL,
  `endDate` varchar(10) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(212) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Paris', 'Paris, the \"City of Love,\" captivates with art, history, and enchantment. Iconic landmarks, delicious cuisine, and riverside strolls await you.\r\nhow much length', '2023-10-25', '2023-11-02', 1500.00, '12e63c0e-06e7-4c5d-89b0-46b0827dae99.jpg'),
(2, 'New York', 'New York, often referred to as \"The Big Apple,\" is a bustling metropolis known for its iconic skyline, including the Empire State Building, and a vibrant cultural scene. Its a diverse and dynamic city where you can find everything from world-class museums to lively street food vendors, making it a city that never sleeps.', '2023-10-17', '2023-10-18', 2000.00, '027e1ce7-6d40-4b00-864e-d597e1e3cc95.jpg'),
(3, 'Kyoto', 'Explore the historic temples and beautiful gardens of Kyoto.', '2023-12-05', '2023-12-15', 1800.00, '6ec3638f-b8ec-4ff7-bc08-b2c0d0917bf8.jpg'),
(5, 'London', 'Explore the historical landmarks and British culture in London.', '2024-01-10', '2024-01-18', 2800.00, '9d83ece1-f273-46f9-946b-15085b1a776a.jpg'),
(6, 'Sydney', 'Discover the beauty of Sydney with its iconic Opera House and beaches.', '2024-02-05', '2024-02-15', 3400.00, '9094c860-6937-41b0-bc34-a2bdd21854e9.jpg'),
(7, 'Barcelona', 'Enjoy the colorful architecture and vibrant atmosphere of Barcelona.', '2024-02-20', '2024-02-27', 2500.00, 'c4e42ee7-c074-42a5-b177-7be225c9a682.jpg'),
(8, 'Bangkok', 'Experience the bustling markets and street food of Bangkok.', '2024-03-05', '2024-03-12', 2900.00, '094f48ec-63e6-44b9-8b1f-dad9c6d7eea5.jpg'),
(9, 'Cairo', 'Explore the ancient pyramids and temples in Cairo.', '2024-03-20', '2024-03-28', 2300.00, '29e9003a-efe9-4625-9c98-a13877ccaaea.jpg'),
(13, 'Dubai', 'Experience luxury and futuristic architecture in Dubai.', '2024-05-15', '2024-05-23', 3600.00, '60838e85-23e6-4498-ba03-2a1d01db247e.jpg'),
(15, 'Machu Picchu', 'Explore the ancient ruins and breathtaking scenery of Machu Picchu.', '2024-06-25', '2024-07-03', 3000.00, '889a4c29-912a-41db-be00-35796e43bb15.avif'),
(16, 'Santorini', 'Enjoy the stunning sunsets and white-washed buildings of Santorini.', '2024-07-10', '2024-07-18', 50.00, 'e309420d-0c85-4e87-97e0-63811a1e6fa6.jpg'),
(17, 'Hawaii', 'Relax on the beautiful beaches and explore volcanic landscapes in Hawaii.', '2024-08-05', '2024-08-15', 3500.00, '6c1bfdf8-69c2-4170-8f19-0b0240e53408.jpg'),
(18, 'Prague', 'Discover the historic charm and architecture of Prague.', '2024-08-20', '2024-08-27', 2600.00, '22e6ef17-c1d3-4606-8a83-a2e794fa1434.jpg'),
(19, 'Istanbul', 'Explore the rich history and diverse culture of Istanbul.', '2024-09-02', '2024-09-10', 2700.00, '59cd28ad-ca5b-40d2-ba3c-edef3825e012.jpg'),
(20, 'Marrakech', 'Experience the vibrant markets and unique architecture of Marrakech.', '2024-09-15', '2024-09-23', 2700.00, '15bcfebd-ad4b-4e98-b19b-402b6ebae504.jpg'),
(21, 'Seoul', 'Immerse yourself in Korean culture and visit modern and historic sites.', '2024-10-01', '2024-10-09', 3000.00, '2ef1a36c-dccb-4849-b280-498d0c04a74f.jpg'),
(22, 'Vienna', 'Enjoy classical music and historic landmarks in Vienna.', '2024-10-15', '2024-10-23', 2600.00, '21bb8ccf-6eb5-408f-ba37-0a893a676b08.jpg'),
(23, 'Copenhagen', 'Explore Scandinavian charm and visit the iconic Little Mermaid statue.', '2024-11-05', '2024-11-15', 2800.00, '5ca3b6c7-dc38-4338-b718-8291ced9dc8c.jpg'),
(24, 'Nairobi', 'Experience African wildlife on a safari in Nairobi.', '2024-11-20', '2024-11-27', 3200.00, '76c3d490-3a93-4418-8002-3a18da9184f9.avif'),
(25, 'Dublin', 'Enjoy the lively atmosphere and rich history of Dublin.', '2024-12-05', '2024-12-13', 2500.00, 'f98b2f7a-c8bf-4769-92c3-37c79cf2775d.jpg'),
(27, 'Bali', 'Welcome to Bali, have fun !', '2024-03-15', '2024-03-25', 1800.00, 'c8d50a8f-e413-4e7a-8f17-06c589d4f635.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
