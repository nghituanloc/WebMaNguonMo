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
        Schema::create('loaisp', function (Blueprint $table) {
            $table->increments('MALOAI');
            $table->string('TENLOAI', 255)->nullable();
            $table->longText('MOTALOAI')->nullable();
        });
  
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loaisp');
    }
};
