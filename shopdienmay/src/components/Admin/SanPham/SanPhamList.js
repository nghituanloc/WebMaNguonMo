import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import api from "../../../services/api";
import "../../styles/SanPhamList.css"; 

function SanPhamList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/sanpham");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (MASP) => {
    if (window.confirm("Xóa sản phẩm này?")) {
      try {
        await api.delete(`/sanpham/${MASP}`);
        setProducts(products.filter((product) => product.MASP !== MASP));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <Container className="product-table-container">
      <h2 className="product-table-header">Danh sách sản phẩm</h2>
      <Link to="/admin/sanpham/create" className="btn btn-primary mb-3 create-button">
        Thêm sản phẩm mới
      </Link>
      <Table striped bordered hover className="product-table">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Mã</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.MASP}>
              <td>{index + 1}</td>
              <td>{product.MASP}</td>
              <td>{product.TENSP}</td>
              <td>{product.GIASP.toLocaleString('vi-VN')} đồng</td>
              <td>{product.MOTASP}</td>
              <td>
                <img 
                  src={product.HINHANHSP} 
                  alt={product.TENSP} 
                  width="100" 
                  height="100"
                  className="product-image" 
                />
              </td>
              <td>
                <div className="action-buttons">
                  <Link
                    to={`/admin/sanpham/edit/${product.MASP}`}
                    className="btn btn-warning btn-sm edit-button"
                  >
                    Sửa
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    className="delete-button"
                    onClick={() => handleDelete(product.MASP)}
                  >
                    Xóa
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SanPhamList;
