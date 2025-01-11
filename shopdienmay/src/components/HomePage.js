import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Pagination } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api";
import './styles/home.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const location = useLocation();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/sanpham");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Invalid data format for products:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await api.get("/loaisp");
        if (Array.isArray(response.data)) {
          setProductTypes(response.data);
        } else {
          console.error("Invalid data format for product types:", response.data);
          setProductTypes([]);
        }
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchProducts();
    fetchProductTypes();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search");
    setSearchTerm(search || "");
    setCurrentPage(1);
  }, [location.search]);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.TENSP?.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const matchesFilterType = filterType ? product.MALOAI == filterType : true;
    return matchesSearchTerm && matchesFilterType;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.GIASP || 0);
    const priceB = parseFloat(b.GIASP || 0);
    if (sortOrder === "asc") {
      return priceA - priceB;
    } else if (sortOrder === "desc") {
      return priceB - priceA;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="my-4">
        <Col md={3}>
          <Form>
            <Form.Group>
              <Form.Label>Tìm kiếm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Theo tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lọc theo loại</Form.Label>
              <Form.Control
                as="select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Tất cả</option>
                {productTypes.map((type) => (
                  <option key={type.MALOAI} value={type.MALOAI}>
                    {type.TENLOAI}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sắp xếp theo giá</Form.Label>
              <Form.Control
                as="select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Mặc định</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <Row>
            {currentProducts.map((product) => (
              <Col md={3} key={product.MASP} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={product.HINHANHSP} alt={product.TENSP} />
                  <Card.Body>
                    <Card.Title>{product.TENSP}</Card.Title>
                    <Card.Text>Giá: {formatCurrency(product.GIASP)}</Card.Text>
                    <Link
                      to={`/product/${product.MASP}`}
                      className="btn btn-primary"
                    >
                      Xem chi tiết
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination>
            {Array.from(
              { length: Math.ceil(sortedProducts.length / productsPerPage) },
              (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;