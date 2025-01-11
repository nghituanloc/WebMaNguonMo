import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './styles/CustomerInfo.css';

function CustomerInfo() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const khachhang = localStorage.getItem('khachhang');
      if (khachhang) {
        setLoading(true);
        setError('');
        try {
          const response = await api.get(`/khachhang/${khachhang}`);
          setCustomer(response.data);
        } catch (error) {
          console.error('Error fetching customer info:', error);
          setError('Failed to fetch customer info. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login'); // Chuyển hướng đến trang login nếu chưa đăng nhập
      }
    };

    fetchCustomerInfo();
  }, [navigate]);

  const handleEdit = () => {
    navigate('/edit-customer'); // Chuyển hướng đến trang chỉnh sửa thông tin
  };

  if (loading) {
    return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;
  }

  if (error) {
    return <Container className="mt-4"><p className="text-danger">{error}</p></Container>;
  }

  if (!customer) {
    return <Container className="mt-4"><p>Customer information not found.</p></Container>;
  }

  return (
    <Container className="customer-info-container mt-4">
      <h2 className="customer-info-title">Thông tin khách hàng</h2>
      <div className="customer-info-wrapper">
          <img
            src={customer.ANHDAIDIENKH}
            alt="Avatar"
            className="customer-info-avatar"
          />
        <div className="customer-info-details-section">
          <p className="customer-info-detail">
            <strong>Họ tên:</strong> {customer.HOTENKH}
          </p>
          <p className="customer-info-detail">
            <strong>Số điện thoại:</strong> {customer.SDTKH}
          </p>
          <p className="customer-info-detail">
            <strong>Email:</strong> {customer.EMAIL}
          </p>
          <p className="customer-info-detail">
            <strong>Địa chỉ:</strong> {customer.DIACHI}
          </p>
          <Button
            variant="primary"
            onClick={handleEdit}
            className="customer-info-edit-btn"
          >
            Chỉnh sửa thông tin
          </Button>
        </div>
      </div>
    </Container>
  );
  
}

export default CustomerInfo;