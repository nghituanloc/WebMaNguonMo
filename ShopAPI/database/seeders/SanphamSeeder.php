<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SanphamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sanpham')->insert([
            // Cây bonsai
            [
                'MALOAI' => 1, 
                'TENSP' => 'Cây Bonsai Mai Chiếu Thủy',
                'HINHANHSP' => 'bonsai_mai_chieu_thuy.jpg',
                'MOTASP' => 'Cây mai chiếu thủy dáng bonsai đẹp mắt, mang ý nghĩa tài lộc.',
                'GIASP' => '1500000',
            ],
            [
                'MALOAI' => 1, 
                'TENSP' => 'Cây Bonsai Tùng La Hán',
                'HINHANHSP' => 'bonsai_tung_la_han.jpg',
                'MOTASP' => 'Cây tùng la hán dáng bonsai cổ thụ, mang ý nghĩa trường thọ.',
                'GIASP' => '2000000',
            ],
            [
                'MALOAI' => 1, 
                'TENSP' => 'Cây Bonsai Si Đỏ',
                'HINHANHSP' => 'bonsai_si_do.jpg',
                'MOTASP' => 'Cây si đỏ dáng bonsai độc đáo, dễ chăm sóc.',
                'GIASP' => '800000',
            ],
            [
                'MALOAI' => 1, 
                'TENSP' => 'Cây Bonsai Sanh',
                'HINHANHSP' => 'bonsai_sanh.jpg',
                'MOTASP' => 'Cây sanh dáng bonsai cổ kính, thích hợp trang trí phòng khách.',
                'GIASP' => '3000000',
            ],
            [
                'MALOAI' => 1, 
                'TENSP' => 'Cây Bonsai Kim Quýt',
                'HINHANHSP' => 'bonsai_kim_quyt.jpg',
                'MOTASP' => 'Cây kim quýt bonsai sai quả, mang ý nghĩa may mắn.',
                'GIASP' => '1200000',
            ],

            // Cây phong thủy
            [
                'MALOAI' => 2, 
                'TENSP' => 'Cây Kim Tiền',
                'HINHANHSP' => 'kim_tien.jpg',
                'MOTASP' => 'Cây kim tiền mang ý nghĩa thu hút tài lộc, may mắn.',
                'GIASP' => '500000',
            ],
            [
                'MALOAI' => 2, 
                'TENSP' => 'Cây Lưỡi Hổ',
                'HINHANHSP' => 'luoi_ho.jpg',
                'MOTASP' => 'Cây lưỡi hổ giúp thanh lọc không khí, xua đuổi tà ma.',
                'GIASP' => '300000',
            ],
            [
                'MALOAI' => 2, 
                'TENSP' => 'Cây Ngũ Gia Bì',
                'HINHANHSP' => 'ngu_gia_bi.jpg',
                'MOTASP' => 'Cây ngũ gia bì mang ý nghĩa gia đình hòa thuận, hạnh phúc.',
                'GIASP' => '700000',
            ],
            [
                'MALOAI' => 2, 
                'TENSP' => 'Cây Phát Tài',
                'HINHANHSP' => 'phat_tai.jpg',
                'MOTASP' => 'Cây phát tài mang ý nghĩa công danh thăng tiến, phát tài phát lộc.',
                'GIASP' => '400000',
            ],
            [
                'MALOAI' => 2, 
                'TENSP' => 'Cây Trầu Bà',
                'HINHANHSP' => 'trau_ba.jpg',
                'MOTASP' => 'Cây trầu bà giúp thanh lọc không khí, mang ý nghĩa bình an.',
                'GIASP' => '250000',
            ],

            // Cây hoa
            [
                'MALOAI' => 3, 
                'TENSP' => 'Hoa Hồng',
                'HINHANHSP' => 'hoa_hong.jpg',
                'MOTASP' => 'Hoa hồng đa dạng về màu sắc, tượng trưng cho tình yêu và sự lãng mạn.',
                'GIASP' => '50000',
            ],
            [
                'MALOAI' => 3, 
                'TENSP' => 'Hoa Lan Hồ Điệp',
                'HINHANHSP' => 'hoa_lan_ho_diep.jpg',
                'MOTASP' => 'Hoa lan hồ điệp sang trọng, quý phái, thích hợp làm quà tặng.',
                'GIASP' => '300000',
            ],
            [
                'MALOAI' => 3, 
                'TENSP' => 'Hoa Tulip',
                'HINHANHSP' => 'hoa_tulip.jpg',
                'MOTASP' => 'Hoa tulip mang vẻ đẹp rực rỡ, tượng trưng cho sự hoàn hảo.',
                'GIASP' => '70000',
            ],
            [
                'MALOAI' => 3, 
                'TENSP' => 'Hoa Cúc',
                'HINHANHSP' => 'hoa_cuc.jpg',
                'MOTASP' => 'Hoa cúc mang ý nghĩa trường thọ, thường được dùng trong các dịp lễ tết.',
                'GIASP' => '40000',
            ],
            [
                'MALOAI' => 3, 
                'TENSP' => 'Hoa Ly',
                'HINHANHSP' => 'hoa_ly.jpg',
                'MOTASP' => 'Hoa ly mang vẻ đẹp kiêu sa, hương thơm quyến rũ.',
                'GIASP' => '100000',
            ],

            // Cây ăn quả
            [
                'MALOAI' => 4, 
                'TENSP' => 'Cây Ổi',
                'HINHANHSP' => 'cay_oi.jpg',
                'MOTASP' => 'Cây ổi dễ trồng, cho quả ngon ngọt.',
                'GIASP' => '200000',
            ],
            [
                'MALOAI' => 4, 
                'TENSP' => 'Cây Xoài',
                'HINHANHSP' => 'cay_xoai.jpg',
                'MOTASP' => 'Cây xoài cho quả thơm ngon, giàu vitamin.',
                'GIASP' => '500000',
            ],
            [
                'MALOAI' => 4, 
                'TENSP' => 'Cây Cam',
                'HINHANHSP' => 'cay_cam.jpg',
                'MOTASP' => 'Cây cam cho quả mọng nước, giàu vitamin C.',
                'GIASP' => '300000',
            ],
            [
                'MALOAI' => 4, 
                'TENSP' => 'Cây Bưởi',
                'HINHANHSP' => 'cay_buoi.jpg',
                'MOTASP' => 'Cây bưởi cho quả to, mọng nước, có vị ngọt thanh mát.',
                'GIASP' => '400000',
            ],
            [
                'MALOAI' => 4, 
                'TENSP' => 'Cây Chanh',
                'HINHANHSP' => 'cay_chanh.jpg',
                'MOTASP' => 'Cây chanh cho quả chua, dùng để pha chế nước uống.',
                'GIASP' => '150000',
            ],

            // Cây dây leo
            [
                'MALOAI' => 5, 
                'TENSP' => 'Cây Hoa Giấy',
                'HINHANHSP' => 'hoa_giay.jpg',
                'MOTASP' => 'Cây hoa giấy leo tường, cho hoa đẹp rực rỡ.',
                'GIASP' => '100000',
            ],
            [
                'MALOAI' => 5, 
                'TENSP' => 'Cây Hoa Tigon',
                'HINHANHSP' => 'hoa_tigon.jpg',
                'MOTASP' => 'Cây hoa tigon leo giàn, cho hoa hình chuông xinh xắn.',
                'GIASP' => '150000',
            ],
            [
                'MALOAI' => 5, 
                'TENSP' => 'Cây Dây Sử Quân Tử',
                'HINHANHSP' => 'day_su_quan_tu.jpg',
                'MOTASP' => 'Cây dây sử quân tử có hương thơm dễ chịu, thường được trồng làm hàng rào.',
                'GIASP' => '200000',
            ],
            [
                'MALOAI' => 5, 
                'TENSP' => 'Cây Nho',
                'HINHANHSP' => 'cay_nho.jpg',
                'MOTASP' => 'Cây nho leo giàn, cho quả ăn được.',
                'GIASP' => '300000',
            ],
            [
                'MALOAI' => 5, 
                'TENSP' => 'Cây Hoa Hồng Leo',
                'HINHANHSP' => 'hoa_hong_leo.jpg',
                'MOTASP' => 'Cây hoa hồng leo tường, cho hoa đẹp và lãng mạn.',
                'GIASP' => '250000',
            ],

            // Thêm các sản phẩm khác ở đây...
        ]);
    }
}