import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import '../styles/LoginAdmin.css';

function LoginAdmin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    try {
      const response = await api.post("/admin/login", {
        TENDANGNHAPADMIN: username,
        MATKHAUADMIN: password,
      });
  
      login(username, "admin");
      navigate("/admin");
  
      setTimeout(() => {
        window.location.reload();
      }, 5);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-admin-container">
      <h2 className="login-admin-title">Đăng nhập quản trị</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="login-admin-form">
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
