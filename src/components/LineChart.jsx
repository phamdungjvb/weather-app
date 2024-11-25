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

  const today = new Date().toISOString().split("T")[0];

  const isToday = date === today;

  useEffect(() => {
    if (!isToday) {
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
        fill: true,
        borderColor: `${
          type === "temperature"
            ? "rgb(75, 192, 192)"
            : type === "uv"
            ? "rgb(227, 191, 12)"
            : "rgb(64, 136, 4)"
        }`,
        pointRadius: 0,

        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
