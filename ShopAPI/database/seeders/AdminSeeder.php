<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admin')->insert([
            [
                'TENDANGNHAPADMIN' => 'admin',
                'MATKHAUADMIN' => Hash::make('666666'), // Hash mật khẩu
                'HOTENADMIN' => 'Nguyễn Văn D',

            ],
            [
                'TENDANGNHAPADMIN' => 'admin1',
                'MATKHAUADMIN' => Hash::make('666666'), // Hash mật khẩu
                'HOTENADMIN' => 'Nguyễn Văn A',

            ],
            [
                'TENDANGNHAPADMIN' => 'admin2',
                'MATKHAUADMIN' => Hash::make('666666'), // Hash mật khẩu
                'HOTENADMIN' => 'Trần Thị B',

            ],
            // Thêm dữ liệu admin khác nếu cần
        ]);
    }
}