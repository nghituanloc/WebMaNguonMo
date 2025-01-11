<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class KhachHangController extends Controller
{
    public function index()
    {
        // Kiểm tra xem khách hàng đã đăng nhập chưa (nếu muốn bảo vệ)
        try {
            $khachhang = KhachHang::all();
            return response()->json($khachhang, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy danh sách khách hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Kiểm tra đăng nhập, nếu yêu cầu: có thể bỏ qua nếu đây là endpoint cho đăng ký
        // if(!session()->has('kh_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $request->validate([
                'TENDANGNHAPKH' => 'required|string|max:50|unique:khachhang',
                'MATKHAUKH' => 'required|string|min:6',
                'HOTENKH' => 'nullable|string|max:50',
                'SDTKH' => 'nullable|string|max:10',
                'EMAIL' => 'nullable|email|max:50',
                'DIACHI' => 'nullable|string|max:255',
                'ANHDAIDIENKH' => 'nullable|string|max:255',
            ]);

            $data = $request->all();
            $data['MATKHAUKH'] = Hash::make($data['MATKHAUKH']);

            // Xử lý upload ảnh đại diện
            // if ($request->hasFile('ANHDAIDIENKH')) {
            //     $path = $request->file('ANHDAIDIENKH')->store('public/khachhang_images');
            //     $data['ANHDAIDIENKH'] = basename($path);
            // }

            $kh = KhachHang::create($data);
            return response()->json($kh, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Tên đăng nhập đã tồn tại vui lòng nhập tên đăng nhập khác', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi tạo khách hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        // if(!session()->has('kh_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $kh = KhachHang::where('TENDANGNHAPKH',$id)->first();
            if (!$kh) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
            return response()->json($kh, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin khách hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // if(!session()->has('kh_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $kh = KhachHang::where('TENDANGNHAPKH',$id)->first();
            if (!$kh) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);

            $request->validate([
                'MATKHAUKH' => 'nullable|string|min:6',
                'HOTENKH' => 'nullable|string|max:50',
                'SDTKH' => 'nullable|string|max:10',
                'EMAIL' => 'nullable|email|max:50',
                'DIACHI' => 'nullable|string|max:255',
                'ANHDAIDIENKH' => 'nullable|string|max:255',
            ]);

            $data = $request->all();

            // Không cho phép cập nhật TENDANGNHAPKH
            if (isset($data['TENDANGNHAPKH'])) {
                unset($data['TENDANGNHAPKH']);
            }

            // Kiểm tra và mã hóa mật khẩu nếu tồn tại
            if (isset($data['MATKHAUKH'])) {
                $data['MATKHAUKH'] = Hash::make($data['MATKHAUKH']);
            }

            // // Xử lý upload ảnh đại diện
            // if ($request->hasFile('ANHDAIDIENKH')) {
            //     // Xóa ảnh cũ nếu có
            //     if ($kh->ANHDAIDIENKH) {
            //         Storage::delete('public/khachhang_images/' . $kh->ANHDAIDIENKH);
            //     }
            //     $path = $request->file('ANHDAIDIENKH')->store('public/khachhang_images');
            //     $data['ANHDAIDIENKH'] = basename($path);
            // }

            $kh->update($data);
            return response()->json($kh, 200);
        } 
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Lỗi validate dữ liệu', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật khách hàng', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        // if(!session()->has('kh_logged_in')) {
        //     return response()->json(['message' => 'Chưa đăng nhập'], 401);
        // }
        try {
            $kh = KhachHang::where('TENDANGNHAPKH',$id)->first();
            if (!$kh) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);

            // Xóa ảnh đại diện nếu có
            if ($kh->ANHDAIDIENKH) {
                Storage::delete('public/khachhang_images/' . $kh->ANHDAIDIENKH);
            }

            $kh->delete();
            return response()->json(['message' => 'Xóa khách hàng thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa khách hàng', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Đăng nhập khách hàng
     * Request gồm: TENDANGNHAPKH, MATKHAUKH
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'TENDANGNHAPKH' => 'required|string',
                'MATKHAUKH' => 'required|string',
            ]);

            $username = $request->input('TENDANGNHAPKH');
            $password = $request->input('MATKHAUKH');

            $kh = KhachHang::where('TENDANGNHAPKH',$username)->first();
            if (!$kh) {
                return response()->json(['message' => 'Sai tên đăng nhập hoặc mật khẩu'], 404);
            }

            if (!Hash::check($password, $kh->MATKHAUKH)) {
                return response()->json(['message' => 'Sai tên đăng nhập hoặc mật khẩu'], 401);
            }

            // Trong RESTful API, thường không sử dụng session. Thay vào đó, có thể sử dụng token (JWT)
            // Ở đây, tạm thời trả về thông tin user để client tự xử lý lưu trữ.
            return response()->json([
                'message' => 'Đăng nhập thành công',
                'TENDANGNHAPKH' => $kh->TENDANGNHAPKH,
                //'token' => 'your_generated_token' // Nếu bạn sử dụng JWT
            ], 200);
        } catch(\Illuminate\Validation\ValidationException $e){
             return response()->json(['message' => 'Tài khoản hoặc mật khẩu không được nhập đầy đủ', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Tài khoản hoặc mật khẩu chưa đúng', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Đăng xuất khách hàng
     */
    public function logout()
    {
        // Trong RESTful API, logout thường được xử lý ở phía client bằng cách xóa token.
        // Server không cần xử lý logout.
        return response()->json(['message' => 'Đăng xuất thành công (xử lý ở client)'], 200);
    }
}