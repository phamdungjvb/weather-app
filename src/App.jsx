import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./store/weatherSlice";
import SearchCity from "./components/SearchCity";
import WeatherInfo from "./components/WeatherInfo";
import WeatherChart from "./components/WeatherChart";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, forecast } = useSelector((state) => state.weather);

  const handleSearch = (city) => {
    dispatch(getWeather(city));
  };

  useEffect(() => {
    handleSearch("Hanoi");
  }, []);

  const date = forecast.length ? forecast[0].date : "";
  const city = forecast.length ? forecast[0].city : "";
  const type = forecast.length ? forecast[0].type : "";

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
            <WeatherChart city={city} date={date} type={type} />
            <WeatherCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
