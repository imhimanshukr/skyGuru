import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment/moment';

Vue.use(Vuex)
const API_KEY = '59fa2a32c95bd5383cb70966983e457e';

export default new Vuex.Store({
  state: {
    searchResult: "",
    todayHourlyForecast: [],
    todayActiveHourlyForecast: [],
    next7DayForecast: [],
    nextActive7Forecast: [],
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
      console.log("myName: ", forecastData);
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
          temp: forecast.main.temp,
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
      console.log("state.next7DayForecast: ", state.next7DayForecast);
      console.log("state.nextActive7Forecast: ", state.nextActive7Forecast);
    }
  },
  actions: {
    async search({ commit }, city) {
      try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      const todayForecast = {
        humidity: data.main.humidity,
        chanceOfRain: data.clouds.all,
        maxTemp: data.main.temp_max,
        feelsLike: data.main.feels_like,
        windSpeed: data.wind.speed,
        sunset: moment.unix(data.sys.sunset).format('h:mm A'),
        temp: data.main.temp,
        city: data.name,
      }
      commit("SearchResult",todayForecast)
      console.log("data: ", data);
    }catch (error) {
        console.log("err: ", error);
      }
    },
    async fetchTodayHourlyForecast({ commit }, payload) {
      try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload.city}&units=metric&appid=${API_KEY}`)
      const hourlyForecast = data.list.slice(0, 6).map(hour => {
        return {
          time: moment(hour.dt_txt, "YYYY-MM-DD HH:mm:ss").format("h:mm A"),
          time2: hour.dt_txt,
          temp: hour.main.temp,
          description: hour.weather[0].description,
          icon: hour.weather[0].icon,
          main: hour.weather[0].main,
          sunset: moment.unix(data.city.sunset).format('h:mm A'),
          city: data.city.name,
          chanceOfRain: hour.clouds.all
        }
      })
      console.log("hour: ", data);
      console.log("hForecast: ", hourlyForecast);
      if(payload.page === "dashboard") {
        commit('setTodayHourlyForecast', hourlyForecast);
      } else {
        commit('setActiveHourlyForecast', hourlyForecast);
      }
      commit('setNext7DaysForecase', {page: payload.page, data: data.list, city: payload.city})
    }catch (error) {
      console.log("err: ", error);
      // Handle error
    }
    },
  },
})
