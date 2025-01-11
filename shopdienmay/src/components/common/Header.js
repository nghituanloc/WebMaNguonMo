import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const admin = localStorage.getItem('admin');
  //     const khachhang = localStorage.getItem('khachhang');

  //     if (admin) {
  //       setIsAuthenticated(true);
  //       setIsAdmin(true);
  //       setUser(admin);
  //     } else if (khachhang) {
  //       setIsAuthenticated(true);
  //       setIsAdmin(false);
  //       setUser(khachhang);
  //     } else {
  //       setIsAuthenticated(false);
  //       setIsAdmin(false);
  //       setUser(null);
  //     }
  //   };

  //   checkAuth();
  // }, []); // Không cần thiết useEffect này nữa vì đã xử lý ở AuthContext

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        await api.post("/admin/logout");
      } else {
        await api.post("/khachhang/logout");
      }
      logout(); // Gọi logout từ useAuth để cập nhật context
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 5);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <Navbar bg="light" expand="lg" className="header-navbar">
  <Navbar.Brand as={Link} to="/" className="header-brand">
CỬA HÀNG ĐIỆN MÁY THÁI LỘC
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="header-toggle" />
  <Navbar.Collapse id="basic-navbar-nav" className="header-collapse">
    <Nav className="header-nav mr-auto">
      {isAuthenticated && !isAdmin && (
        <>
          <Nav.Link as={Link} to="/customer-info" className="header-nav-link">
            Thông tin cá nhân
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="header-nav-link">
            Giỏ hàng
          </Nav.Link>
          <Nav.Link as={Link} to="/order-history" className="header-nav-link">
            Lịch sử mua
          </Nav.Link>
        </>
      )}
      {isAuthenticated && isAdmin && (
        <>
          <Nav.Link as={Link} to="/admin/khachhang" className="header-nav-link">
            Khách hàng
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/donhang" className="header-nav-link">
            Đơn đặt hàng
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/loaisanpham" className="header-nav-link">
            Loại sản phẩm
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/sanpham" className="header-nav-link">
            Sản phẩm
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/BieuDoSanPhamBanChay" className="header-nav-link">
          Báo cáo
          </Nav.Link>
        </>
      )}
    </Nav>
    <div className="header-search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Bạn muốn tìm gì ?"
        className="header-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="header-search-btn" onClick={handleSearch}>
        Tìm
      </button>
    </div>
    <Nav className="header-auth-nav">
      {!isAuthenticated && (
        <>
          <Nav.Link as={Link} to="/login-admin" className="header-nav-link">
            Admin
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="header-nav-link">
            Đăng nhập
          </Nav.Link>
        </>
      )}
      {isAuthenticated && (
        <Nav.Link
          title={user}
          id="user-nav-dropdown"
          onClick={handleLogout}
          className="header-logout-link"
        >
          Đăng xuất
        </Nav.Link>
      )}
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
}

export default Header;
