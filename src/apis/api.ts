import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

const getBasicWeather = (cityName: string, countryCode: string) => {
  return axiosInstance.get(
    `data/2.5/weather?q=${cityName},${countryCode}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
};

export { getBasicWeather };
