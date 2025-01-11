<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class KhachhangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('khachhang')->insert([
            [
                'TENDANGNHAPKH' => 'khachhang1',
                'MATKHAUKH' => Hash::make('123456'),
                'HOTENKH' => 'Nguyễn Văn Khách',
                'SDTKH' => '0987654321',
                'EMAIL' => 'khachhang1@example.com',
                'DIACHI' => '123 Đường ABC, Quận XYZ, TP HCM',
                'ANHDAIDIENKH' => 'khachhang1.jpg', // Giả định tên file ảnh

            ],
            [
                'TENDANGNHAPKH' => 'khachhang2',
                'MATKHAUKH' => Hash::make('666666'),
                'HOTENKH' => 'Trần Thị Khách Hàng',
                'SDTKH' => '0123456789',
                'EMAIL' => 'khachhang2@gmail.com',
                'DIACHI' => '456 Đường DEF, Quận MNO, Hà Nội',
                'ANHDAIDIENKH' => null// Có thể để null nếu không có ảnh

            ],
            // Thêm dữ liệu khách hàng khác nếu cần
        ]);
    }
}