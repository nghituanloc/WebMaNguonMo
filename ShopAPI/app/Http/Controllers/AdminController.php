<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Kiểm tra xem admin đã đăng nhập chưa (nếu cần)
        // if(!session()->has('admin_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $admins = Admin::all();
            return response()->json($admins, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy danh sách admin', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Kiểm tra đăng nhập trước khi cho tạo mới (tùy chính sách)
        // if(!session()->has('admin_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $request->validate([
                'TENDANGNHAPADMIN' => 'required|string|max:50|unique:admin',
                'MATKHAUADMIN' => 'required|string|min:6',
                'HOTENADMIN' => 'nullable|string|max:50',
            ]);

            $data = $request->all();
            $data['MATKHAUADMIN'] = Hash::make($data['MATKHAUADMIN']);

            $admin = Admin::create($data);
            return response()->json($admin, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi tạo admin', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // if(!session()->has('admin_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $admin = Admin::where('TENDANGNHAPADMIN',$id)->first();
            if (!$admin) return response()->json(['message' => 'Không tìm thấy admin'], 404);
            return response()->json($admin, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin admin', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Bỏ qua kiểm tra session để test Postman
        // if (!session()->has('admin_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            // Tìm admin theo ID
            $admin = Admin::where('TENDANGNHAPADMIN',$id)->first();
            if (!$admin) {
                return response()->json(['message' => 'Không tìm thấy admin'], 404);
            }

            // Validate dữ liệu đầu vào
            $request->validate([
                'MATKHAUADMIN' => 'nullable|string|min:6',
                'HOTENADMIN' => 'nullable|string|max:50',
            ]);

            // Chỉ lấy các trường MATKHAUADMIN và HOTENADMIN
            $data = $request->only(['MATKHAUADMIN', 'HOTENADMIN']);

            // Kiểm tra và mã hóa mật khẩu nếu tồn tại
            if (isset($data['MATKHAUADMIN'])) {
                $data['MATKHAUADMIN'] = Hash::make($data['MATKHAUADMIN']);
            }

            // Cập nhật thông tin admin
            $admin->update($data);

            // Trả về thông tin admin đã cập nhật
            return response()->json($admin, 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật admin', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // if(!session()->has('admin_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $admin = Admin::where('TENDANGNHAPADMIN',$id)->first();
            if (!$admin) return response()->json(['message' => 'Không tìm thấy admin'], 404);

            $admin->delete();
            return response()->json(['message' => 'Xóa admin thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa admin', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Đăng nhập: kiểm tra username và password.
     * Nếu thành công, tạo session.
     */
    public function login(Request $request)
    {
        try {
            $username = $request->input('TENDANGNHAPADMIN');
            $password = $request->input('MATKHAUADMIN');

            $admin = Admin::where('TENDANGNHAPADMIN',$username)->first();
            if (!$admin) {
                return response()->json(['message' => 'Sai tên đăng nhập hoặc mật khẩu'], 404);
            }

            if (!Hash::check($password, $admin->MATKHAUADMIN)) {
                return response()->json(['message' => 'Sai tên đăng nhập hoặc mật khẩu'], 401);
            }

            // Tạo session lưu thông tin đăng nhập
            session(['admin_logged_in' => $admin->TENDANGNHAPADMIN]);

            return response()->json([
                'message' => 'Đăng nhập thành công',
                'TENDANGNHAPADMIN' => $admin->TENDANGNHAPADMIN
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi đăng nhập', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Đăng xuất: Xóa session
     */
    public function logout()
    {
        try {
            session()->forget('admin_logged_in');
            return response()->json(['message' => 'Đã đăng xuất'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi đăng xuất', 'error' => $e->getMessage()], 500);
        }
    }
}