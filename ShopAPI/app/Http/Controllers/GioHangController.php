<?php

namespace App\Http\Controllers;

use App\Models\GioHang;
use App\Models\ChiTietGH;
use Illuminate\Http\Request;

class GioHangController extends Controller
{
    public function index()
    {
        try {
            $giohangs = GioHang::with('khachhang')->get();
            return response()->json($giohangs, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy danh sách giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Kiểm tra nếu TENDANGNHAPKH đã tồn tại
            $exists = GioHang::where('TENDANGNHAPKH', $request->TENDANGNHAPKH)->exists();

            if ($exists) {
                return response()->json(['message' => 'Giỏ hàng đã tồn tại cho tài khoản này'], 409); // HTTP 409: Conflict
            }

            // Tạo mới nếu chưa tồn tại
            $data = $request->validate([
                'TENDANGNHAPKH' => 'required|string|max:50|exists:khachhang,TENDANGNHAPKH',
                'TAMTINH' => 'nullable|numeric'
            ]);

            $gh = GioHang::create($data);
            return response()->json($gh, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi tạo giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($tendangnhapkh)
    {
        try {
            // Tìm giỏ hàng theo TENDANGNHAPKH và nạp sẵn quan hệ chitietghs.sanpham
            $gh = GioHang::where('TENDANGNHAPKH', $tendangnhapkh)
                ->with(['chitietghs.sanpham'])
                ->first();

            if (!$gh) {
                return response()->json(['message' => 'Giỏ hàng không tồn tại'], 404);
            }
             $data = [
                'MAGH'          => $gh->MAGH,
                'TENDANGNHAPKH' => $gh->TENDANGNHAPKH,
                'TAMTINH'       => $gh->TAMTINH,
                'SANPHAM'      => $gh->chitietghs->map(function ($chitietgh) {
                    return [
                        'MASP'      => $chitietgh->sanpham->MASP,
                        'TENSP'     => $chitietgh->sanpham->TENSP,
                        'HINHANHSP' => $chitietgh->sanpham->HINHANHSP,
                        'GIASP'     => $chitietgh->sanpham->GIASP,
                        'SOLUONG'   => $chitietgh->SOLUONG,
                    ];
                }),
            ];

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $tendangnhapkh)
    {
        try {
            // Tìm giỏ hàng theo TENDANGNHAPKH
            $gh = GioHang::where('TENDANGNHAPKH', $tendangnhapkh)->first();

            if (!$gh) {
                return response()->json(['message' => 'Giỏ hàng không tồn tại'], 404);
            }

            // Cập nhật dữ liệu
            $data = $request->validate([
                'TAMTINH' => 'nullable|numeric'
            ]);

            $gh->update($data);

            return response()->json(['message' => 'Cập nhật thành công', 'data' => $gh], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($tendangnhapkh)
    {
        try {
            $gh = GioHang::where('TENDANGNHAPKH', $tendangnhapkh)->first();

            if (!$gh) {
                return response()->json(['message' => 'Giỏ hàng không tồn tại'], 404);
            }

            // Xóa tất cả chi tiết giỏ hàng trước
            ChiTietGH::where('MAGH', $gh->MAGH)->delete();

            $gh->delete();

            return response()->json(['message' => 'Xóa thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }
}