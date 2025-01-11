<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietDH extends Model
{
    use HasFactory;

    protected $table = 'chitietdh';
    public $incrementing = false;
    public $timestamps = false;


    protected $fillable = [
        'MADH',
        'MASP',
        'SOLUONGMUA',
    ];

    /**
     * Get the DonHang that owns the ChiTietDH.
     */
    public function donhang()
    {
        return $this->belongsTo(DonHang::class, 'MADH', 'MADH');
    }

    /**
     * Get the SanPham that owns the ChiTietDH.
     */
    public function sanpham()
    {
        return $this->belongsTo(SanPham::class, 'MASP', 'MASP');
    }
}