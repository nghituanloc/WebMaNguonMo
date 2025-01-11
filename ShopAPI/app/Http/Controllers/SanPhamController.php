<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use App\Models\DanhGia;
use Illuminate\Http\Request;

class SanPhamController extends Controller
{
    public function index()
    {
        $sanphams = SanPham::all();
        return response()->json($sanphams);
    }

    public function store(Request $request)
    {
        $sp = SanPham::create($request->all());
        return response()->json($sp, 201);
    }

    public function show($id)
    {
        $sp = SanPham::find($id);

        if (!$sp) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm'], 404);
        }

        // Lấy các đánh giá của sản phẩm cùng với thông tin khách hàng
        $danhGias = DanhGia::with('khachhang') 
            ->where('MASP', $id)
            ->get();

        // Chuẩn bị dữ liệu trả về
        $responseData = [
            'sanpham' => $sp,
            'danhgia' => $danhGias->map(function ($danhGia) {
                return [
                    'NOIDUNGDG' => $danhGia->NOIDUNGDG,
                    'SAO' => $danhGia->SAO,
                    'TENDANGNHAPKH' => $danhGia->TENDANGNHAPKH,
                    'HOTENKH' => $danhGia->khachhang->HOTENKH ?? null, // Lấy tên khách hàng từ quan hệ
                    
                ];
            }),
        ];

        return response()->json($responseData);
    }


    public function update(Request $request, $id)
    {
        $sp = SanPham::find($id);
        if(!$sp) return response()->json(['message' => 'Not found'], 404);

        $sp->update($request->all());
        return response()->json($sp);
    }

    public function destroy($id)
    {
        $sp = SanPham::find($id);
        if(!$sp) return response()->json(['message' => 'Not found'], 404);

        $sp->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    public function updateSanPhamLoai($id)
{
    try {
        SanPham::where('MALOAI', $id)->update(['MALOAI' => null]);
        return response()->json(['message' => 'Cập nhật sản phẩm thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Lỗi khi cập nhật sản phẩm', 'error' => $e->getMessage()], 500);
    }
}
}
