import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./store/weatherSlice";
import SearchCity from "./components/SearchCity";
import WeatherInfo from "./components/WeatherInfo";
import WeatherChart from "./components/WeatherChart";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, forecast } = useSelector((state) => state.weather);

  // Lấy thông tin mặc định khi khởi tạo ứng dụng
  useEffect(() => {
    dispatch(getWeather("Hanoi"));
  }, [dispatch]);

  // Sử dụng useMemo để tối ưu hóa giá trị city, date, type
  const weatherData = useMemo(() => {
    if (forecast.length > 0) {
      return {
        date: forecast[0].date,
        city: forecast[0].city,
        type: forecast[0].type,
      };
    }
    return { date: "", city: "", type: "" };
  }, [forecast]);

  const handleSearch = (city) => {
    dispatch(getWeather(city));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-2">
            <SearchCity onSearch={handleSearch} />
            {loading ? (
              <p className="text-gray-500 mt-4">Loading weather data...</p>
            ) : error ? (
              <p className="text-red-500 mt-4">Failed to load data.</p>
            ) : (
              <WeatherInfo />
            )}
          </div>

          <div className="sm:mt-0 sm:ml-12">
            <WeatherChart
              city={weatherData.city}
              date={weatherData.date}
              type={weatherData.type}
            />
            <WeatherCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
