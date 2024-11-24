import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../services/weatherApi";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  fetchWeatherData
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null, // Thời tiết hiện tại
    forecast: [], // Dự báo theo ngày
    selectedDay: null, // Chi tiết ngày được chọn
    isModalOpen: false, // Trạng thái modal
    loading: false,
    error: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedDay = action.payload; // Lưu chi tiết ngày
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDay = null; // Reset chi tiết ngày khi đóng modal
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast.forecastday;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal } = weatherSlice.actions;

export default weatherSlice.reducer;
