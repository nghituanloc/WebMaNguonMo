import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";

function SanPhamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenSP, setTenSP] = useState("");
  const [giaSP, setGiaSP] = useState(0);
  const [hinhAnhSP, setHinhAnhSP] = useState(null);
  const [moTa, setMoTa] = useState("");
  const [maLoai, setMaLoai] = useState("");
  const [cacMaLoai, setCacMaLoai] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const imgbbAPIKey = "0240012f6494107e4d133ab285363ffb"; // API key của ImgBB

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loaiSPResponse = await api.get("/loaisp");
        setCacMaLoai(loaiSPResponse.data);

        if (id) {
          const sanPhamResponse = await api.get(`/sanpham/${id}`);
          const sp = sanPhamResponse.data.sanpham;
          setTenSP(sp.TENSP);
          setGiaSP(sp.GIASP);
          setMoTa(sp.MOTASP);
          setMaLoai(sp.MALOAI);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("key", imgbbAPIKey);
    formData.append("image", imageFile);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url; // URL của hình ảnh sau khi upload
      }
      throw new Error("Upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = "";
      if (hinhAnhSP) {
        imageUrl = await uploadImageToImgBB(hinhAnhSP); // Upload hình ảnh
      }

      const formData = {
        TENSP: tenSP,
        GIASP: giaSP,
        HINHANHSP: imageUrl, // URL của hình ảnh từ ImgBB
        MOTASP: moTa,
        MALOAI: maLoai,
      };

      if (id) {
        await api.put(`/sanpham/${id}`, formData);
      } else {
        await api.post("/sanpham/create", formData);
      }

      navigate("/admin/sanpham");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container>
      <h2>{id ? "Chỉnh sửa" : "Thêm"} sản phẩm</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={tenSP}
            onChange={(e) => setTenSP(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            placeholder="Giá sản phẩm"
            value={giaSP}
            onChange={(e) => setGiaSP(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setHinhAnhSP(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mô tả về sản phẩm</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Loại sản phẩm</Form.Label>
          <Form.Control
            as="select"
            value={maLoai}
            onChange={(e) => setMaLoai(e.target.value)}
          >
            <option value="">Chọn phân loại</option>
            {cacMaLoai.map((loai) => (
              <option key={loai.MALOAI} value={loai.MALOAI}>
                {loai.TENLOAI}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isUploading}>
          {isUploading ? "Đang lưu..." : "Lưu"}
        </Button>
      </Form>
    </Container>
  );
}

export default SanPhamForm;
