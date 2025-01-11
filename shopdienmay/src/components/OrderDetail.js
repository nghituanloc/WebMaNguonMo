// src/components/OrderDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Spinner } from 'react-bootstrap';
import api from '../services/api';
import './styles/OrderDetail.css';

function OrderDetail() {
  const { madh, masp } = useParams(); // Lấy MADH và MASP từ URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/chitietdh/${madh}/${masp}`);
        setOrderDetail(response.data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
        setError('Failed to fetch order detail. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [madh, masp]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!orderDetail) {
    return <p>Order detail not found.</p>;
  }

  return (
    <Container>
      <h2 className="mt-4">Chi tiết đơn hàng</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Ngày đặt hàng</td>
            <td>{new Date(orderDetail.NGAYDAT).toLocaleDateString('vi-VN')}</td>
          </tr>
          <tr>
            <td>Sản phẩm</td>
            <td>{orderDetail.TENSP}</td>
          </tr>
          <tr>
            <td>Hình ảnh</td>
            <td>
              {/* Thay đổi đường dẫn ảnh */}
              <img src={`${orderDetail.HINHANHSP}`} alt={orderDetail.TENSP} style={{ width: '100px' }} />
            </td>
          </tr>
          <tr>
            <td>Giá</td>
            <td>{formatCurrency(orderDetail.GIASP)}</td>
          </tr>
          <tr>
            <td>Số lượng</td>
            <td>{orderDetail.SOLUONGMUA}</td>
          </tr>
          <tr>
            <td>Địa chỉ giao hàng</td>
            <td>{orderDetail.DIACHIGIAOHANG}</td>
          </tr>

        </tbody>
      </Table>
    </Container>
  );
}

export default OrderDetail;