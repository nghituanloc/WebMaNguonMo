import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import api from '../../../services/api';

function LoaiSanPhamList() {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductTypes = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/loaisp');
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
        setError('Failed to fetch product types. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  const handleDelete = async (MALOAI) => {
    if (window.confirm('Xóa phân loại này?')) {
      setError('');
      try {
        // Cập nhật MALOAI trong bảng sanpham thành 0 trước khi xóa
        // await api.put(`/loai/${MALOAI}/lsp`);

        // Sau đó xóa loại sản phẩm
        await api.delete(`/loaisp/${MALOAI}`);

        setProductTypes(productTypes.filter(type => type.MALOAI !== MALOAI));
      } catch (error) {
        console.error('Error deleting product type:', error);
        setError('Lỗi xóa loại sản phẩm');
      }
    }
  };


  return (
    <Container>
      <h2>Danh sách loại phân loại</h2>
      {error && <p className="text-danger">{error}</p>}
      <Link to="/admin/loaisanpham/create" className="btn btn-primary mb-3">
        Tạo phân loại mới
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Mã phân loại</th>
            <th>Tên phân loại</th>
            <th>Mô tả phân loại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Đang tải...</td>
            </tr>
          ) : productTypes.length > 0 ? (
            productTypes.map((type, index) => (
              <tr key={type.MALOAI}>
                <td>{index + 1}</td>
                <td>{type.MALOAI}</td>
                <td>{type.TENLOAI}</td>
                <td>{type.MOTALOAI}</td>

                <td>
                  <Link to={`/admin/loaisanpham/edit/${type.MALOAI}`} className="btn btn-warning btn-sm mr-2">
                    Edit
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(type.MALOAI)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Không có loại sản phẩm để hiện thị.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default LoaiSanPhamList;