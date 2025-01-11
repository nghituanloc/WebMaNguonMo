// src/components/common/PublicRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute({ isAuthenticated, redirectPath = '/' }) {
  if (isAuthenticated) {
    // Nếu đã đăng nhập, chuyển hướng đến trang chủ
    return <Navigate to={redirectPath} replace />;
  }

  // Nếu chưa đăng nhập, render children (nested routes)
  return <Outlet />;
}

export default PublicRoute;