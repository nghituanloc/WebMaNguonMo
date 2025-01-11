<?php

namespace App\Http\Controllers;

use App\Models\LoaiSP;
use Illuminate\Http\Request;

class LoaiSPController extends Controller
{
    public function index()
    {
        $loaisp = LoaiSP::all();
        return response()->json($loaisp);
    }

    public function store(Request $request)
    {
        $loai = LoaiSP::create($request->all());
        return response()->json($loai, 201);
    }

    public function show($id)
    {
        $loai = LoaiSP::find($id);
        if(!$loai) return response()->json(['message' => 'Not found'], 404);
        return response()->json($loai);
    }

    public function update(Request $request, $id)
    {
        $loai = LoaiSP::find($id);
        if(!$loai) return response()->json(['message' => 'Not found'], 404);

        $loai->update($request->all());
        return response()->json($loai);
    }

    public function destroy($id)
    {
        $loai = LoaiSP::find($id);
        if (!$loai) {
            return response()->json(['message' => 'Not found'], 404);
        }
    
        // Xóa các sản phẩm liên quan
        $loai->sanphams()->delete();
    
        // Sau đó xóa loại sản phẩm
        $loai->delete();
    
        return response()->json(['message' => 'Xoa thành công']);
    }
    
}
