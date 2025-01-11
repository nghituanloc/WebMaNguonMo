<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietGH extends Model
{
    use HasFactory;

    protected $table = 'chitietgh';
    public $incrementing = false;
    public $timestamps = false;
    // Trong model ChiTietGH
    protected $primaryKey = ['MAGH', 'MASP'];

    protected $fillable = [
        'MAGH',
        'MASP',
        'SOLUONG',
    ];

    /**
     * Get the GioHang that owns the ChiTietGH.
     */
    public function giohang()
    {
        return $this->belongsTo(GioHang::class, 'MAGH', 'MAGH');
    }

    /**
     * Get the SanPham that owns the ChiTietGH.
     */
    public function sanpham()
    {
        return $this->belongsTo(SanPham::class, 'MASP', 'MASP');
    }
}
