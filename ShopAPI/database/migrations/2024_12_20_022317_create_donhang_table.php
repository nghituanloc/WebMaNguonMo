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
        Schema::create('donhang', function (Blueprint $table) {
            $table->increments('MADH');
            $table->string('TENDANGNHAPKH', 50);
            $table->date('NGAYDAT')->nullable();
            $table->string('DIACHIGIAOHANG', 255)->nullable();
            $table->integer('TONGTIEN')->nullable();
        
            $table->foreign('TENDANGNHAPKH')->references('TENDANGNHAPKH')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donhang');
    }
};
