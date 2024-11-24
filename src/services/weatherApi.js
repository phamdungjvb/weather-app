import axios from "axios";

const API_KEY = "f5ac4be4a19c47d8a3e42522222112";
const BASE_URL = "https://api.weatherapi.com/v1/";

export const fetchWeatherData = async (city) => {
  const { data } = await axios.get(
    `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=no&alerts=yes`
  );
  return data;
};
