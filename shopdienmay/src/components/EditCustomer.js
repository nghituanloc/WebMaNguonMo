import React, { useState, useEffect } from 'react';
import { Form, Button, Container, FormText, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './styles/EditCustomer.css';
function EditCustomer() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [customer, setCustomer] = useState(null); // State để lưu thông tin khách hàng
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    useEffect(() => {
    const fetchCustomerInfo = async () => {
        const khachhang = localStorage.getItem('khachhang');
        if (khachhang) {
            try {
                const response = await api.get(`/khachhang/${khachhang}`);
                setCustomer(response.data);
                // Khởi tạo giá trị ban đầu cho các trường
                setFullname(response.data.HOTENKH || '');
                setPhone(response.data.SDTKH || '');
                setEmail(response.data.EMAIL || '');
                setAddress(response.data.DIACHI || '');
                setLink(response.data.ANHDAIDIENKH || '');
            } catch (error) {
                console.error('Error fetching customer info:', error);
                setError('Failed to fetch customer info. Please try again.');
            } finally {
                setIsInitialDataLoaded(true);
            }
        } else {
            navigate('/login'); // Chuyển hướng đến trang login nếu chưa đăng nhập
        }
    };

    fetchCustomerInfo();
}, [navigate]);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    setError('');

    try {
      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=0240012f6494107e4d133ab285363ffb`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!imgbbResponse.ok) {
        throw new Error('Upload ảnh thất bại. Vui lòng thử lại.');
      }

      const imgbbData = await imgbbResponse.json();

      if (imgbbData.data && imgbbData.data.url) {
        setLink(imgbbData.data.url);
      } else {
        setError('Upload ảnh thất bại.');
      }
    } catch (err) {
      setError('Lỗi khi upload ảnh: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Kiểm tra và thông báo lỗi nếu các trường bắt buộc trống
    if (!fullname || !phone || !email || !address) {
        setError("Vui lòng nhập đầy đủ các trường.");
        return;
    }

    // Kiểm tra định dạng số điện thoại
    if (!/^\d{10}$/.test(phone)) {
        setError("Số điện thoại không hợp lệ. Vui lòng nhập 10 số.");
        return;
    }

    // Kiểm tra định dạng email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email không hợp lệ. Vui lòng nhập email đúng định dạng.");
        return;
    }

    const khachhang = localStorage.getItem('khachhang');

    try {
        const response = await api.put(`/khachhang/${khachhang}`, {
            HOTENKH: fullname,
            SDTKH: phone,
            EMAIL: email,
            DIACHI: address,
            ANHDAIDIENKH: link,
        });

        setSuccess('Cập nhật thông tin thành công.');
        setTimeout(() => navigate("/customer-info"), 100);

    } catch (err) {
        setError(err.response?.data?.message || 'Đã xảy ra lỗi trong quá trình cập nhật.');
    }
};

if (!isInitialDataLoaded) {
    return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;
  }
  return (
    <Container className="edit-customer-container mt-4">
      <h2 className="edit-customer-title">Chỉnh sửa thông tin</h2>
      {error && <p className="edit-customer-error text-danger">{error}</p>}
      {success && <p className="edit-customer-success text-success">{success}</p>}
      <Form className="edit-customer-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formFullname" className="edit-customer-form-group">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đầy đủ của bạn"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="formPhone" className="edit-customer-form-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={10}
            pattern="[0-9]*"
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail" className="edit-customer-form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="formAddress" className="edit-customer-form-group">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="formImage" className="edit-customer-form-group">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
          {isUploading && <p className="edit-customer-uploading text-info">Đang tải ảnh lên...</p>}
        </Form.Group>
  
        <Button variant="primary" type="submit" className="edit-customer-submit-btn">
          Cập nhật
        </Button>
      </Form>
    </Container>
  );  
}

export default EditCustomer;