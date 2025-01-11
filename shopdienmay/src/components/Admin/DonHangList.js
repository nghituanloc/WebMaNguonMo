import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import api from '../../services/api';
import '../styles/DonHangList.css';


function DonHangList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/donhang');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Container className="donhang-list-container">
      <h2 className="donhang-list-title">Danh sách đơn hàng</h2>
      <Table striped bordered hover className="donhang-list-table">
        <thead className="donhang-list-thead">
          <tr>
            <th>Stt</th>
            <th>Mã đơn hàng</th>
            <th>Tên đăng nhập khách hàng</th>
            <th>Địa chỉ giao</th>
            <th>Ngày Đặt</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.MADH} className="donhang-list-row">
              <td>{index + 1}</td>
              <td>{order.MADH}</td>
              <td>{order.TENDANGNHAPKH}</td>
              <td>{order.DIACHIGIAOHANG}</td>
              <td>{new Date(order.NGAYDAT).toLocaleDateString()}</td>
              <td>{formatCurrency(order.TONGTIEN)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default DonHangList;