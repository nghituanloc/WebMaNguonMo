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
        Schema::create('giohang', function (Blueprint $table) {
            $table->increments('MAGH');
            $table->string('TENDANGNHAPKH', 50);
            $table->integer('TAMTINH')->nullable();
        
            $table->foreign('TENDANGNHAPKH')->references('TENDANGNHAPKH')->on('khachhang')->onDelete('cascade')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('giohang');
    }
};
