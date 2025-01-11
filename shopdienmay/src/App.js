import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import LoginAdmin from './components/auth/LoginAdmin';
import LoginKhachHang from './components/auth/LoginKhachHang';
import RegisterKhachHang from './components/auth/RegisterKhachHang';
import ShoppingCart from './components/ShoppingCart';
import OrderHistory from './components/OrderHistory';
import Dashboard from './components/Admin/Dashboard';
import KhachHangList from './components/Admin/KhachHangList';
import DonHangList from './components/Admin/DonHangList';
import LoaiSanPhamList from './components/Admin/LoaiSanPham/LoaiSanPhamList';
import LoaiSanPhamForm from './components/Admin/LoaiSanPham/LoaiSanPhamForm';
import SanPhamList from './components/Admin/SanPham/SanPhamList';
import SanPhamForm from './components/Admin/SanPham/SanPhamForm';
import BieuDoSanPhamBanChay from './components/Admin/BieuDoSanPhamBanChay';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import HistoryTracker from './components/common/HistoryTracker';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import useAuth
import OrderDetail from './components/OrderDetail';
import CustomerInfo from './components/CustomerInfo';
import EditCustomer from './components/EditCustomer';




import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Sử dụng useAuth để truy cập context
  const { isAuthenticated, isAdmin } = useAuth();
  

  return (
    <AuthProvider>
      <Router>
        <HistoryTracker />
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Public Routes - Chuyển hướng nếu đã đăng nhập */}
            <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/login" element={<LoginKhachHang />} />
              <Route path="/register" element={<RegisterKhachHang />} />
            </Route>

            {/* Protected Routes - User */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} allowedRoles={['user', 'all']} />}>
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/order/:madh/:masp" element={<OrderDetail />} /> 
              <Route path="/customer-info" element={<CustomerInfo />} /> 
          <Route path="/edit-customer" element={<EditCustomer />} /> 
       

            </Route>

            {/* Protected Routes - Admin */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/khachhang" element={<KhachHangList />} />
              <Route path="/admin/donhang" element={<DonHangList />} />
              <Route path="/admin/loaisanpham" element={<LoaiSanPhamList />} />
              <Route path="/admin/loaisanpham/create" element={<LoaiSanPhamForm />} />
              <Route path="/admin/loaisanpham/edit/:id" element={<LoaiSanPhamForm />} />
              <Route path="/admin/sanpham" element={<SanPhamList />} />
              <Route path="/admin/sanpham/create" element={<SanPhamForm />} />
              <Route path="/admin/sanpham/edit/:id" element={<SanPhamForm />} />
              <Route path="/admin/BieuDoSanPhamBanChay" element={<BieuDoSanPhamBanChay />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;