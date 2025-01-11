<?php

namespace App\Http\Controllers;

use App\Models\ChiTietGH;
use App\Models\GioHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChiTietGHController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $chiTietGHs = ChiTietGH::with(['giohang', 'sanpham'])->get();
            return response()->json($chiTietGHs, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy danh sách chi tiết giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'MAGH' => 'required|integer|exists:giohang,MAGH',
                'MASP' => 'required|integer|exists:sanpham,MASP',
                'SOLUONG' => 'required|integer|min:1',
            ]);

            // Kiểm tra xem chi tiết giỏ hàng đã tồn tại hay chưa
            $existingChiTietGH = ChiTietGH::where('MAGH', $data['MAGH'])
                ->where('MASP', $data['MASP'])
                ->first();

            if ($existingChiTietGH) {
                // Nếu đã tồn tại, tăng số lượng
                $existingChiTietGH->SOLUONG += $data['SOLUONG'];
                $existingChiTietGH->save();

                // Cập nhật tổng tiền của giỏ hàng
                $this->updateGioHangTamTinh($data['MAGH']);

                return response()->json($existingChiTietGH, 200);
            } else {
                // Nếu chưa tồn tại, tạo mới
                $chiTietGH = ChiTietGH::create($data);

                // Cập nhật tổng tiền của giỏ hàng
                $this->updateGioHangTamTinh($data['MAGH']);

                return response()->json($chiTietGH, 201);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm chi tiết giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($magh, $masp)
    {
        try {
            $chiTietGH = ChiTietGH::where('MAGH', $magh)
                ->where('MASP', $masp)
                ->with(['giohang', 'sanpham'])
                ->first();

            if (!$chiTietGH) {
                return response()->json(['message' => 'Không tìm thấy chi tiết giỏ hàng'], 404);
            }

            return response()->json($chiTietGH, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin chi tiết giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $magh, $masp)
    {
        try {
            $data = $request->validate([
                'SOLUONG' => 'required|integer|min:1',
            ]);

            $chiTietGH = ChiTietGH::where('MAGH', $magh)
                ->where('MASP', $masp)
                ->first();

            if (!$chiTietGH) {
                return response()->json(['message' => 'Không tìm thấy chi tiết giỏ hàng'], 404);
            }

            // Sử dụng update() với điều kiện where chính xác cho khóa chính composite
            ChiTietGH::where('MAGH', $magh)->where('MASP', $masp)->update(['SOLUONG' => $data['SOLUONG']]);

            // Cập nhật tổng tiền của giỏ hàng
            $this->updateGioHangTamTinh($magh);

            // Lấy lại thông tin chi tiết giỏ hàng sau khi update để trả về
            $updatedChiTietGH = ChiTietGH::where('MAGH', $magh)->where('MASP', $masp)->first();

            return response()->json(['message' => 'Cập nhật thành công', 'data' => $updatedChiTietGH], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật chi tiết giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($magh, $masp)
    {
        try {
            $chiTietGH = ChiTietGH::where('MAGH', $magh)
                                   ->where('MASP', $masp)
                                   ->first();
    
            if (!$chiTietGH) {
                return response()->json(['message' => 'Không tìm thấy chi tiết giỏ hàng'], 404);
            }
    
            // Thay thế dòng này:
            // $chiTietGH->delete();
            // Bằng dòng sau:
            ChiTietGH::where('MAGH', $magh)->where('MASP', $masp)->delete();
    
            // Cập nhật tổng tiền của giỏ hàng
            $this->updateGioHangTamTinh($magh);
    
            return response()->json(['message' => 'Xóa thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa chi tiết giỏ hàng', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Update the TONGTIEN of GioHang.
     */
    private function updateGioHangTamTinh($magh)
    {
        try {
            $gioHang = GioHang::findOrFail($magh);
            $tongTien = 0;

            $chiTietGHs = $gioHang->chitietghs;

            foreach ($chiTietGHs as $chiTietGH) {
                $tongTien += $chiTietGH->SOLUONG * $chiTietGH->sanpham->GIASP;
            }

            $gioHang->TAMTINH = $tongTien;
            $gioHang->save();
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật tổng tiền giỏ hàng: ' . $e->getMessage());
        }
    }
}
