import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import api from "../services/api";
import "./styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ NOIDUNGDG: "", SAO: 5 });
  const [canReview, setCanReview] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await api.get(`/sanpham/${id}`);
        setProduct(response.data.sanpham);
        setReviews(response.data.danhgia);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
    checkIfCanReview();
  }, [id]);

  const checkIfCanReview = async () => {
    const khachhang = localStorage.getItem("khachhang");
    if (khachhang) {
      try {
        const response = await api.get(`/donhang/khachhang/${khachhang}`);
        const hasPurchased = response.data.some((order) =>
          order.CHITIETDH.some((detail) => detail.MASP === parseInt(id))
        );
        setCanReview(hasPurchased);
      } catch (error) {
        console.error("Error checking if user can review:", error);
      }
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const submitReview = async () => {
    const khachhang = localStorage.getItem("khachhang");
    if (!khachhang) {
      alert("Vui lòng đăng nhập để gửi đánh giá.");
      return;
    }

    try {
      await api.post("/danhgia/create", {
        TENDANGNHAPKH: khachhang,
        MASP: id,
        NOIDUNGDG: newReview.NOIDUNGDG,
        SAO: newReview.SAO,
      });
      setReviews([...reviews, { ...newReview, TENDANGNHAPKH: khachhang }]);
      setNewReview({ NOIDUNGDG: "", SAO: 5 });
      alert("Đã gửi đánh giá thành công!");
    } catch (error) {
      alert("Bạn đã đánh giá sản phẩm này rồi");
    }
  };

  const addToCart = async () => {
    const khachhang = localStorage.getItem("khachhang");
    if (!khachhang) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }

    try {
      // Lấy MAGH của khách hàng
      const giohangResponse = await api.get(`/giohang/${khachhang}`);
      const MAGH = giohangResponse.data.MAGH;

      // Thêm sản phẩm vào giỏ hàng
      await api.post("/chitietgh/create", {
        MAGH: MAGH,
        MASP: id,
        SOLUONG: quantity,
      });

      alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    } catch (error) {
      alert("Sản phẩm đã tồn tại trong giỏ hàng");
    }
  };

  if (!product) {
    return <div>Đang tải...</div>;
  }

  return (
    <Container className="product-detail-container mt-4">
      {/* Dùng div thay cho Row/Col */}
      <div className="product-detail-layout">

        <div className="product-detail-left">
          {/* Thay thế Card.Img bằng div */}
          <div
            className="product-image"
            style={{
              backgroundImage: `url(${product.HINHANHSP})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              // Tùy chỉnh kích thước nếu cần:
              width: "100%",
              height: "400px",
            }}
          />
        </div>

        {/* Bên phải: Thông tin sản phẩm + Đánh giá */}
        <div className="product-detail-right">
          <Card className="product-info-card">
            <Card.Body>
              <Card.Title className="product-title">{product.TENSP}</Card.Title>
              <Card.Text className="product-price-description">
                <strong>Giá:</strong> {formatCurrency(product.GIASP)}
                <br />
                <strong>Mô tả:</strong>
                <div className="product-description">{product.MOTASP}</div>
              </Card.Text>
              <Form.Group className="quantity-input-group">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="quantity-input"
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={addToCart}
                className="add-to-cart-button"
              >
                Thêm vào giỏ hàng
              </Button>
            </Card.Body>
          </Card>

          <h4 className="reviews-title mt-4">Đánh giá</h4>
          {reviews.map((review, index) => (
            <Card key={index} className="review-card mb-2">
              <Card.Body>
                <Card.Title className="review-author">
                  {review.HOTENKH ? review.HOTENKH : "Khách hàng ẩn danh"}
                </Card.Title>
                <Card.Text className="review-rating">
                  {review.SAO && (
                    <span>
                      {Array.from({ length: review.SAO }).map((_, i) => (
                        <span key={i} className="star-icon">
                          &#9733;
                        </span>
                      ))}
                    </span>
                  )}
                </Card.Text>
                <Card.Text className="review-content">
                  {review.NOIDUNGDG}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}

          {canReview && (
            <Card className="review-form-card mt-3">
              <Card.Body>
                <Card.Title className="review-form-title">
                  Viết đánh giá
                </Card.Title>
                <Form>
                  <Form.Group className="rating-select-group">
                    <Form.Label>Số sao</Form.Label>
                    <Form.Control
                      as="select"
                      name="SAO"
                      value={newReview.SAO}
                      onChange={handleReviewChange}
                      className="rating-select"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} sao
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="review-textarea-group">
                    <Form.Label>Nội dung đánh giá</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="NOIDUNGDG"
                      value={newReview.NOIDUNGDG}
                      onChange={handleReviewChange}
                      className="review-textarea"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={submitReview}
                    className="submit-review-button"
                  >
                    Gửi đánh giá
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
