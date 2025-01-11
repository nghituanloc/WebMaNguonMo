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
        Schema::create('chitietgh', function (Blueprint $table) {
            $table->unsignedInteger('MAGH');
            $table->unsignedInteger('MASP');
            $table->integer('SOLUONG')->nullable();
        
            $table->primary(['MAGH', 'MASP']);
            $table->foreign('MAGH')->references('MAGH')->on('giohang')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('MASP')->references('MASP')->on('sanpham')->onDelete('cascade')->onUpdate('restrict');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chitietgh');
    }
};
