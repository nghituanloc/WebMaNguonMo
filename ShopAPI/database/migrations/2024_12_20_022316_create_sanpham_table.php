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
        Schema::create('sanpham', function (Blueprint $table) {
            $table->increments('MASP');
            $table->unsignedInteger('MALOAI');
            $table->string('TENSP', 255)->nullable();
            $table->string('HINHANHSP', 255)->nullable();
            $table->longText('MOTASP')->nullable();
            $table->string('GIASP', 255)->nullable();

        
            $table->foreign('MALOAI')->references('MALOAI')->on('loaisp')->onDelete('cascade')->onUpdate('restrict');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sanpham');
    }
};
