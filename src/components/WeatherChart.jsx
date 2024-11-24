import { useState } from "react";
import LineChart from "./LineChart";

const WeatherChart = ({ city, date }) => {
  const [chartType, setChartType] = useState("temperature");

  const handleSelectChange = (event) => {
    setChartType(event.target.value.toLowerCase());
  };

  return (
    <>
      <select
        name="temperature"
        id="temperature"
        value={chartType}
        onChange={handleSelectChange}
        className="mb-6 p-2 border outline-none rounded-lg"
      >
        <option value="temperature">Temperature</option>
        <option value="uv">UV</option>
        <option value="humidity">Humidity</option>
      </select>

      <LineChart city={city} date={date} type={chartType} />
    </>
  );
};

export default WeatherChart;
