-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 06, 2023 at 11:34 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autobahn`
--

-- --------------------------------------------------------

--
-- Table structure for table `registered`
--

CREATE TABLE `registered` (
  `userId` varchar(150) NOT NULL,
  `fieldId` varchar(250) NOT NULL,
  `session` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `id` int(4) NOT NULL,
  `field` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`id`, `field`) VALUES
(2, 'Service'),
(3, 'Other'),
(5, 'Printing '),
(6, 'Food and Beverage'),
(7, 'Textile and Clothing'),
(8, 'Wood'),
(9, 'Plastic and Rubber'),
(11, 'Metalworking'),
(12, 'Machinery'),
(13, 'Furniture'),
(18, 'Electronics and Optics'),
(19, 'Construction materials'),
(21, 'Transport and Logistics'),
(22, 'Tourism'),
(25, 'Business services'),
(28, 'Information Technology and Telecommunications'),
(29, 'Energy technology'),
(33, 'Environment'),
(35, 'Engineering'),
(37, 'Creative industries'),
(39, 'Milk &amp; dairy products '),
(40, 'Meat &amp; meat products'),
(42, 'Fish &amp; fish products '),
(43, 'Beverages'),
(44, 'Clothing'),
(45, 'Textile'),
(47, 'Wooden houses'),
(51, 'Wooden building materials'),
(53, 'Plastics welding and processing'),
(54, 'Packaging'),
(55, 'Blowing'),
(57, 'Moulding'),
(62, 'Forgings, Fasteners '),
(66, 'MIG, TIG, Aluminum welding'),
(67, 'Construction of metal structures'),
(69, 'Gas, Plasma, Laser cutting'),
(75, 'CNC-machining'),
(91, 'Machinery equipment/tools'),
(93, 'Metal structures'),
(94, 'Machinery components'),
(97, 'Maritime'),
(98, 'Kitchen '),
(99, 'Project furniture'),
(101, 'Living room '),
(111, 'Air'),
(112, 'Road'),
(113, 'Water'),
(114, 'Rail'),
(121, 'Software, Hardware'),
(122, 'Telecommunications'),
(141, 'Translation services'),
(145, 'Labelling and packaging printing'),
(148, 'Advertising'),
(150, 'Book/Periodicals printing'),
(224, 'Manufacture of machinery '),
(227, 'Repair and maintenance service'),
(230, 'Ship repair and conversion'),
(263, 'Houses and buildings'),
(267, 'Metal products'),
(269, 'Boat/Yacht building'),
(271, 'Aluminium and steel workboats '),
(337, 'Other (Wood)'),
(341, 'Outdoor '),
(342, 'Bakery &amp; confectionery products'),
(378, 'Sweets &amp; snack food'),
(385, 'Bedroom'),
(389, 'Bathroom/sauna '),
(390, 'Children’s room '),
(392, 'Office'),
(394, 'Other (Furniture)'),
(437, 'Other'),
(508, 'Other'),
(542, 'Metal works'),
(556, 'Plastic goods'),
(559, 'Plastic processing technology'),
(560, 'Plastic profiles'),
(576, 'Programming, Consultancy'),
(581, 'Data processing, Web portals, E-marketing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=582;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
