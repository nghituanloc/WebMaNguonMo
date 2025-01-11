<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChitietdhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chitietdh')->insert([
            [
                'MADH' => 1, // Đơn hàng của khachhang1
                'MASP' => 1, // Máy chơi game PlayStation 5 Standard Edition
                'SOLUONGMUA' => 1,

            ],
            [
                'MADH' => 1, // Đơn hàng của khachhang1
                'MASP' => 6, // Tay cầm DualSense cho PlayStation 5
                'SOLUONGMUA' => 1,

            ],
            [
                'MADH' => 2, // Đơn hàng của khachhang2
                'MASP' => 4, // Máy chơi game PlayStation 4 Pro 1TB
                'SOLUONGMUA' => 1,

            ],
            [
                'MADH' => 3, // Đơn hàng của khachhang1
                'MASP' => 5, // Kính thực tế ảo PlayStation VR
                'SOLUONGMUA' => 1,

            ],
            // Thêm dữ liệu chi tiết đơn hàng khác nếu cần
        ]);

        // Cập nhật TONGTIEN cho bảng donhang sau khi đã thêm chi tiết đơn hàng
        $this->updateTongTienDonHang();
    }

    /**
     * Cập nhật tổng tiền cho các đơn hàng dựa trên chi tiết đơn hàng.
     */
    private function updateTongTienDonHang()
    {
        $donHangs = DB::table('donhang')->get();

        foreach ($donHangs as $donHang) {
            $tongTien = DB::table('chitietdh')
                ->join('sanpham', 'chitietdh.MASP', '=', 'sanpham.MASP')
                ->where('chitietdh.MADH', $donHang->MADH)
                ->sum(DB::raw('chitietdh.SOLUONGMUA * sanpham.GIASP'));

            DB::table('donhang')
                ->where('MADH', $donHang->MADH)
                ->update(['TONGTIEN' => $tongTien]);
        }
    }
}