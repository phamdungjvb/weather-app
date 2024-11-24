import { useState } from "react";
import LineChart from "./LineChart";

const WeatherChart = ({ city, date }) => {
  const [chartType, setChartType] = useState("temperature"); // Sử dụng giá trị hợp lệ cho `type`

  // Hàm xử lý khi thay đổi lựa chọn trong dropdown
  const handleSelectChange = (event) => {
    setChartType(event.target.value.toLowerCase()); // Chuyển giá trị về dạng chữ thường
  };

  return (
    <>
      <select
        name="temperature"
        id="temperature"
        value={chartType} // Liên kết với trạng thái chartType
        onChange={handleSelectChange} // Gọi hàm xử lý khi giá trị thay đổi
        className="mb-6 p-2 border outline-none rounded-lg"
      >
        <option value="temperature">Temperature</option>
        <option value="uv">UV</option>
        <option value="humidity">Humidity</option>
      </select>

      {/* Hiển thị LineChart với loại dữ liệu được chọn */}
      <LineChart city={city} date={date} type={chartType} />
    </>
  );
};

export default WeatherChart;
