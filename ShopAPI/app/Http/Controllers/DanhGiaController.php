<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use Illuminate\Http\Request;

class DanhGiaController extends Controller
{
    // Lấy tất cả đánh giá
    public function index()
    {
        $danhgias = DanhGia::all();
        return response()->json($danhgias);
    }

    public function show($masp)
    {
        // Lấy tất cả đánh giá có MASP kèm thông tin HOTENKH từ bảng KHACHHANG
        $danhgia = DanhGia::select(
                'DANHGIA.*',
                'KHACHHANG.HOTENKH'
            )
            ->join('KHACHHANG', 'DANHGIA.TENDANGNHAPKH', '=', 'KHACHHANG.TENDANGNHAPKH')
            ->where('DANHGIA.MASP', $masp)
            ->get();
    
        // Kiểm tra nếu có dữ liệu
        if ($danhgia->isNotEmpty()) {
            return response()->json($danhgia, 200);
        }
    
        // Trường hợp không có dữ liệu
        return response()->json(['message' => 'Không có đánh giá nào cho sản phẩm này'], 404);
    }
    
    
    // Thêm một đánh giá mới
    public function store(Request $request)
    {
        // Validate dữ liệu đầu vào
        $data = $request->validate([
            'TENDANGNHAPKH' => 'required|string|max:50',
            'MASP' => 'required|integer',
            'NOIDUNGDG' => 'nullable|string|max:255',
            'SAO' => 'nullable|integer|min:1|max:5'
        ]);
    
        // Kiểm tra nếu TENDANGNHAPKH và MASP đã tồn tại
        $exists = DanhGia::where('TENDANGNHAPKH', $data['TENDANGNHAPKH'])
                         ->where('MASP', $data['MASP'])
                         ->exists();
    
        if ($exists) {
            return response()->json([
                'message' => 'Đánh giá sản phẩm này đã tồn tại.'
            ], 409); // HTTP status 409: Conflict
        }
    
        // Tạo đánh giá mới
        DanhGia::create($data);
    
        return response()->json(['message' => 'Đánh giá đã được tạo thành công'], 201);
    }
    

    // Cập nhật đánh giá
    public function update(Request $request, $tendangnhapkh, $masp)
    {
        $danhgia = DanhGia::where([
            'TENDANGNHAPKH' => $tendangnhapkh,
            'MASP' => $masp
        ])->first();

        if ($danhgia) {
            $data = $request->only(['NOIDUNGDG', 'SAO']);
            $danhgia->update($data);
            return response()->json(['message' => 'Đánh giá đã được cập nhật thành công']);
        }
        return response()->json(['message' => 'Đánh giá không tồn tại'], 404);
    }

    // Xóa đánh giá
    public function destroy($makh, $tendangnhapkh, $masp)
    {
        $deleted = DanhGia::where([
            'MAKH' => $makh,
            'TENDANGNHAPKH' => $tendangnhapkh,
            'MASP' => $masp
        ])->delete();

        if ($deleted) {
            return response()->json(['message' => 'Đánh giá đã được xóa thành công']);
        }
        return response()->json(['message' => 'Đánh giá không tồn tại'], 404);
    }
}
