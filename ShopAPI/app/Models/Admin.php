<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admin';
    protected $primaryKey = 'TENDANGNHAPADMIN';
    public $incrementing = false; // Tắt auto-increment
    protected $keyType = 'string'; // Kiểu dữ liệu của khóa chính
    public $timestamps = false;

    protected $fillable = [
        'TENDANGNHAPADMIN',
        'MATKHAUADMIN',
        'HOTENADMIN',
    ];

    protected $hidden = [
        'MATKHAUADMIN',
    ];
}