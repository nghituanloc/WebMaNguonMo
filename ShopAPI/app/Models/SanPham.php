<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    use HasFactory;

    protected $table = 'sanpham';
    protected $primaryKey = 'MASP';
    public $timestamps = false;

    protected $fillable = [
        'MALOAI',
        'TENSP',
        'HINHANHSP',
        'MOTASP',
        'GIASP',
    ];

    /**
     * Get the LoaiSP that owns the SanPham.
     */
    public function loaisp()
    {
        return $this->belongsTo(LoaiSP::class, 'MALOAI', 'MALOAI');
    }

    /**
     * Get the ChiTietDHs for the SanPham.
     */
    public function chitietdhs()
    {
        return $this->hasMany(ChiTietDH::class, 'MASP', 'MASP');
    }

    /**
     * Get the ChiTietGHs for the SanPham.
     */
    public function chitietghs()
    {
        return $this->hasMany(ChiTietGH::class, 'MASP', 'MASP');
    }

    /**
     * Get the DanhGias for the SanPham.
     */
    public function danhgias()
    {
        return $this->hasMany(DanhGia::class, 'MASP', 'MASP');
    }

}