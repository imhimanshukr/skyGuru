<template>
    <v-row>
        <v-col cols="12" md="8">
            <v-sheet class="pointer secondary-bg rounded-xl py-4 px-5 mb-4 d-flex justify-space-between align-center card-sheet" :class="{active: index === activeIndex}"
                v-for="(weather, index) in tempCityWeather" :key="weather.city" @click="getMoreInfo(index)">
                <div class="d-flex align-center">
                    <img src="../assets/cloud.png" v-if="weather.main.toLowerCase() == 'clouds'" style="width: 80px; height: 80px; padding: 10px;">
                    <img src="../assets/sun.png" v-if="weather.main.toLowerCase() == 'clear'" style="width: 80px; height: 80px; padding: 10px;">
                    <img src="../assets/moon.png" v-if="$store.state.todayHourlyForecast[0].main.toLowerCase() == 'clear' && !isDayTime" style="height: 120px; padding: 10px" />
                    <img src="../assets/rain.png" v-if="weather.main.toLowerCase() == 'rain'" style="width: 80px; height: 80px; padding: 10px;">
                    <div class="ml-6">
                        <h3 class="primary-white fs-28 fw-500 text-capitalize">{{ weather.city }}</h3>
                        <div class="d-flex align-baseline">
                            <v-icon class="primary-gray fs-18">mdi-weather-sunset</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">{{ weather.sunset }}</p>
                        </div>
                    </div>
                </div>
                <h3 class="primary-white fs-32 ff-rubik fw-400 text-uppercase">{{ Math.trunc(weather.temp) + "&deg; "+$store.state.tempUnits }}</h3>
            </v-sheet>
        </v-col>
        <v-col cols="12" md="4" v-if="this.activePlace.length">
            <div class="pb-5 justify-space-between hide-on-tablet" style="border-bottom: 1px solid #575a5e4d; display: flex;">
                <div class="d-flex flex-column justify-space-between">
                    <div>
                        <h3 class="primary-white fs-32 text-capitalize">{{ this.activePlace[0].city || "N/A" }}</h3>
                        <p class="fs-12 primary-gray ff-rubik">Chance of rain: <span>{{ this.activePlace[0].chanceOfRain +" %" || "N/A" }}</span></p>
                    </div>
                    <h3 class="primary-white fs-40 ff-rubik fw-600 text-uppercase">{{ Math.trunc(this.activePlace[0].temp) + "&deg; "+$store.state.tempUnits }}</h3>
                </div>
                <img src="../assets/cloud.png" v-if="this.activePlace[0].main.toLowerCase() == 'clouds'" style="width: 120px; height: 120px; padding: 10px;">
                <img src="../assets/sun.png" v-if="this.activePlace[0].main.toLowerCase() == 'clear'" style="width: 120px; height: 120px; padding: 10px;">
                <img src="../assets/moon.png" v-if="$store.state.todayHourlyForecast[0].main.toLowerCase() == 'clear' && !isDayTime" style="height: 120px; padding: 10px" />
                <img src="../assets/rain.png" v-if="this.activePlace[0].main.toLowerCase() == 'rain'" style="width: 120px; height: 120px; padding: 10px;">
            </div>
            <v-sheet color="transparent" class="mt-4 pb-12">
                <p class="fs-12 primary-gray mb-6 text-uppercase ff-rubik fw-500">Today's Forecast</p>
                <v-row>
                    <v-col cols="4" class="text-center today-forecast pa-0"
                        v-for="item in todayForecast" :key="item.time">
                        <p class="fs-12 primary-gray mb-2 ff-rubik">{{ item.time }}</p>
                        <img :src="`https://openweathermap.org/img/wn/${item.icon}.png`" alt="" width="40px">
                        <h3 class="primary-white fs-18 fw-500 ff-rubik text-uppercase">{{ Math.trunc(item.temp) + "&deg; "+$store.state.tempUnits }}</h3>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-sheet color="transparent">
                <p class="fs-12 primary-gray text-uppercase">3-Day Forecast</p>
                <v-row cols="12" class="day-forecast" v-for="item in getSevenDayData" :key="item.day">
                    <v-col class="d-flex justify-space-between align-center px-8 py-2">
                        <p class="fs-12 primary-gray" style="width:70px;">{{ item.day }}</p>
                        <div class="d-flex align-center">
                        <img :src="`https://openweathermap.org/img/wn/${item.icon}.png`" :style="item.main == 'Clear' || item.main == 'Rain' ? 'margin-right: 10px;': ''" alt="" width="40px">
                            <p class="fs-12 ml-2 transform-capitalize">{{ item.main }}</p>
                        </div>
                        <p class="fs-12 text-uppercase">{{ Math.trunc(item.temp) + "&deg; "+$store.state.tempUnits }}</p>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            cityWeather: [],
            activeIndex: 0,
            activePlace: [],
            tempCityWeather: [],
            todayForecast: [],
            getSevenDayData: [],
        }
    },
    mounted() {
        this.cityWeather = [];
        this.searchCity("Patna").then(() => {
            this.cityWeather.push(this.$store.state.todayActiveHourlyForecast);
            return this.searchCity("delhi");
        }).then(() => {
            this.cityWeather.push(this.$store.state.todayActiveHourlyForecast);
            return this.searchCity("hyderabad")
        }).then(() => {
            this.cityWeather.push(this.$store.state.todayActiveHourlyForecast);
            return this.searchCity("Jaipur")
        }).then(() => {
            this.cityWeather.push(this.$store.state.todayActiveHourlyForecast);
            this.tempCityWeather = this.cityWeather.map((item) => item[0]);
            this.getMoreInfo(0)
        }).catch(error => {
            console.log("Error occurred: ", error);
        });
    },
    methods: {
        ...mapActions(["search", "fetchTodayHourlyForecast"]),
        searchCity(city) {
            return new Promise((resolve, reject) => {
                this.fetchTodayHourlyForecast({city, page: "city-weather"}).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getMoreInfo(index){
            this.activePlace = [];
            this.activeIndex = index;
            this.activePlace = this.cityWeather[index];
            this.searchCity(this.activePlace[0].city)
            const prom = new Promise((resolve, reject) => {
                this.fetchTodayHourlyForecast({city: this.activePlace[0].city, page: "city-weather"}).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
            prom.then(() => {
                this.getSevenDayData = this.$store.state.nextActive7Forecast.slice(0,3);
                this.todayForecast = this.$store.state.todayActiveHourlyForecast.slice(0,3);
            }).catch((err) =>{
                console.log("err: ", err);
            })
        }
    },
    computed: {
        isDayTime() {
            const date = new Date();
            const hours = date.getHours();
            const isDay = hours > 6 && hours < 19;
            return isDay;
        }
    }
}
</script>
<style scoped>
    .card-sheet.active {
        background-color: transparent !important;
        border: 1px solid #0461A5;
    }
    .today-forecast {
    border-right: 1px solid #575a5e4d;
}

.today-forecast:last-child {
    border-right: none;
}
.day-forecast {
    border-bottom: 1px solid #575a5e4d;
}

.day-forecast:last-child {
    border-bottom: none;
}
</style>