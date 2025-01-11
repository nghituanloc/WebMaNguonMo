import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import api from '../../services/api';
import '../styles/KhachHangList.css';


function KhachHangList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/khachhang');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);


  return (
    <Container className="khachhang-list-container">
      <h2 className="khachhang-list-title">Danh sách khách hàng</h2>
      <Table striped bordered hover className="khachhang-list-table">
        <thead className="khachhang-list-thead">
          <tr>
            <th>Stt</th>
            <th>Tên đăng nhập</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Ảnh</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.TENDANGNHAPKH} className="khachhang-list-row">
              <td>{index + 1}</td>
              <td>{customer.TENDANGNHAPKH}</td>
              <td>{customer.HOTENKH}</td>
              <td>{customer.SDTKH}</td>
              <td>{customer.EMAIL}</td>
              <td>{customer.DIACHI}</td>
              <td>
                <img
                  src={customer.ANHDAIDIENKH}
                  alt={customer.HOTENKH}
                  className="khachhang-list-avatar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default KhachHangList;