import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <p>
          Sản phẩm phục vụ cho đồ án kết thúc môn Phát triển Ứng dụng web mã nguồn mở
          <br />
          Tên đề tài: Xây dựng Website cửa hàng điện máy
          <br />
          Thành viên thực hiện: Nghị Tuấn Lộc - 110121053; Phạm Minh Thái - 110121100
          <br />
          Lớp: DA21TTA
        </p>
      </Container>
    </footer>
  );
}

export default Footer;