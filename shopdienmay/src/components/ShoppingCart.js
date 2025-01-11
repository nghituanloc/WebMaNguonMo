import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Form } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './styles/ShoppingCart.css';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [diachi, setDiaChi] = useState(''); // State cho địa chỉ giao hàng
  const [customerInfo, setCustomerInfo] = useState(null); // State để lưu thông tin khách hàng

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const khachhang = localStorage.getItem('khachhang');
      if (khachhang) {
        try {
          // Lấy thông tin khách hàng
          const customerResponse = await api.get(`/khachhang/${khachhang}`);
          setCustomerInfo(customerResponse.data);
          setDiaChi(customerResponse.data.DIACHI); // Set địa chỉ mặc định từ thông tin khách hàng

          const response = await api.get(`/giohang/${khachhang}`);
          if (response.data && response.data.SANPHAM) {
            setCartItems(response.data.SANPHAM);
            calculateTotal(response.data.SANPHAM);
          } else {
            setCartItems([]);
            setTotal(0);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setCartItems([]);
          setTotal(0);
        }
      } else {
        setCartItems([]);
        setTotal(0);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.GIASP * item.SOLUONG, 0);
    setTotal(newTotal);
  };

  const handleQuantityChange = async (masp, newQuantity) => {
    if (newQuantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    const khachhang = localStorage.getItem('khachhang');
    if (!khachhang) {
      alert('Please login to update the cart.');
      return;
    }

    try {
      const giohangResponse = await api.get(`/giohang/${khachhang}`);
      const MAGH = giohangResponse.data.MAGH;

      await api.put(`/chitietgh/${MAGH}/${masp}`, { SOLUONG: newQuantity });

      setCartItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.MASP === masp ? { ...item, SOLUONG: newQuantity } : item
        );
        calculateTotal(updatedItems);
        return updatedItems;
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Error updating cart.');
    }
  };

  const handleRemoveItem = async (masp) => {
    const khachhang = localStorage.getItem('khachhang');
    if (!khachhang) {
      alert('Please login to remove items from the cart.');
      return;
    }

    try {
      const giohangResponse = await api.get(`/giohang/${khachhang}`);
      const MAGH = giohangResponse.data.MAGH;

      await api.delete(`/chitietgh/${MAGH}/${masp}`);

      setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.MASP !== masp);
        calculateTotal(updatedItems);
        return updatedItems;
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart.');
    }
  };

  const handleCheckout = async () => {
    const khachhang = localStorage.getItem('khachhang');
    if (!khachhang) {
      alert('Please login to proceed with checkout.');
      return;
    }

    // Lấy địa chỉ giao hàng từ state, sử dụng địa chỉ mặc định nếu không có
    const diachiGiaoHang = diachi;

    try {
      const giohangResponse = await api.get(`/giohang/${khachhang}`);
      const cart = giohangResponse.data;

      const donhangResponse = await api.post('/donhang/create', {
        TENDANGNHAPKH: khachhang,
        NGAYDAT: new Date().toISOString().slice(0, 10),
        DIACHIGIAOHANG: diachiGiaoHang, // Sử dụng địa chỉ giao hàng
        TONGTIEN: cart.TAMTINH,
      });

      const MADH = donhangResponse.data.MADH;

      // Tạo chi tiết đơn hàng từ các sản phẩm trong giỏ hàng
      for (const item of cart.SANPHAM) {
        await api.post('/chitietdh/create', {
          MADH: MADH,
          MASP: item.MASP,
          SOLUONGMUA: item.SOLUONG,
        });
      }

      // Xóa các sản phẩm trong giỏ hàng sau khi đã tạo đơn hàng
      for (const item of cart.SANPHAM) {
        await api.delete(`/chitietgh/${cart.MAGH}/${item.MASP}`);
      }
      alert('Cảm ơn bạn đã mua sản phẩm!');
      navigate('/order-history'); // Chuyển hướng đến trang lịch sử đơn hàng
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error during checkout.');
    }
  };

  return (
    <Container className="shopping-cart-container">
      <h2 className="shopping-cart-title mt-4">Giỏ hàng</h2>
      {loading ? (
        <Spinner animation="border" className="shopping-cart-spinner" />
      ) : cartItems.length === 0 ? (
        <p className="shopping-cart-empty">Giỏ hàng bạn đang trống</p>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover className="shopping-cart-table">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.MASP} className="shopping-cart-item-row">
                    <td>{index + 1}</td>
                    <td>{item.TENSP}</td>
                    <td>{formatCurrency(item.GIASP)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.SOLUONG}
                        onChange={(e) =>
                          handleQuantityChange(item.MASP, parseInt(e.target.value, 10))
                        }
                        className="form-control shopping-cart-quantity-input"
                      />
                    </td>
                    <td>{formatCurrency(item.GIASP * item.SOLUONG)}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.MASP)}
                        className="shopping-cart-remove-btn"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="shopping-cart-total d-flex justify-content-end">
              <h4>Tổng tiền: {formatCurrency(total)}</h4>
            </div>
            <Form.Group className="shopping-cart-address-group">
              <Form.Label>Địa chỉ giao hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ giao hàng"
                value={diachi}
                onChange={(e) => setDiaChi(e.target.value)}
                className="shopping-cart-address-input"
              />
            </Form.Group>
            <div className="shopping-cart-checkout d-flex justify-content-end mt-3">
              <Button variant="success" onClick={handleCheckout} className="shopping-cart-checkout-btn">
                Mua
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
  
}

export default ShoppingCart;