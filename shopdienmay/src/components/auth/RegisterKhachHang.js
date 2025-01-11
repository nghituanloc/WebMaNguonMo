import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import '../styles/RegisterKhachHang.css';

function RegisterKhachHang() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password || !fullname ) {
      setError("Vui lòng nhập đầy đủ các trường.");
      return;
    }

    try {
      await api.post("/khachhang/create", {
        TENDANGNHAPKH: username,
        MATKHAUKH: password,
        HOTENKH: fullname,
      });

      await api.post("/giohang/create", {
        TENDANGNHAPKH: username,
        TAMTINH: 0,
      });

      setSuccess("Tạo tài khoản thành công. Đang chuyển hướng đến trang đăng nhập...");
      setUsername("");
      setPassword("");
      setFullname("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Tên đăng nhập đã tồn tại.");
      } else {
        setError(err.response?.data?.message || "Đã xảy ra lỗi trong quá trình đăng ký.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Đăng kí tài khoản</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            placeholder="VD: nguyenvana"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={5}
            maxLength={50}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            maxLength={50}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Họ và tên</label>
          <input
            id="fullname"
            type="text"
            placeholder="Nhập tên đầy đủ của bạn"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="register-button">
          Đăng kí
        </button>
        
        <div className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterKhachHang;
