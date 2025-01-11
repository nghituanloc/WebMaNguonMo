<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            KhachhangSeeder::class,
            LoaispSeeder::class,
            SanphamSeeder::class,
            DonhangSeeder::class,
            GiohangSeeder::class,
            ChitietdhSeeder::class,
            ChitietghSeeder::class,
            DanhgiaSeeder::class,
        ]);
    }
}