<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DonhangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('donhang')->insert([
            [
                 // Tương tự, bạn có thể bỏ qua hoặc set giá trị cho MADH (auto-increment)
                'TENDANGNHAPKH' => 'khachhang1',
                'NGAYDAT' => '2023-10-26',
                'DIACHIGIAOHANG' => '123 Đường ABC, Quận XYZ, TP HCM',
                'TONGTIEN' => 17000000,
            ],
            [
                
                'TENDANGNHAPKH' => 'khachhang2',
                'NGAYDAT' => '2023-10-27',
                'DIACHIGIAOHANG' => '456 Đường DEF, Quận MNO, Hà Nội',
                'TONGTIEN' => 9000000,
            ],
            [
                
                'TENDANGNHAPKH' => 'khachhang1',
                'NGAYDAT' => '2023-11-15',
                'DIACHIGIAOHANG' => '123 Đường ABC, Quận XYZ, TP HCM',
                'TONGTIEN' => 6000000,
            ],
            // Thêm dữ liệu đơn hàng khác nếu cần
        ]);
    }
}