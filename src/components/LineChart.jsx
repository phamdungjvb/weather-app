import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ city, date, type }) => {
  const [chartData, setChartData] = useState([]);
  const weather = useSelector((state) => state.weather);

  // Get today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split("T")[0];

  // Check if the provided date is today's date
  const isToday = date === today;

  useEffect(() => {
    if (!isToday) {
      // If the selected date is not today, return early
      setChartData([]);
      return;
    }

    const fetchData = async () => {
      try {
        const datas = weather.forecast;
        const data = datas.find((item) => item.date === date);

        if (data) {
          const tempData = [];
          if (type === "temperature") {
            data.hour.forEach((item) => {
              tempData.push({ time: item.time, value: item.temp_f });
            });
          } else if (type === "humidity") {
            data.hour.forEach((item) => {
              tempData.push({ time: item.time, value: item.humidity });
            });
          } else if (type === "uv") {
            data.hour.forEach((item) => {
              tempData.push({ time: item.time, value: item.uv });
            });
          }
          setChartData(tempData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [city, date, type, isToday]);

  // If not today's data, don't render chart
  if (!isToday || chartData.length === 0) {
    return null; // Or display a message like "Data not available"
  }

  // Xử lý dữ liệu để hiển thị trên biểu đồ
  const labels = chartData.map((item) => item.time);
  const dt = chartData.map((item) => item.value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${
          type === "temperature"
            ? "Temperature"
            : type === "uv"
            ? "UV"
            : "Humidity"
        }`,
        data: dt,
        fill: true, // Bật nền màu phía dưới
        borderColor: `${
          type === "temperature"
            ? "rgb(75, 192, 192)"
            : type === "uv"
            ? "rgb(227, 191, 12)"
            : "rgb(64, 136, 4)"
        }`,
        borderWidth: 1,
        pointRadius: 0, // Style dấu chấm trên đường
        backgroundColor: `${
          type === "temperature"
            ? "rgba(75, 192, 192, 0.2)" // Nền màu mờ cho nhiệt độ
            : type === "uv"
            ? "rgba(227, 191, 12, 0.2)" // Nền màu mờ cho UV
            : "rgba(64, 136, 4, 0.2)" // Nền màu mờ cho độ ẩm
        }`,
        tension: 0.5, // Làm mượt đường
      },
    ],
  };

  // Cấu hình các tùy chọn hiển thị
  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
        title: {
          display: false, // Ẩn tiêu đề trục X
        },
        ticks: {
          display: false, // Ẩn nhãn trục X
        },
        grid: {
          display: false, // Ẩn lưới trục X
        },
      },
      y: {
        display: false,
        title: {
          display: false, // Ẩn tiêu đề trục Y
        },
        ticks: {
          display: false, // Ẩn nhãn trục Y
        },
        grid: {
          display: false, // Ẩn lưới trục Y nếu cần
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn chú thích màu
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} ${
              type === "temperature" ? "°F" : type === "uv" ? "" : "%"
            }`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
