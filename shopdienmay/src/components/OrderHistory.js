import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './styles/OrderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const khachhang = localStorage.getItem('khachhang');
      if (khachhang) {
        setLoading(true);
        setError('');
        try {
          const response = await api.get(`/donhang/khachhang/${khachhang}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderHistory();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <Container>
      <h2 className="mt-4">Lịch sử đặt hàng</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <Spinner animation="border" />
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.MADH}>
                <td>{new Date(order.NGAYDAT).toLocaleDateString('vi-VN')}</td>
                <td>{formatCurrency(order.TONGTIEN)}</td>
                <td>
                  <ul>
                    {order.CHITIETDH.map(item => (
                      <li key={item.MASP}>
                        {/* Chuyển hướng đến trang chi tiết đơn hàng khi click vào tên sản phẩm */}
                        <Link to={`/order/${order.MADH}/${item.MASP}`}>
                          {item.TENSP} - {formatCurrency(item.GIASP)} x {item.SOLUONGMUA}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrderHistory;