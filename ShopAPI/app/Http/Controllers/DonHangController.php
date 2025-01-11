<?php

namespace App\Http\Controllers;

use App\Models\DonHang;
use Illuminate\Http\Request;
use Carbon\Carbon; 

class DonHangController extends Controller
{
    public function index()
    {
        $donhangs = DonHang::all();
        return response()->json(data: $donhangs);
    }

    public function store(Request $request)
    {
        $dh = DonHang::create($request->all());
        return response()->json($dh, 201);
    }

    public function show($tendangnhapkh)
    {
        try {
            // Tìm tất cả đơn hàng theo TENDANGNHAPKH và nạp sẵn quan hệ chitietdhs.sanpham
            $dhs = DonHang::where('TENDANGNHAPKH', $tendangnhapkh)
                ->with(['chitietdhs.sanpham'])
                ->get();

            if ($dhs->isEmpty()) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng nào cho khách hàng này'], 404);
            }

            $data = $dhs->map(function ($dh) {
                return [
                    'MADH'          => $dh->MADH,
                    'TENDANGNHAPKH' => $dh->TENDANGNHAPKH,
                    'NGAYDAT'       => $dh->NGAYDAT,
                    'DIACHIGIAOHANG' => $dh->DIACHIGIAOHANG,
                    'TONGTIEN'      => $dh->TONGTIEN,
                    'CHITIETDH'   => $dh->chitietdhs->map(function ($chitietdh) {
                        return [
                            'MASP'      => $chitietdh->sanpham->MASP,
                            'TENSP'     => $chitietdh->sanpham->TENSP,
                            'HINHANHSP' => $chitietdh->sanpham->HINHANHSP,
                            'GIASP'     => $chitietdh->sanpham->GIASP,
                            'SOLUONGMUA'   => $chitietdh->SOLUONGMUA,
                        ];
                    }),
                ];
            });

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin đơn hàng', 'error' => $e->getMessage()], 500);
        }
    }
    public function showById($madh) // Thêm hàm showById
    {
        try {
            // Tìm đơn hàng theo MADH và nạp sẵn quan hệ chitietdhs.sanpham
            $dh = DonHang::where('MADH', $madh)
                ->with(['chitietdhs.sanpham'])
                ->first();

            if (!$dh) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
            }

            $data = [
                'MADH'          => $dh->MADH,
                'HOTENKH'       => $dh->khachhang->HOTENKH,
                'NGAYDAT'       => $dh->NGAYDAT,
                'DIACHIGIAOHANG' => $dh->DIACHIGIAOHANG,
                'TONGTIEN'      => $dh->TONGTIEN,
            ];

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin đơn hàng', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $dh = DonHang::find($id);
            if (!$dh) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
            }
    
            // Xóa các chi tiết đơn hàng liên quan
            $dh->chitietdhs()->delete();
    
            // Sau đó mới xóa đơn hàng
            $dh->delete();
    
            return response()->json(['message' => 'Xóa đơn hàng thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa đơn hàng', 'error' => $e->getMessage()], 500);
        }
    }
     
}

