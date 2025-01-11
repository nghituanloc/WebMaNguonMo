<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonHang extends Model
{
    use HasFactory;

    protected $table = 'donhang';
    protected $primaryKey = 'MADH';
    public $timestamps = false;

    protected $fillable = [
        'TENDANGNHAPKH',
        'NGAYDAT',
        'DIACHIGIAOHANG',
        'TONGTIEN',
    ];
    protected $casts = [
        'NGAYDAT' => 'datetime:Y-m-d',
    ];

    /**
     * Get the KhachHang that owns the DonHang.
     */
    public function khachhang()
    {
        return $this->belongsTo(KhachHang::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

    /**
     * Get the ChiTietDHs for the DonHang.
     */
    public function chitietdhs()
    {
        return $this->hasMany(ChiTietDH::class, 'MADH', 'MADH');
    }
}