import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const WeatherInfo = () => {
  const { forecast, selectedDayIndex, loading } = useSelector(
    (state) => state.weather
  );
  const [realTime, setRealTime] = useState("");

  useEffect(() => {
    const updateRealTime = () => {
      const now = new Date();
      const options = {
        day: "2-digit",
        weekday: "short",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      };

      const formattedDate = now.toLocaleDateString("en-US", options);
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setRealTime(`${formattedTime}, ${formattedDate}`);
    };

    updateRealTime();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!forecast || forecast.length === 0) {
    return <p>No weather data available</p>;
  }

  const selectedDay = forecast[selectedDayIndex]; // Lấy dữ liệu ngày được chọn

  return (
    <div className="mt-6 flex flex-col gap-6 py-8 items-center sm:text-left">
      <p className="text-gray-500 text-lg">{realTime}</p>

      <div className="flex items-center justify-center sm:justify-start mt-4">
        <img
          src={selectedDay.day.condition.icon}
          alt={selectedDay.day.condition.text}
          className="w-16 h-16"
        />
        <span className="text-5xl font-bold ml-4">
          {selectedDay.day.avgtemp_f}
          <sup className="align-super text-xl">°F</sup>
        </span>
      </div>

      <p className="text-2xl text-gray-700 mt-3 font-bold">
        {selectedDay.day.condition.text}
      </p>

      <div className="flex justify-center sm:justify-start text-gray-500 mt-6 space-x-10">
        <div className="text-center">
          <p className="text-lg">Humidity</p>
          <p className="font-semibold text-xl text-gray-700">
            {selectedDay.day.avghumidity}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg">Wind speed</p>
          <p className="font-semibold text-xl text-gray-700">
            {selectedDay.day.maxwind_kph} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
