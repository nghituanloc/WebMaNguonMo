import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import "../../styles/LoaiSanPhamForm.css"; 


function LoaiSanPhamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenLoai, setTenLoai] = useState('');
  const [mota, setMoTa] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchLoaiSanPham = async () => {
        setError('');
        try {
          const response = await api.get(`/loaisp/${id}`);
          setTenLoai(response.data.TENLOAI);
        } catch (error) {
          console.error('Error fetching product type:', error);
          setError('Failed to fetch product type. Please try again.');
        }
      };

      fetchLoaiSanPham();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (id) {
        await api.put(`/loaisp/${id}`, { TENLOAI: tenLoai ,MOTALOAI :mota});
      } else {
        await api.post('/loaisp/create', { TENLOAI: tenLoai ,MOTALOAI :mota});
      }
      navigate('/admin/loaisanpham');
    } catch (error) {
      console.error('Error saving product type:', error);
      setError('Failed to save product type. Please try again.');
    }
  };

  return (
    <Container>
      <h2>{id ? 'Chỉnh sửa' : 'Tạo'} loại</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên loại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên loại"
            value={tenLoai}
            onChange={(e) => setTenLoai(e.target.value)}
          />
          <Form.Label>Mô tả loại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mô tả loại"
            value={mota}
            onChange={(e) => setMoTa(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Lưu
        </Button>
      </Form>
    </Container>
  );
}

export default LoaiSanPhamForm;