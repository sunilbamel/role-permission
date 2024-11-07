-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 08:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simplyfy`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `payload` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `ip_address`, `payload`, `response`, `type`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"Invalid email or password.\"}', 'login', 2, '2024-10-28 04:44:45', '2024-10-28 04:44:45'),
(2, NULL, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"data is not defined\"}', 'login', 2, '2024-10-28 04:45:52', '2024-10-28 04:45:52'),
(3, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-10-28 04:48:37', '2024-10-28 04:48:47'),
(4, NULL, '127.0.0.1', '{\"body\":{\"otp\":\"158738\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":false,\"msg\":\"Invalid request.\"}', 'verify-otp', 2, '2024-10-28 04:49:08', '2024-10-28 04:49:08'),
(5, NULL, '127.0.0.1', '{\"body\":{\"otp\":\"158738\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":false,\"msg\":\"OTP expired.\"}', 'verify-otp', 2, '2024-10-28 04:50:51', '2024-10-28 04:50:51'),
(6, 1, '127.0.0.1', '{\"body\":{\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Otp successfully send to your email.\"}', 'resend-otp', 1, '2024-10-28 04:52:30', '2024-10-28 04:52:32'),
(7, 1, '127.0.0.1', '{\"body\":{\"otp\":\"634111\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-10-28 04:52:45', '2024-10-28 04:52:45'),
(8, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-10-28 04:53:22', '2024-10-28 04:53:23'),
(9, 1, '127.0.0.1', '{\"body\":{\"otp\":\"375121\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-10-28 04:53:40', '2024-10-28 04:53:40'),
(10, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-10-28 04:59:00', '2024-10-28 04:59:02'),
(11, 1, '127.0.0.1', '{\"body\":{\"otp\":\"472818\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-10-28 04:59:23', '2024-10-28 04:59:23'),
(12, NULL, '127.0.0.1', '{\"body\":\"sbsunillbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"Invalid email or password.\"}', 'login', 2, '2024-10-28 05:15:48', '2024-10-28 05:15:48'),
(13, NULL, '127.0.0.1', '{\"body\":\"sbsunillbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"Invalid email or password.\"}', 'login', 2, '2024-10-28 05:16:00', '2024-10-28 05:16:00'),
(14, NULL, '127.0.0.1', '{\"body\":\"sbsunillbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"Invalid email or password.\"}', 'login', 2, '2024-10-28 05:16:11', '2024-10-28 05:16:11'),
(15, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-10-28 05:16:27', '2024-10-28 05:16:28'),
(16, 1, '127.0.0.1', '{\"body\":{\"otp\":\"666222\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-10-28 05:16:48', '2024-10-28 05:16:48'),
(17, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-10-28 05:42:57', '2024-10-28 05:42:58'),
(18, 1, '127.0.0.1', '{\"body\":{\"otp\":\"928153\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-10-28 05:43:10', '2024-10-28 05:43:10'),
(19, NULL, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":false,\"msg\":\"Invalid email or password.\"}', 'login', 2, '2024-11-03 02:00:42', '2024-11-03 02:00:42'),
(20, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-11-03 02:00:51', '2024-11-03 02:00:53'),
(21, 1, '127.0.0.1', '{\"body\":{\"otp\":\"732009\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-11-03 02:01:11', '2024-11-03 02:01:11'),
(22, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-11-04 04:40:43', '2024-11-04 04:41:04'),
(23, 1, '127.0.0.1', '{\"body\":{\"otp\":\"332171\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-11-04 04:41:21', '2024-11-04 04:41:21'),
(24, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-11-07 06:23:32', '2024-11-07 06:23:33'),
(25, 1, '127.0.0.1', '{\"body\":{\"otp\":\"915109\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-11-07 06:23:48', '2024-11-07 06:23:48'),
(26, 1, '127.0.0.1', '{\"body\":\"sbsunilbamel743@gmail.com\",\"header\":null}', '{\"status\":true,\"msg\":\"Please verify otp first.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'login', 2, '2024-11-07 06:26:15', '2024-11-07 06:26:16'),
(27, 1, '127.0.0.1', '{\"body\":{\"otp\":\"346425\",\"email\":\"sbsunilbamel743@gmail.com\"},\"header\":null}', '{\"status\":true,\"msg\":\"Login Successfully.\",\"data\":{\"email\":\"sbsunilbamel743@gmail.com\"}}', 'verify-otp', 2, '2024-11-07 06:27:17', '2024-11-07 06:27:17');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'sbsunilbamel743@gmail.com', '$2a$10$vjEkpjIJite3fvQOz/qZt.aGziPx0aYY8eIHq5gEHyRgRuniZy.kG', 1, 1, '2024-10-28 05:46:25', '2024-10-28 05:46:25'),
(2, 'subadmin', 'subadmin1@gmail.com', '$2a$10$7H3WwNn87Hc.Gd3THfOQa.DN3CLj3wKlr8ssIKe4TcXwTQySVmBtC', 4, 1, '2024-11-03 02:16:18', '2024-11-04 04:43:37');

-- --------------------------------------------------------

--
-- Table structure for table `permissiongroups`
--

CREATE TABLE `permissiongroups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `short_code` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissiongroups`
--

INSERT INTO `permissiongroups` (`id`, `name`, `short_code`, `status`) VALUES
(1, 'User', 'adminuser', 1),
(2, 'Permissions', 'permissions', 1),
(3, 'Roles', 'roles', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rolepermissions`
--

CREATE TABLE `rolepermissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `edit` int(11) DEFAULT 0,
  `view` int(11) DEFAULT 0,
  `add` int(11) DEFAULT 0,
  `delete` int(11) DEFAULT 0,
  `super_admin` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolepermissions`
--

INSERT INTO `rolepermissions` (`id`, `role_id`, `permission_id`, `edit`, `view`, `add`, `delete`, `super_admin`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, '2024-10-28 06:28:47', '2024-10-28 06:28:47'),
(2, 1, 2, 1, 1, 1, 1, 1, '2024-10-28 06:49:05', '2024-10-28 06:49:05'),
(3, 1, 3, 1, 1, 1, 1, 1, '2024-11-03 02:03:43', '2024-11-03 02:03:43'),
(4, 2, 1, 1, 1, 1, 1, 0, '2024-11-03 02:14:04', '2024-11-03 02:14:04'),
(5, 3, 2, 1, 1, 1, 1, 0, '2024-11-03 02:14:19', '2024-11-03 02:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 1, '2024-10-28 05:51:44', '2024-10-28 05:51:44'),
(2, 'user', 1, '2024-11-03 02:14:04', '2024-11-03 02:14:04'),
(3, 'permission', 1, '2024-11-03 02:14:19', '2024-11-03 02:14:19'),
(4, 'role', 1, '2024-11-03 02:14:56', '2024-11-03 02:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('100220240839-create-permissiongroup.js'),
('100220240939-create-verifyotp.js'),
('100220241039.create-role.js'),
('100220241140-create-admin.js'),
('100220241141-create-activitylog.js'),
('100220241240-create-rolepermission.js');

-- --------------------------------------------------------

--
-- Table structure for table `verify_otps`
--

CREATE TABLE `verify_otps` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verify_otps`
--

INSERT INTO `verify_otps` (`id`, `email`, `otp`, `expired_at`, `created_at`, `updated_at`) VALUES
(1, 'sbsunilbamel743@gmail.com', 346425, '2024-11-07 06:28:15', '2024-10-28 04:48:38', '2024-11-07 06:26:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `permissiongroups`
--
ALTER TABLE `permissiongroups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `verify_otps`
--
ALTER TABLE `verify_otps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissiongroups`
--
ALTER TABLE `permissiongroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rolepermissions`
--
ALTER TABLE `rolepermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `verify_otps`
--
ALTER TABLE `verify_otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissiongroups` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
