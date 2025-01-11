<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class KhachHang extends Authenticatable
{
    use HasFactory;

    protected $table = 'khachhang';
    protected $primaryKey = 'TENDANGNHAPKH';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'TENDANGNHAPKH',
        'MATKHAUKH',
        'HOTENKH',
        'SDTKH',
        'EMAIL',
        'DIACHI',
        'ANHDAIDIENKH',
    ];

    protected $hidden = [
        'MATKHAUKH',
    ];

     /**
     * Get the DonHangs for the KhachHang.
     */
    public function donhangs()
    {
        return $this->hasMany(DonHang::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

     /**
     * Get the GioHang for the KhachHang.
     */
    public function giohang()
    {
        return $this->hasOne(GioHang::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

     /**
     * Get the DanhGia for the KhachHang.
     */
    public function danhgias()
    {
        return $this->hasMany(DanhGia::class, 'TENDANGNHAPKH', 'TENDANGNHAPKH');
    }

}