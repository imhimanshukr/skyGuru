import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from "../views/Home.vue"
import Dashboard from "../views/Dashboard.vue"
import CityWeather from "../views/CityWeather.vue"
import MapWeather from "../views/MapWeather.vue"
import Setting from "../views/Setting.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/city-weather",
    name: "city-weather",
    component: CityWeather
  },
  {
    path: "/map-weather",
    name: "map-weather",
    component: MapWeather
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
