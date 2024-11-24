import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, setCity } from "../store/weatherSlice";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";
import WeatherModal from "../components/WeatherModal";

const WeatherPage = () => {
  const dispatch = useDispatch();
  const { current, forecast, city } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [city, dispatch]);

  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
  };

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleCityChange}
        className="border rounded px-4 py-2 mb-4"
      />
      <WeatherCard current={current} forecast={forecast} />
      <WeatherChart forecast={forecast} />
      <WeatherModal />
    </div>
  );
};

export default WeatherPage;
