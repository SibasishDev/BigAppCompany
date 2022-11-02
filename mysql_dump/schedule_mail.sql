-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2022 at 04:26 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schedule_email`
--

-- --------------------------------------------------------

--
-- Table structure for table `schedule_mail`
--

CREATE TABLE `schedule_mail` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `schedule_time` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `is_sent` int(11) DEFAULT 0 COMMENT '0 : Schedule\r\n1 : sent\r\n2 : fail'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule_mail`
--

INSERT INTO `schedule_mail` (`id`, `email`, `schedule_time`, `message`, `is_sent`) VALUES
(21, 'dassibasishdas@gmail.com', 1667399880, 'hello Sibasish', 1),
(22, 'dassibasish46@gmail.com', 1667400000, 'hello Sibasish', 1),
(23, 'dassibasish46.com', 1667400000, 'hello Sibasish', 2),
(26, 'dassibasishdas@gmail.com', 1667402460, 'thank you', 1),
(27, 'dassibasishdas@gmail.com', 1667402400, 'welcome Sibasish', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schedule_mail`
--
ALTER TABLE `schedule_mail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schedule_mail`
--
ALTER TABLE `schedule_mail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
