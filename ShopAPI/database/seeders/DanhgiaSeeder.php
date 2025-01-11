<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('danhgia')->insert([
            [
                'TENDANGNHAPKH' => 'khachhang1',
                'MASP' => 1, // Máy chơi game PlayStation 5 Standard Edition
                'NOIDUNGDG' => 'Sản phẩm tuyệt vời, chơi game rất mượt mà!',
                'SAO' => 5,

            ],
            [
                'TENDANGNHAPKH' => 'khachhang2',
                'MASP' => 1, // Máy chơi game PlayStation 5 Standard Edition
                'NOIDUNGDG' => 'Giá hơi cao nhưng chất lượng xứng đáng.',
                'SAO' => 4,

            ],
            [
                'TENDANGNHAPKH' => 'khachhang1',
                'MASP' => 4, // Máy chơi game PlayStation 4 Pro 1TB
                'NOIDUNGDG' => 'Máy chơi game tốt, đồ họa đẹp.',
                'SAO' => 4,

            ],
            [
                'TENDANGNHAPKH' => 'khachhang2',
                'MASP' => 5, // Kính thực tế ảo PlayStation VR
                'NOIDUNGDG' => 'Trải nghiệm VR rất thú vị!',
                'SAO' => 5,

            ],
            // Thêm dữ liệu đánh giá khác nếu cần
        ]);
    }
}