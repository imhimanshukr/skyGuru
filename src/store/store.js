import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment/moment';

Vue.use(Vuex)
const API_KEY = '59fa2a32c95bd5383cb70966983e457e';

export default new Vuex.Store({
  state: {
    searchedCity: "Darbhanga",
    searchResult: "",
    todayHourlyForecast: [],
    todayActiveHourlyForecast: [],
    next7DayForecast: [],
    nextActive7Forecast: [],
    locations: [],
    tempUnits: "c",
    speedUnit: "km/h",
    timeFormat: "12-Hour",
    drawer: true,
    isDay: true,
  },
  mutations: {
    SearchResult(state, result){
      state.searchResult = result
    },
    setTodayHourlyForecast(state, todayHourlyForecast) {
      state.todayHourlyForecast = todayHourlyForecast
    },
    setActiveHourlyForecast(state, todayHourlyForecast) {
      state.todayActiveHourlyForecast = todayHourlyForecast
    },
    setNext7DaysForecase(state, forecastData){
      const foreCast = forecastData.data.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt);
        const today = new Date();
        return forecastDate.getHours() === 12 && forecastDate.getDate() >= today.getDate() && forecastDate.getDate() <= today.getDate() + 6;
      }).map(forecast => {
        const forecastDate = new Date(forecast.dt_txt);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[forecastDate.getDay()];
        return {
          day: dayOfWeek,
          temp: state.tempUnits === "c" ? forecast.main.temp - 273.15 : forecast.main.temp * 9/5 - 459.67,
          description: forecast.weather[0].description,
          main: forecast.weather[0].main,
          icon: forecast.weather[0].icon,
          city: forecastData.city,
        };
      });
      if(forecastData.page === "dashboard") {
        state.next7DayForecast = foreCast
      } else {
        state.nextActive7Forecast = foreCast;
      }
    },
    setLocationWeather(state, location) {
      state.locations.push(location)
    },
  },
  actions: {
    async search({ commit, state }, city) {
      try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      const todayForecast = {
        humidity: data.main.humidity,
        chanceOfRain: data.clouds.all,
        maxTemp: state.tempUnits === "c" ? data.main.temp_max - 273.15 : data.main.temp_max * 9/5 - 459.67,
        feelsLike: state.tempUnits === "c" ? data.main.feels_like - 273.15 : data.main.feels_like * 9/5 - 459.67,
        windSpeed: state.speedUnit === "km/h" ? data.wind.speed * 1.60934 : data.wind.speed,
        sunset: moment.unix(data.sys.sunset).format(state.timeFormat == '12-Hour' ? 'h:mm A' : 'HH:MM'),
        temp: state.tempUnits === "c" ? data.main.temp - 273.15 : data.main.temp * 9/5 - 459.67,
        city: data.name,
      }
      const currentTime = new Date(data.dt * 1000);
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        if (currentTime > sunrise && currentTime < sunset) {
          state.isDay = true;
        } else {
          state.isDay = false;
        }
      commit("SearchResult",todayForecast)
    }catch (error) {
        console.log("err: ", error);
      }
    },
    async fetchTodayHourlyForecast({ commit, state }, payload) {
      try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload.city}&appid=${API_KEY}`)
      const hourlyForecast = data.list.slice(0, 6).map(hour => {
        return {
          time: moment(hour.dt_txt, "YYYY-MM-DD HH:mm:ss").format(state.timeFormat == '12-Hour' ? 'h:mm A' : 'HH:MM'),
          time2: hour.dt_txt,
          temp: state.tempUnits === "c" ? hour.main.temp - 273.15 : hour.main.temp * 9/5 - 459.67,
          description: hour.weather[0].description,
          icon: hour.weather[0].icon,
          main: hour.weather[0].main,
          sunset: moment.unix(data.city.sunset).format(state.timeFormat == '12-Hour' ? 'h:mm A' : 'HH:MM'),
          city: data.city.name,
          chanceOfRain: hour.clouds.all
        }
      })
      if(payload.page === "dashboard") {
        commit('setTodayHourlyForecast', hourlyForecast);
      } else {
        commit('setActiveHourlyForecast', hourlyForecast);
      }
      commit('setNext7DaysForecase', {page: payload.page, data: data.list, city: payload.city})
    }catch (error) {
      console.log("err: ", error);
    }
    },
    async fetchWeather({ commit }, location) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
      const locationData = {
        location: location,
        weather: response.data,
      }
      commit('setLocationWeather', locationData)
    },
  },
})
