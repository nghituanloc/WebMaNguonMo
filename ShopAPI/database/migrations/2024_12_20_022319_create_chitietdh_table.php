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
        Schema::create('chitietdh', function (Blueprint $table) {
            $table->unsignedInteger('MADH');
            $table->unsignedInteger('MASP');
            $table->integer('SOLUONGMUA')->nullable();
        
            $table->primary(['MADH', 'MASP']);
            $table->foreign('MADH')->references('MADH')->on('donhang')->onDelete('cascade')->onUpdate('restrict');
            $table->foreign('MASP')->references('MASP')->on('sanpham')->onDelete('cascade')->onUpdate('restrict');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chitietdh');
    }
};
