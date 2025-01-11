<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaispSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('loaisp')->insert([
            [
                'TENLOAI' => 'Cây bonsai',
                'MOTALOAI' => 'Cây cảnh nghệ thuật được trồng trong chậu, có kích thước nhỏ gọn và hình dáng độc đáo.',
            ],
            [
                'TENLOAI' => 'Cây phong thủy',
                'MOTALOAI' => 'Cây cảnh mang ý nghĩa may mắn, tài lộc, thường được dùng để trang trí nhà cửa, văn phòng.',
            ],
            [
                'TENLOAI' => 'Cây hoa',
                'MOTALOAI' => 'Cây cảnh cho hoa đẹp, đa dạng về màu sắc và chủng loại.',
            ],
            [
                'TENLOAI' => 'Cây ăn quả',
                'MOTALOAI' => 'Cây cảnh cho quả ăn được, vừa có giá trị thẩm mỹ vừa cung cấp thực phẩm.',
            ],
            [
                'TENLOAI' => 'Cây dây leo',
                'MOTALOAI' => 'Cây cảnh có thân leo, thường được trồng để trang trí tường, hàng rào.',
            ],
        ]);
    }
}