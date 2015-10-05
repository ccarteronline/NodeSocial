-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 07, 2015 at 02:56 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `nodeSocial`
--

-- --------------------------------------------------------

--
-- Table structure for table `barebones`
--

CREATE TABLE `barebones` (
`id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `version` varchar(7) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barebones`
--

INSERT INTO `barebones` (`id`, `title`, `version`, `description`) VALUES
(1, 'The Node Social Experiment', '0.0.1', 'Welcome to Node Social! This app features a login, signup, newsfeed and followers. It is an experiment of building a social app through the use of MEAN stack development');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
`id` int(11) NOT NULL,
  `task` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`) VALUES
(2, '-Front end( );'),
(3, '-Back end( );'),
(4, '-EyeFaceDB( );'),
(5, '-Zeta HD_2( );');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barebones`
--
ALTER TABLE `barebones`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barebones`
--
ALTER TABLE `barebones`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;