import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HistoryTracker() {
  const location = useLocation();

  useEffect(() => {
    // Chỉ theo dõi các đường dẫn không phải là trang đăng nhập
    if (location.pathname !== '/login' && location.pathname !== '/login-admin' && location.pathname !== '/register') {
        window.history.pushState(null, null, location.pathname + location.search);
      }
      
  }, [location]);

  return null;
}

export default HistoryTracker;