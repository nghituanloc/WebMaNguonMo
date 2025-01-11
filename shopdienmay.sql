-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for shopdienmay
CREATE DATABASE IF NOT EXISTS `shopdienmay` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopdienmay`;

-- Dumping structure for table shopdienmay.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `TENDANGNHAPADMIN` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MATKHAUADMIN` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HOTENADMIN` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`TENDANGNHAPADMIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.admin: ~3 rows (approximately)
INSERT INTO `admin` (`TENDANGNHAPADMIN`, `MATKHAUADMIN`, `HOTENADMIN`) VALUES
	('admin', '$2y$12$eOcSJAOuHEIcBWxAHBgZh.cR3AN6bRD05YqXbeAVjsVK0eGrF7UPO', 'Nguyễn Văn D'),
	('admin1', '$2y$12$0AEDdPzBFVCOd18rtjFqmuyK5Mxcse2uLzrstWfBTeQXOyE6AvVri', 'Nguyễn Văn A'),
	('admin2', '$2y$12$2k.3memdcH0VP7wQ8U0YDe1CevPJ6.N1/cR6pm6FqGWM9ZiED1EOG', 'Trần Thị B');

-- Dumping structure for table shopdienmay.chitietdh
CREATE TABLE IF NOT EXISTS `chitietdh` (
  `MADH` int unsigned NOT NULL,
  `MASP` int unsigned NOT NULL,
  `SOLUONGMUA` int DEFAULT NULL,
  PRIMARY KEY (`MADH`,`MASP`),
  KEY `chitietdh_masp_foreign` (`MASP`),
  CONSTRAINT `chitietdh_madh_foreign` FOREIGN KEY (`MADH`) REFERENCES `donhang` (`MADH`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `chitietdh_masp_foreign` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.chitietdh: ~4 rows (approximately)
INSERT INTO `chitietdh` (`MADH`, `MASP`, `SOLUONGMUA`) VALUES
	(1, 7, 2),
	(1, 8, 5),
	(2, 5, 3),
	(2, 8, 2);

-- Dumping structure for table shopdienmay.chitietgh
CREATE TABLE IF NOT EXISTS `chitietgh` (
  `MAGH` int unsigned NOT NULL,
  `MASP` int unsigned NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  PRIMARY KEY (`MAGH`,`MASP`),
  KEY `chitietgh_masp_foreign` (`MASP`),
  CONSTRAINT `chitietgh_magh_foreign` FOREIGN KEY (`MAGH`) REFERENCES `giohang` (`MAGH`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `chitietgh_masp_foreign` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.chitietgh: ~0 rows (approximately)

-- Dumping structure for table shopdienmay.danhgia
CREATE TABLE IF NOT EXISTS `danhgia` (
  `TENDANGNHAPKH` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MASP` int unsigned NOT NULL,
  `NOIDUNGDG` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SAO` int DEFAULT NULL,
  PRIMARY KEY (`TENDANGNHAPKH`,`MASP`),
  KEY `danhgia_masp_foreign` (`MASP`),
  CONSTRAINT `danhgia_masp_foreign` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `danhgia_tendangnhapkh_foreign` FOREIGN KEY (`TENDANGNHAPKH`) REFERENCES `khachhang` (`TENDANGNHAPKH`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.danhgia: ~0 rows (approximately)
INSERT INTO `danhgia` (`TENDANGNHAPKH`, `MASP`, `NOIDUNGDG`, `SAO`) VALUES
	('nghituanloc', 7, 'Chất lượng tốt kkk!!!', 5);

-- Dumping structure for table shopdienmay.donhang
CREATE TABLE IF NOT EXISTS `donhang` (
  `MADH` int unsigned NOT NULL AUTO_INCREMENT,
  `TENDANGNHAPKH` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NGAYDAT` date DEFAULT NULL,
  `DIACHIGIAOHANG` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TONGTIEN` int DEFAULT NULL,
  PRIMARY KEY (`MADH`),
  KEY `donhang_tendangnhapkh_foreign` (`TENDANGNHAPKH`),
  CONSTRAINT `donhang_tendangnhapkh_foreign` FOREIGN KEY (`TENDANGNHAPKH`) REFERENCES `khachhang` (`TENDANGNHAPKH`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.donhang: ~0 rows (approximately)
INSERT INTO `donhang` (`MADH`, `TENDANGNHAPKH`, `NGAYDAT`, `DIACHIGIAOHANG`, `TONGTIEN`) VALUES
	(1, 'nghituanloc', '2025-01-10', 'Khóm 2, Phường 7, Thành phố Trà Vinh, tỉnh Trà Vinh', 95930000),
	(2, 'nghituanloc', '2025-01-11', 'Khóm 4, Phường 5, Thành phố Trà Vinh, tỉnh Trà Vinh', 129480000);

-- Dumping structure for table shopdienmay.giohang
CREATE TABLE IF NOT EXISTS `giohang` (
  `MAGH` int unsigned NOT NULL AUTO_INCREMENT,
  `TENDANGNHAPKH` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TAMTINH` int DEFAULT NULL,
  PRIMARY KEY (`MAGH`),
  KEY `giohang_tendangnhapkh_foreign` (`TENDANGNHAPKH`),
  CONSTRAINT `giohang_tendangnhapkh_foreign` FOREIGN KEY (`TENDANGNHAPKH`) REFERENCES `khachhang` (`TENDANGNHAPKH`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.giohang: ~0 rows (approximately)
INSERT INTO `giohang` (`MAGH`, `TENDANGNHAPKH`, `TAMTINH`) VALUES
	(1, 'nghituanloc', 0);

-- Dumping structure for table shopdienmay.khachhang
CREATE TABLE IF NOT EXISTS `khachhang` (
  `TENDANGNHAPKH` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MATKHAUKH` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HOTENKH` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SDTKH` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMAIL` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIACHI` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ANHDAIDIENKH` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`TENDANGNHAPKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.khachhang: ~0 rows (approximately)
INSERT INTO `khachhang` (`TENDANGNHAPKH`, `MATKHAUKH`, `HOTENKH`, `SDTKH`, `EMAIL`, `DIACHI`, `ANHDAIDIENKH`) VALUES
	('nghituanloc', '$2y$12$hy8j4iB6Eld2nQZHGK5iPemUuEB5kY4xA40dtFa4f521rhECxEzj6', 'Nghị Tuấn Lộc', '0909199299', 'nghituanloc@gmail.com', 'Khóm 2, Phường 7, Thành phố Trà Vinh, tỉnh Trà Vinh', 'https://i.ibb.co/09H3H65/Photoroom-20241231-073019.jpg');

-- Dumping structure for table shopdienmay.loaisp
CREATE TABLE IF NOT EXISTS `loaisp` (
  `MALOAI` int unsigned NOT NULL AUTO_INCREMENT,
  `TENLOAI` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MOTALOAI` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`MALOAI`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.loaisp: ~8 rows (approximately)
INSERT INTO `loaisp` (`MALOAI`, `TENLOAI`, `MOTALOAI`) VALUES
	(2, 'Tivi', 'Các loại tivi thông minh, tivi LED, tivi OLED, tivi QLED'),
	(3, 'Tủ lạnh', 'Các loại tủ lạnh, tủ đông, tủ mát, tủ lạnh mini'),
	(4, 'Máy giặt', 'Các loại máy giặt cửa trên, máy giặt cửa trước, máy giặt sấy'),
	(5, 'Máy điều hòa', 'Các loại máy điều hòa treo tường, điều hòa âm trần, điều hòa tủ đứng'),
	(6, 'Loa', 'Loa bluetooth, loa di động, loa soundbar, loa máy tính'),
	(7, 'Nồi cơm điện', 'Nồi cơm điện cơ, nồi cơm điện tử, nồi cơm điện cao tần'),
	(8, 'Lò vi sóng', 'Lò vi sóng cơ, lò vi sóng điện tử, lò vi sóng có nướng'),
	(9, 'Bếp', 'Bếp gas, bếp điện, bếp từ, bếp hồng ngoại'),
	(10, 'Máy xay sinh tố', 'Máy xay sinh tố cầm tay, máy xay sinh tố đa năng'),
	(11, 'Máy ép trái cây', 'Máy ép trái cây nhanh, máy ép trái cây chậm');

-- Dumping structure for table shopdienmay.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.migrations: ~0 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(2, '2024_12_20_022316_create_admin_table', 1),
	(3, '2024_12_20_022316_create_khachhang_table', 1),
	(4, '2024_12_20_022316_create_loaisp_table', 1),
	(5, '2024_12_20_022316_create_sanpham_table', 1),
	(6, '2024_12_20_022317_create_donhang_table', 1),
	(7, '2024_12_20_022318_create_giohang_table', 1),
	(8, '2024_12_20_022319_create_chitietdh_table', 1),
	(9, '2024_12_20_022319_create_chitietgh_table', 1),
	(10, '2024_12_20_022319_create_danhgia_table', 1);

-- Dumping structure for table shopdienmay.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.personal_access_tokens: ~0 rows (approximately)

-- Dumping structure for table shopdienmay.sanpham
CREATE TABLE IF NOT EXISTS `sanpham` (
  `MASP` int unsigned NOT NULL AUTO_INCREMENT,
  `MALOAI` int unsigned NOT NULL,
  `TENSP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HINHANHSP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MOTASP` longtext COLLATE utf8mb4_unicode_ci,
  `GIASP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MASP`),
  KEY `sanpham_maloai_foreign` (`MALOAI`),
  CONSTRAINT `sanpham_maloai_foreign` FOREIGN KEY (`MALOAI`) REFERENCES `loaisp` (`MALOAI`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table shopdienmay.sanpham: ~17 rows (approximately)
INSERT INTO `sanpham` (`MASP`, `MALOAI`, `TENSP`, `HINHANHSP`, `MOTASP`, `GIASP`) VALUES
	(1, 3, 'Tủ lạnh Toshiba Inverter 180 lít GR-B22VU UKG', 'https://i.ibb.co/0QHV54N/T-l-nh-Toshiba-Inverter-180-l-t-GR-B22-VU-UKG.jpg', 'Kiểu tủ:\nNgăn đá trên - 2 cánh\nDung tích sử dụng:\n180 lít - 2 - 3 người\nDung tích tổng:\nHãng không công bố\nDung tích ngăn đá:\n61 lít\nDung tích ngăn lạnh:\n119 lít\nChất liệu cửa tủ lạnh:\nUniglass\nChất liệu khay ngăn lạnh:\nKính chịu lực\nChất liệu ống dẫn gas, dàn lạnh:\nỐng dẫn gas bằng Đồng và Sắt - Lá tản nhiệt bằng Nhôm\nNăm ra mắt:\n2019\nSản xuất tại:\nThái Lan', '6000000'),
	(2, 3, 'Tủ lạnh Aqua Inverter 480 lít AQR-TA546FA(WGL)U1', 'https://i.ibb.co/6sNX2q4/T-l-nh-Aqua-Inverter-480-l-t-AQR-TA546-FA-WGL-U1.jpg', 'Dung tích 480 lít, không gian lưu trữ đa dạng phù hợp gia đình 4 - 5 thành viên.\n2 ngăn Magic Zone đáp ứng nhu cầu lưu trữ khác nhau, ngăn lẫn mùi giữa các thực phẩm.\n2 ngăn Health Zone bảo quản mỹ phẩm, vitamin,... chăm sóc sức khỏe gia đình.\nHệ thống đèn cảm biến Sensor Light sáng khi đến gần, tiện lợi trong môi trường tối.\nNgăn lấy nước ngoài tiện lợi với bình chứa nước di động, dễ vệ sinh.\nLàm đá tự động với 4 chế độ khác nhau, tiện nghi trong quá trình sử dụng.', '14999000'),
	(3, 3, 'Tủ lạnh Panasonic Inverter 405 lít NR-TX461GPKV', 'https://i.ibb.co/v1NMtZv/T-l-nh-Panasonic-Inverter-405-l-t-NR-TX461-GPKV.jpg', 'Kiểu tủ:\nNgăn đá trên - 2 cánh\nDung tích sử dụng:\n405 lít - 4 - 5 người\nDung tích tổng:\n460 lít\nDung tích ngăn đá:\n110 lít\nDung tích ngăn lạnh:\n295 lít\nChất liệu cửa tủ lạnh:\nThép đen ánh kim\nChất liệu khay ngăn lạnh:\nKính chịu lực\nChất liệu ống dẫn gas, dàn lạnh:\nỐng dẫn gas hợp kim - Lá tản nhiệt bằng nhôm\nNăm ra mắt:\n2021\nSản xuất tại:\nViệt Nam', '13950000'),
	(4, 3, 'Tủ lạnh Samsung Inverter 236 lít RT22M4032BY/SV', 'https://i.ibb.co/Mg5LWJC/T-l-nh-Samsung-Inverter-236-l-t-RT22-M4032-BY.jpg', 'Kiểu tủ:\nNgăn đá trên - 2 cánh\nDung tích sử dụng:\n236 lít - 2 - 3 người\nDung tích tổng:\n243 lít\nDung tích ngăn đá:\n53 lít\nDung tích ngăn lạnh:\n183 lít\nChất liệu cửa tủ lạnh:\nKim loại phủ sơn bóng giả gương\nChất liệu khay ngăn lạnh:\nKính chịu lực\nChất liệu ống dẫn gas, dàn lạnh:\nỐng dẫn gas bằng Nhôm - Lá tản nhiệt bằng Nhôm\nNăm ra mắt:\n2020\nSản xuất tại:\nViệt Nam', '7490000'),
	(5, 2, 'Smart Tivi Neo QLED Samsung 4K 65 inch QA65QN85D', 'https://i.ibb.co/2t4G5RT/Smart-Tivi-Neo-QLED-Samsung-4-K-65-inch-QA65-QN85-D.jpg', 'Tivi 65 inch, thiết kế sang trọng, tinh tế.\nCho hình ảnh sắc nét với độ phân giải 4K.\nBộ xử lý AI NQ4 thế hệ 2 nâng cấp hình ảnh chuẩn 4K bằng trí tuệ nhân tạo.\nCông nghệ Supreme UHD Dimming kiểm soát chi tiết độ tương phản.\nTìm kiếm bằng giọng nói với trợ lý ảo Bixby có tiếng Việt.\nCông nghệ âm thanh chuyển động theo hình ảnh OTS và hệ thống âm thanh vòm Dolby Atmos.\nSolar Cell Remote điều khiển thông minh sử dụng cho mọi thiết bị, sạc bằng ánh sáng tiện lợi.', '34900000'),
	(6, 2, 'Smart Tivi NanoCell LG 4K 65 inch 65NANO76SQA', 'https://i.ibb.co/4dMfyNB/Smart-Tivi-Nano-Cell-LG-4-K-65-inch-65-NANO76-SQA.jpg', 'Công nghệ hình ảnh\n- Độ phân giải 4K mang đến hình ảnh sắc nét gấp 4 lần Full HD.\n\n- Bộ xử lý α5 Gen5 AI 4K tự động điều chỉnh, giảm mờ, nhòe để các chi tiết hình ảnh hiển thị rõ đẹp, hút mắt. Đồng thời, với công nghệ 4K AI Upscaling mọi nội dung đầu vào đều được nâng cao độ phân giải hình ảnh lên gần chất lượng 4K, cho bạn tận hưởng khung hình tuyệt vời nhất trong từng phút giây.\n\n- Dải màu rộng Nano Color trên tivi LG NanoCell mang cả thế giới màu sắc lên khung hình, tái hiện thực tế sống động trên màn ảnh nhỏ.\n\n- Tích hợp các định dạng HDR tiên tiến (Active HDR, HDR10 Pro, HDR Dynamic Tone Mapping) và HLG mang hiệu quả tăng cường tương phản cao, cho độ sáng, màu sắc và chiều sâu của các chi tiết của khung hình tái hiện sắc sảo, có hồn hơn, cuốn hút hơn.\n\n- Chế độ game HGIG và công nghệ giảm độ trễ Auto Low Latency Mode (ALLM) mang đến màn hình chiến game mượt mà, người chơi dễ dàng nắm bắt tình thế và cơ hội làm chủ thế trận.\n\n- Thưởng thức phim theo đúng nguyên bản với chế độ FilmMaker Mode, bằng cách tắt làm mịn chuyển động, các điều chỉnh hình ảnh của Smart tivi LG để cho bạn được xem nội dung theo đúng ý tưởng nghệ thuật của nhà làm phim.', '19900000'),
	(7, 2, 'Google Tivi Sony 4K 55 inch K-55S30', 'https://i.ibb.co/Y0rG38C/Google-Tivi-Sony-4-K-55-inch-K-55-S30.jpg', 'Điều khiển tivi bằng điện thoại:\nAndroid TV\nĐiều khiển bằng giọng nói:\nGoogle Assistant có tiếng Việt\nChiếu hình từ điện thoại lên TV:\nChromecast\nAirPlay 2\nRemote thông minh:\nRemote tích hợp micro tìm kiếm giọng nói (RMF-TX820V)\nKết nối ứng dụng các thiết bị trong nhà:\nApple HomeKit\nỨng dụng phổ biến:\nYouTube\nNetflix\nGalaxy Play (Fim+)\nFPT Play\nVieON\nEco Dashboard\nTiện ích thông minh khác:\nMicro tích hợp trên TV điều khiển giọng nói rảnh tay', '16990000'),
	(8, 5, 'Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9AKH-8', 'https://i.ibb.co/Yk3DFwT/M-y-l-nh-Panasonic-Inverter-1-HP-CU.jpg', 'Tổng quan thiết kế\nDàn lạnh\n\nĐây là sản phẩm được thiết kế thanh lịch với sắc trắng trung tính dễ dàng kết hợp hài hòa với nội thất không gian. Nhìn chung máy có kiểu dáng vuông vắn với bốn góc được bo cong nhẹ tạo được tổng thể thiết bị hài hòa hơn.\n\nDàn nóng\n\n- Máy lạnh Panasonic có ống dẫn gas bằng đồng giúp quá trình truyền dẫn nhiệt nhanh đảm bảo hiệu quả làm lạnh và gia tăng độ bền cho máy. Lá tản nhiệt bằng nhôm phủ BlueFin tăng khả năng chống chịu, hạn chế tình trạng ăn mòn, độ bền cao nên có thể để ở không gian ngoài trời mà không lo đến các tác động của thời tiết.', '12390000'),
	(9, 4, 'Máy giặt LG AI DD Inverter 10 kg FV1410S4M1', 'https://i.ibb.co/ZVNFk05/M-y-gi-t-LG-AI-DD-Inverter-10-kg-FV1410-S4-M1.jpg', '- Máy giặt LG Inverter 10 kg FV1410S4M1 thuộc dòng máy giặt lồng ngang - cửa trước đẹp mắt với gam màu xám sang trọng. Vỏ máy được làm bằng kim loại sơn tĩnh điện bền bỉ, hạn chế trầy xước và luôn sáng bóng, không bị xỉn màu.\n\n- Bảng điều khiển cảm ứng song ngữ Anh - Việt và nút xoay hỗ trợ bạn dễ dàng thao tác, không gây khó khăn cho người lớn tuổi. Ngoài ra, máy giặt LG cũng được trang bị màn hình led hiển thị trực quan, rõ ràng các thông số như thời gian, các chế độ giặt,...\n\n- Phần cửa trước của máy giặt LG Inverter này mang chất liệu kính chịu lực trong suốt, người dùng có thể dễ dàng quan sát cách mà chu trình giặt diễn ra.\n\n- Lồng giặt bằng thép không gỉ hạn chế ăn mòn, chống oxy hóa, có độ bền cao.', '9800000'),
	(10, 5, 'Máy lạnh Casper hai chiều Inverter 1 HP GH-09IS33', 'https://i.ibb.co/R4PqPLw/M-y-l-nh-Casper-hai-chi-u-Inverter-1-HP-GH-09-IS33.jpg', 'Máy lạnh hai chiều vừa sưởi vừa làm lạnh đáp ứng đa dạng nhu cầu.\nCông suất 1 HP – 9.800 BTU phù hợp với diện tích dưới 15 m2.\nCông nghệ I-saving Inverter giúp máy vận hành êm, tiết kiệm điện.\nLàm lạnh nhanh không gian với chế độ Turbo.\nChức năng tự làm sạch hạn chế nấm mốc phát triển, tăng tuổi thọ máy.\nCảm biến nhiệt iFeel tự động vận hành dựa trên nhiệt độ phòng.', '9350000'),
	(11, 4, 'Máy giặt Toshiba 7 Kg AW-L805AV (SG)', 'https://i.ibb.co/7S2qHv0/M-y-gi-t-Toshiba-7-Kg-AW-L805-AV-SG.jpg', 'Loại máy giặt:\nCửa trên\nLồng giặt:\nLồng đứng\nKhối lượng giặt:\n7 Kg\nSố người sử dụng:\nTừ 2 - 3 người\nKiểu động cơ:\nTruyền động gián tiếp (dây Curoa)\nTốc độ quay vắt tối đa:\n700 vòng/phút\nChất liệu lồng giặt:\nThép không gỉ\nChất liệu vỏ máy:\nKim loại sơn tĩnh điện\nChất liệu nắp máy:\nKính chịu lực\nSản xuất tại:\nThái Lan\nNăm ra mắt:\n2021\nThời gian bảo hành động cơ:\n2 năm', '4550000'),
	(12, 6, 'Loa karaoke Sumico SU802', 'https://i.ibb.co/ypmGmxW/Loa-karaoke-Sumico-SU802.jpg', 'Thiết kế nhỏ gọn linh hoạt, sống động.\nDòng loa karaoke di động được thiết kế với 14 hiệu ứng đèn LED tính thẩm mỹ cao.\nTổng công suất 100W mang âm thanh mạnh mẽ, đáp ứng mọi nhu cầu âm nhạc và karaoke một cách hiệu quả.\nTích hợp 02 micro không dây chất lượng cao.\nTùy chỉnh Echo, Delay thêm hiệu ứng ngân vang giúp hát karaoke thật hay và dễ dàng. \nTăng/giảm âm Bass, Treble cho giọng hát và tiếng nhạc riêng biệt.\nNghe nhạc, hát karaoke,... Sử dụng cho các buổi tiệc, picnic, hội thảo và giảng dạy.\nChơi nhạc qua kết nối Bluetooth, AUX, USB, thẻ nhớ,...', '3200000'),
	(13, 6, 'Loa kéo karaoke Nanomax S-900 420W', 'https://i.ibb.co/LkJWrhW/Loa-k-o-karaoke-Nanomax-S-900-420-W.jpg', 'Loại sản phẩm:\nLoa kéo\nSố đường tiếng của loa:\n2 đường tiếng (tiếng Bass và tiếng Treble)\nTổng công suất:\n420W\nNguồn:\nCắm điện hoặc pin\nThời gian sử dụng:\nDùng khoảng 4 - 8 tiếng\nThời gian sạc:\nSạc khoảng 4 tiếng\nPhím điều khiển:\nNút bấm và nút vặn cơ học\nTiện ích:\n2 micro kèm theo\nBánh xe dễ di chuyển\nTính năng Mic Priority ưu tiên giọng nói\nCó cổng USB\nCó tay kéo', '4980000'),
	(14, 3, 'Tủ đông Sanaky 305 lít VH-4099A1', 'https://i.ibb.co/99KMWLP/T-ng-Sanaky-305-l-t-VH-4099-A1.jpg', 'Dung tích tổng:\n400 lít\nDung tích sử dụng:\n305 lít - Ngăn đông 305 lít\nSố cửa:\n2 cửa\nSố ngăn:\n1 ngăn đông\nCông suất danh định:\n136W\nĐiện năng tiêu thụ:\n398/507.35 kWh/năm\nNhiệt độ ngăn đông (độ C):\nDưới -18℃\nCông nghệ tích hợp:\nLàm lạnh trực tiếp (có đóng tuyết)\nChất liệu dàn lạnh:\nĐồng\nChất liệu lòng tủ:\nHợp kim nhôm sơn tĩnh điện\nChất liệu bên ngoài:\nThân tủ: Thép sơn tĩnh điện, Cửa tủ: Nhựa\nChất liệu kính:\nKhông có kính\nTiện ích:\nNút điều chỉnh nhiệt độ bên ngoài tủ\nKhoá cửa tủ\nGiỏ đựng đồ\nLỗ thoát nước\nBánh xe\nKích thước, khối lượng:\nCao 84.5 cm - Ngang 132.9 cm - Sâu 62 cm - Nặng 51 kg\nLoại Gas:\nR600a\nĐộ ồn:\n< 50 dB\nThương hiệu của:\nViệt Nam\nSản xuất tại:\nViệt Nam\nNăm ra mắt:\n2018', '8140000'),
	(15, 4, 'Máy sấy thông hơi Electrolux UltimateCare 8 kg EDV804H3WC', 'https://i.ibb.co/jDRHXM4/M-y-s-y-th-ng-h-i-Electrolux-Ultimate-Care-8-kg-EDV804-H3-WC.jpg', 'Công nghệ sấy thông hơi giúp sấy khô nhanh chóng và tiết kiệm thời gian.\nCông nghệ sấy đảo chiều Reverse Tumbling hạn chế nếp nhăn, giảm xoắn rối quần áo.\nChương trình sấy diệt khuẩn Hygiene bảo vệ làn da và sức khỏe của gia đình bạn.\nTùy chỉnh thời gian, mức độ sấy và nhiệt độ sấy phù hợp với từng loại vải, theo nhu cầu sử dụng.\nKhối lượng sấy 8 kg, thích hợp với các gia đình từ 3 - 5 thành viên.', '9750000'),
	(16, 7, 'Nồi cơm nắp gài Philips 1.8 lít HD3008/30', 'https://i.ibb.co/znT3kZR/N-i-c-m-n-p-g-i-Philips-1-8-l-t-HD3008.jpg', 'Loại nồi:\nNồi cơm nắp gài\nDung tích:\n1.8 lít, Số người ăn 4 - 6 người\nCông suất:\n650 - 775W\nThương hiệu của:\nHà Lan\nNơi sản xuất:\nIndonesia\nNăm ra mắt:\n2024', '800000'),
	(17, 7, 'Nồi cơm cao tần Toshiba 1.8 lít RC-18IX1PV', 'https://i.ibb.co/CQhCZ3C/N-i-c-m-cao-t-n-Toshiba-1-8-l-t-RC-18-IX1-PV.jpg', 'Loại nồi:\nNồi cơm điện cao tần\nDung tích:\n1.8 lít, Số người ăn 4 - 6 người\nCông suất:\n1300W\nThương hiệu của:\nNhật Bản\nNơi sản xuất:\nTrung Quốc\nNăm ra mắt:\n2020', '3390000');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
