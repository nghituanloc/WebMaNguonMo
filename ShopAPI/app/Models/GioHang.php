<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

    protected $table = 'giohang';
    protected $primaryKey = 'MAGH';
    public $timestamps = false;

    protected $fillable = [
        'TENDANGNHAPKH',
        'TAMTINH',
    ];

    /**
     * Get the KhachHang that owns the GioHang.
     */
    public function khachhang()
    {
        return $this->belongsTo(KhachHang::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

    /**
     * Get the ChiTietGHs for the GioHang.
     */
    public function chitietghs()
    {
        return $this->hasMany(ChiTietGH::class, 'MAGH', 'MAGH');
    }
}