import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import '../styles/LoginKhachHang.css';

function LoginKhachHang() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/khachhang/login", {
        TENDANGNHAPKH: username,
        MATKHAUKH: password,
      });

      login(username, "user");
      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 5);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Đăng nhập khách hàng</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
        
        <a href="/register" className="login-register-link">
          Chưa có tài khoản? Đăng ký ngay
        </a>
      </form>
    </div>
  );
}

export default LoginKhachHang;
