<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('danhgia', function (Blueprint $table) {
            $table->string('TENDANGNHAPKH', 50);
            $table->unsignedInteger('MASP');
            $table->string('NOIDUNGDG', 255)->nullable();
            $table->integer('SAO')->nullable();
        
            $table->primary(['TENDANGNHAPKH', 'MASP']);
            $table->foreign('TENDANGNHAPKH')->references('TENDANGNHAPKH')->on('khachhang')->onDelete('cascade')->onUpdate('restrict');
            $table->foreign('MASP')->references('MASP')->on('sanpham')->onDelete('cascade')->onUpdate('restrict');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('danhgia');
    }
};
