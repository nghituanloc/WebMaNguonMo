// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, isAdmin, allowedRoles, redirectPath = '/', children }) {
  // Kiểm tra xem user có được phép truy cập route dựa trên role
  const isAllowed = allowedRoles.includes('all') || (isAdmin && allowedRoles.includes('admin')) || (!isAdmin && allowedRoles.includes('user'));

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed) {
    // Nếu không được phép truy cập, chuyển hướng đến trang mặc định
    return <Navigate to={redirectPath} replace />;
  }

  // Nếu đã đăng nhập và được phép truy cập, render children (nested routes)
  return children ? children : <Outlet />;
}

export default ProtectedRoute;