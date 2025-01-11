// BieuDoSanPhamBanChay.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/BaoCao.css';


// Import chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Gọi api qua axios (đã cấu hình sẵn)
import api from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BieuDoSanPhamBanChay() {
  const [loaiLoc, setLoaiLoc] = useState('month');
  const [nam, setNam] = useState(new Date().getFullYear());
  const [thang, setThang] = useState(() => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    return currentMonth < 10 ? `0${currentMonth}` : String(currentMonth);
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng bán',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  });

  const handleLoaiLocChange = (e) => {
    setLoaiLoc(e.target.value);
  };

  const handleNamChange = (e) => {
    setNam(e.target.value);
  };

  // Chọn tháng "yyyy-mm" -> tách ra year và month
  const handleThangChange = (e) => {
    const selectedValue = e.target.value; // ex: "2025-03"
    const [year, month] = selectedValue.split('-');
    setNam(year);
    setThang(month);
  };

  const fetchData = async () => {
    try {
      // Gọi API với params
      const response = await api.get('/chitietdh/baocao', {
        params: {
          filter: loaiLoc, // 'month' hoặc 'year'
          year: nam,
          month: thang,
        },
      });

      // Response dạng: [{ TENSP, quantity }, ...]
      const data = response.data || [];

      // Tách label và data
      const labels = data.map(item => item.TENSP);
      const quantities = data.map(item => item.quantity);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Số lượng bán',
            data: quantities,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  const handleXemBaoCao = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    // Lấy dữ liệu mặc định ngay khi load trang
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Biểu đồ sản phẩm bán chạy</h2>
      <Form onSubmit={handleXemBaoCao} className="mb-4">
        <Form.Group>
          <Form.Label>Chọn loại lọc</Form.Label>
          <Form.Control as="select" value={loaiLoc} onChange={handleLoaiLocChange}>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </Form.Control>
        </Form.Group>

        {loaiLoc === 'month' ? (
          <Form.Group>
            <Form.Label>Chọn tháng (năm-tháng)</Form.Label>
            <Form.Control
              type="month"
              value={`${nam}-${thang}`}
              onChange={handleThangChange}
            />
          </Form.Group>
        ) : (
          <Form.Group>
            <Form.Label>Chọn năm</Form.Label>
            <Form.Control
              type="number"
              value={nam}
              onChange={handleNamChange}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Xem báo cáo
        </Button>
      </Form>

      {/* Biểu đồ */}
      <div className="chart-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
            }
          }}
        />
      </div>
    </Container>
  );
}

export default BieuDoSanPhamBanChay;
