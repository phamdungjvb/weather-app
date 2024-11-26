import { useSelector, useDispatch } from "react-redux";
import { setSelectedDayIndex } from "../store/weatherSlice";

const WeatherCard = () => {
  const { forecast, loading, selectedDayIndex } = useSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();

  if (loading) {
    return <p className="text-center">Loading weather data...</p>;
  }

  if (!forecast || !forecast.length) {
    return <p className="text-center">No forecast data available.</p>;
  }

  const handleDayClick = (index) => {
    dispatch(setSelectedDayIndex(index)); // Dispatch hành động khi click
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {forecast.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(index)} // Gọi hàm xử lý
            className={`text-center ${
              index === selectedDayIndex ? "bg-blue-500 text-white" : "bg-white"
            } px-6 py-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer`}
          >
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
