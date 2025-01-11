<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiSP extends Model
{
    use HasFactory;

    protected $table = 'loaisp';
    protected $primaryKey = 'MALOAI';
    public $timestamps = false;

    protected $fillable = [
        'TENLOAI',
        'MOTALOAI',
    ];

    /**
     * Get the SanPhams for the LoaiSP.
     */
    public function sanphams()
    {
        return $this->hasMany(SanPham::class, 'MALOAI', 'MALOAI');
    }
}