-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2022 at 02:38 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `qty` double DEFAULT NULL,
  `keterangan` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_paket`, `qty`, `keterangan`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, NULL, '2022-05-19 10:08:34', '2022-05-19 12:17:28'),
(2, 1, 2, 10, NULL, '2022-05-19 11:25:03', '2022-05-19 12:17:28'),
(3, 2, 3, 10, NULL, '2022-05-19 11:26:07', '2022-05-19 12:19:30'),
(4, 2, 4, 5, NULL, '2022-05-19 11:26:49', '2022-05-19 12:19:30'),
(5, 3, 1, 11, NULL, '2022-05-19 10:08:34', '2022-05-19 12:20:23'),
(6, 3, 2, 15, NULL, '2022-05-19 11:25:03', '2022-05-19 12:20:23'),
(7, 4, 1, 2, NULL, '2022-05-19 10:08:34', '2022-05-19 23:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id_member` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` text,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `tlp` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id_member`, `nama`, `alamat`, `jenis_kelamin`, `tlp`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Lysa Fitriana', 'Malang, Jatim', 'P', '081332556743', 'img-1652954717624.jpeg', '2022-05-19 10:05:17', '2022-05-19 10:07:37'),
(2, 'Thomas Alfa', 'Malang, Jatim', 'L', '081554322455', 'img-1652954753476.jpeg', '2022-05-19 10:05:53', '2022-05-19 10:05:53'),
(3, 'Zygra Salva', 'Tulungagung, Jatim', 'L', '085334220448', 'img-1652954802027.png', '2022-05-19 10:06:42', '2022-05-19 10:06:42'),
(4, 'Farizal Euron', 'Tulungagung, Jatim', 'L', '081223445678', 'img-1652954845543.png', '2022-05-19 10:07:25', '2022-05-19 10:07:25');

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` text,
  `tlp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `nama`, `alamat`, `tlp`, `createdAt`, `updatedAt`) VALUES
(1, 'Pelangi Laundry', 'Malang, Jatim', '081332211655', '2022-05-19 10:01:03', '2022-05-19 10:01:03'),
(2, 'Superjet  Laundry', 'Tulungagung', '081456992345', '2022-05-19 10:08:08', '2022-05-19 10:08:08');

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `jenis` enum('kiloan','selimut','bed_cover','kaos','kain') DEFAULT NULL,
  `nama_paket` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id_paket`, `id_outlet`, `jenis`, `nama_paket`, `harga`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'kiloan', 'Kiloan SuperWash', 5000, 'img-1652954914938.jpg', '2022-05-19 10:08:34', '2022-05-19 10:08:34'),
(2, 1, 'selimut', 'Blanket SuperWash', 5000, 'img-1652959503458.jpg', '2022-05-19 11:25:03', '2022-05-19 11:25:03'),
(3, 2, 'kiloan', 'Kiloan Bamboo', 4000, 'img-1652959567062.jpg', '2022-05-19 11:26:07', '2022-05-19 11:26:07'),
(4, 2, 'selimut', 'Blanket Bamboo', 5000, 'img-1652959609593.jpg', '2022-05-19 11:26:49', '2022-05-19 11:26:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220412035039-create-member.js'),
('20220412035250-create-outlet.js'),
('20220412035622-create-user.js'),
('20220412035943-create-paket.js'),
('20220412040830-create-transaksi.js'),
('20220412041020-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `kode_invoice` varchar(255) DEFAULT NULL,
  `id_member` int(11) NOT NULL,
  `tgl` datetime DEFAULT NULL,
  `batas_waktu` datetime DEFAULT NULL,
  `tgl_bayar` datetime DEFAULT NULL,
  `biaya_tambahan` int(11) DEFAULT NULL,
  `diskon` double DEFAULT NULL,
  `pajak` int(11) DEFAULT NULL,
  `status` enum('baru','proses','selesai','diambil') DEFAULT NULL,
  `dibayar` enum('dibayar','belum_bayar') DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_outlet`, `kode_invoice`, `id_member`, `tgl`, `batas_waktu`, `tgl_bayar`, `biaya_tambahan`, `diskon`, `pajak`, `status`, `dibayar`, `id_user`, `total`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Cuci1652962648217', 1, '2022-05-19 00:00:00', '2022-05-22 12:17:28', '2022-05-19 00:00:00', 3000, 3000, 6000, 'diambil', 'dibayar', 1, 63000, '2022-05-19 12:17:28', '2022-05-19 12:28:47'),
(2, 2, 'Cuci1652962770275', 2, '2022-05-19 00:00:00', '2022-05-22 12:19:30', NULL, 3250, 3250, 6500, 'baru', 'belum_bayar', 2, 68250, '2022-05-19 12:19:30', '2022-05-19 12:19:30'),
(3, 1, 'Cuci1652962823123', 3, '2022-05-19 00:00:00', '2022-05-22 12:20:23', NULL, 6500, 6500, 13000, 'proses', 'belum_bayar', 1, 136500, '2022-05-19 12:20:23', '2022-05-21 00:23:51'),
(4, 1, 'Cuci1653004068312', 4, '2022-05-19 00:00:00', '2022-05-22 23:47:48', NULL, 500, 500, 1000, 'baru', 'belum_bayar', 1, 10500, '2022-05-19 23:47:48', '2022-05-19 23:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text,
  `id_outlet` int(11) NOT NULL,
  `role` enum('admin','kasir','owner') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `username`, `password`, `id_outlet`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Neilsya Amstrani', 'adminNeilsya', '1a2e4e64fe3a91c1c906267a148878bc', 1, 'admin', '2022-05-19 10:01:24', '2022-05-19 10:01:24'),
(2, 'Ultra Viany', 'adminUltra', 'feab4848aa121c700bc916d6d7e62063', 2, 'admin', '2022-05-19 11:24:36', '2022-05-19 11:24:36'),
(3, 'Lyliana Zirafina', 'kasirLyli', 'ea948c032814bd7c65376da67abc1112', 1, 'kasir', '2022-05-19 12:30:36', '2022-05-19 12:30:36'),
(4, 'Zafiera Putra', 'kasirZafi', 'a8fd83331cf8897bb37e05c80d95a581', 2, 'kasir', '2022-05-19 12:31:32', '2022-05-19 12:31:32'),
(5, 'Aminul Zytihani', 'ownerAminul', '309650dd37fbd3f6972a5eaca3b38560', 1, 'owner', '2022-05-19 12:32:51', '2022-05-19 12:32:51'),
(6, 'Zigra Thomas Dysta', 'ownerZigra', 'befddc06291c02c1e504d4bab347a830', 2, 'owner', '2022-05-19 12:33:37', '2022-05-19 12:33:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_paket` (`id_paket`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`);

--
-- Indexes for table `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `id_outlet` (`id_outlet`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_outlet` (`id_outlet`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_outlet` (`id_outlet`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`);

--
-- Constraints for table `paket`
--
ALTER TABLE `paket`
  ADD CONSTRAINT `paket_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
