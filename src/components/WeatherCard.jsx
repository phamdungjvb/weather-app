import { useState } from "react";
import { useSelector } from "react-redux";

const WeatherCard = () => {
  const { forecast, loading } = useSelector((state) => state.weather);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleCardClick = (day) => {
    setSelectedDay(day);
  };

  if (loading) {
    return <p className="text-center">Loading weather data...</p>;
  }

  if (!forecast || !forecast.length) {
    return <p className="text-center">No forecast data available.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`text-center ${
              index === 0 ? "bg-blue-500 text-white" : "bg-white"
            } px-6 py-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer`}
            onClick={() => handleCardClick(day)}
          >
            {/* Day */}
            <p className="font-bold text-lg">
              {index === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
            </p>

            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-14 h-14 mx-auto mt-3"
            />

            <p className="text-sm mt-3">{day.day.condition.text}</p>

            <p className="font-bold text-xl mt-2">{day.day.avghumidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
