<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    use HasFactory;

    protected $table = 'danhgia';
    public $incrementing = false;
    public $timestamps = false;


    protected $fillable = [
        'TENDANGNHAPKH',
        'MASP',
        'NOIDUNGDG',
        'SAO',
    ];

    /**
     * Get the KhachHang that owns the DanhGia.
     */
    public function khachhang()
    {
        return $this->belongsTo(KhachHang::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

    /**
     * Get the SanPham that owns the DanhGia.
     */
    public function sanpham()
    {
        return $this->belongsTo(SanPham::class, 'MASP', 'MASP');
    }
}