import axios from "axios";

const API_KEY = "f5ac4be4a19c47d8a3e42522222112";
const BASE_URL = "https://api.weatherapi.com/v1/";

let cachedData = {};

export const fetchWeatherData = async (city) => {
  if (cachedData[city]) {
    return cachedData[city];
  }

  try {
    console.log("Fetching data from API for city:", city);
    const { data } = await axios.get(
      `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=no&alerts=yes`
    );

    cachedData[city] = data;

    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
    throw error;
  }
};
