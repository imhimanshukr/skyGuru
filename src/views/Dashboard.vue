<template>
    <v-row>
        <v-col cols="12" md="8">
            <div class="pl-9 pr-13 d-flex justify-space-between">
                <div class="d-flex flex-column justify-space-between">
                    <div>
                        <h3 class="primary-white fs-32 text-capitalize">{{ $store.state.searchResult.city || "N/A" }}</h3>
                        <p class="fs-12 primary-gray ff-rubik">Chance of rain: <span>{{
                            $store.state.searchResult.chanceOfRain +
                            " %" || "N/A" }}</span></p>
                    </div>
                    <h3 class="primary-white fs-45 ff-rubik fw-600">{{ $store.state.searchResult.temp + "&deg;" }}</h3>
                </div>
                <img src="../assets/cloud.png" v-if="$store.state.todayHourlyForecast[0].main.toLowerCase() == 'clouds'"
                    style="width: 140px; height: 140px; padding: 10px;">
                <img src="../assets/sun.png" v-if="$store.state.todayHourlyForecast[0].main.toLowerCase() == 'clear'"
                    style="width: 140px; height: 140px; padding: 10px;">
                <img src="../assets/rain.png" v-if="$store.state.todayHourlyForecast[0].main.toLowerCase() == 'rain'"
                    style="width: 140px; height: 140px; padding: 10px;">
            </div>
            <v-sheet color="#202B3B" class="rounded-xl pa-5 mt-5 pb-8">
                <p class="fs-12 primary-gray mb-6 text-uppercase ff-rubik fw-500">Today's Forecast</p>
                <v-row>
                    <v-col cols="2" class="text-center today-forecast pa-0"
                        v-for="item in $store.state.todayHourlyForecast" :key="item.time">
                        <p class="fs-12 primary-gray mb-2 ff-rubik">{{ item.time }}</p>
                        <img :src="`https://openweathermap.org/img/wn/${item.icon}.png`" alt="" width="40px">
                        <h3 class="primary-white fs-18 ff-rubik">{{ item.temp + "&deg;" }}</h3>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-sheet color="#202B3B" class="rounded-xl pa-5 mt-4">
                <div class="d-flex justify-space-between align-center">
                    <p class="fs-12 primary-gray mb-3 text-uppercase ff-rubik fw-500">Air Condition</p>
                    <v-btn class="rounded-xl fs-10 primary-bg px-2" style="height:22px;" @click="seeMore = !seeMore">{{
                        seeMore ? 'See less' : 'See more' }}</v-btn>
                </div>
                <v-row class="air-section">
                    <v-col cols="6" class="pb-0">
                        <div class="d-flex align-center">
                            <v-icon class="primary-gray">mdi-weather-sunny</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">Humidity</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.humidity+ " %" || "N/A"
                        }}
                        </p>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <div class="d-flex  align-center">
                            <v-icon class="primary-gray">mdi-weather-rainy</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">Chance of rain</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.chanceOfRain + " %"
                            ||
                            "N/A" }}</p>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <div class="d-flex align-center">
                            <v-icon class="primary-gray">mdi-thermometer</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">Max Temp</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.maxTemp + "&deg;"
                            ||
                            "N/A" }}</p>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <div class="d-flex  align-center">
                            <v-icon class="primary-gray">mdi-heat-wave</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">Feels like</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.feelsLike + "&deg;"
                            || "N/A" }}</p>
                    </v-col>
                    <v-col cols="6" class="pb-0" v-if="seeMore">
                        <div class="d-flex align-center">
                            <v-icon class="primary-gray">mdi-wind-turbine</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">Wind Speed</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.windSpeed + " km/h"
                            ||
                            "N/A" }}</p>
                    </v-col>
                    <v-col cols="6" class="pb-0" v-if="seeMore">
                        <div class="d-flex align-center">
                            <v-icon class="primary-gray">mdi-weather-sunset</v-icon>
                            <p class="ml-1 fs-12 primary-gray text-uppercase">sunset</p>
                        </div>
                        <p class="fs-20 pl-2 primary-white ff-rubik fw-600">{{ $store.state.searchResult.sunset || "N/A" }}
                        </p>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
            <v-sheet class="secondary-bg rounded-xl pa-5">
                <p class="fs-12 primary-gray mb-3 text-uppercase">Upcoming Forecast</p>
                <v-row cols="12" class="py-2 day-forecast" v-for="item in this.$store.state.next7DayForecast" :key="item.day">
                    <v-col class="d-flex justify-space-between align-center">
                        <p class="fs-12 primary-gray" style="width:70px;">{{ item.day }}</p>
                        <div class="d-flex align-center">
                        <img :src="`https://openweathermap.org/img/wn/${item.icon}.png`" alt="" width="40px">
                            <p class="fs-12 ml-2 transform-capitalize">{{ item.main }}</p>
                        </div>
                        <p class="fs-12">{{ item.temp + "&deg;" }}</p>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "dashBoard",
    data: () => ({
        seeMore: false,
    }),
}
</script>
<style scoped>
.day-forecast {
    border-bottom: 1px solid #575a5e4d;
}

.day-forecast:last-child {
    border-bottom: none;
}

.today-forecast {
    border-right: 1px solid #575a5e4d;
}

.today-forecast:last-child {
    border-right: none;
}

.air-section {
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    max-height: 150px;
    scrollbar-color: #ccc #f2f2f2;
}

.air-section::-webkit-scrollbar {
    width: 3px;
}

.air-section::-webkit-scrollbar-track {
    background: #f2f2f2;
    border-radius: 3px;
}

.air-section::-webkit-scrollbar-thumb {
    background-color: #9399A2;
    border-radius: 3px;
}</style>