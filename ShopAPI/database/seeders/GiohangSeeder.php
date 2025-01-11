<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GiohangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('giohang')->insert([
            [
                 // Tương tự, bạn có thể bỏ qua hoặc set giá trị cho MAGH (auto-increment)
                'TENDANGNHAPKH' => 'khachhang1',
                'TAMTINH' => 0, // Giỏ hàng ban đầu thường là 0
            ],
            [
                
                'TENDANGNHAPKH' => 'khachhang2',
                'TAMTINH' => 0, // Giỏ hàng ban đầu thường là 0
            ],
            // Thêm dữ liệu giỏ hàng khác nếu cần, nhưng thường là không cần thiết
        ]);
    }
}