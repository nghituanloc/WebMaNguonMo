<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChitietghSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chitietgh')->insert([
            [
                'MAGH' => 1, // Giỏ hàng của khachhang1
                'MASP' => 3, // Máy chơi game PlayStation 4 Slim 1TB
                'SOLUONG' => 2,

            ],
            [
                'MAGH' => 1, // Giỏ hàng của khachhang1
                'MASP' => 5, // Kính thực tế ảo PlayStation VR
                'SOLUONG' => 1,

            ],
            [
                'MAGH' => 2, // Giỏ hàng của khachhang2
                'MASP' => 1, // Máy chơi game PlayStation 5 Standard Edition
                'SOLUONG' => 1,

            ],
            // Thêm dữ liệu chi tiết giỏ hàng khác nếu cần
        ]);

        // Cập nhật TAMTINH cho bảng giohang sau khi đã thêm chi tiết giỏ hàng
        $this->updateTamTinhGioHang();
    }

    /**
     * Cập nhật tạm tính cho các giỏ hàng dựa trên chi tiết giỏ hàng.
     */
    private function updateTamTinhGioHang()
    {
        $gioHangs = DB::table('giohang')->get();

        foreach ($gioHangs as $gioHang) {
            $tamTinh = DB::table('chitietgh')
                ->join('sanpham', 'chitietgh.MASP', '=', 'sanpham.MASP')
                ->where('chitietgh.MAGH', $gioHang->MAGH)
                ->sum(DB::raw('chitietgh.SOLUONG * sanpham.GIASP'));

            DB::table('giohang')
                ->where('MAGH', $gioHang->MAGH)
                ->update(['TAMTINH' => $tamTinh]);
        }
    }
}