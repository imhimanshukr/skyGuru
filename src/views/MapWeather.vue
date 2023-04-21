<template>
    <div>
        <i class="fs-12 p-0 pb-1 primary-gray hide-on-mobile">Click icon for weather info</i>
        <v-row class="weather-container">
            <v-col :cols="12" md="8" class="map-container">
                <i class="fs-12 p-0 pb-1 primary-gray show-on-mobile" style="display: none;">Click icon for weather info</i>
                <l-map :zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" style="height: 500px">
                    <l-tile-layer :url="tileLayerUrl" />
                    <l-marker v-for="(location, index) in locations" :key="index"
                        :lat-lng="getLatLng(location.weather.coord)">
                        <l-popup>
                            <div class="d-flex align-center">
                                <h3 class="text-capitalize mr-1">{{ location.location }}</h3>
                                <v-avatar color="cyan" size="26" class="rounded-lg">
                                    <img :src="`https://openweathermap.org/img/wn/${location.weather.weather[0].icon}.png`" alt="" width="30px">
                                </v-avatar>
                            </div>
                            <p>{{ location.weather.weather[0].description }}</p>
                            <p class="text-uppercase">{{ setTemp(location.weather.main.temp) }}&deg; {{ $store.state.tempUnits }}</p>
                        </l-popup>
                    </l-marker>
                </l-map>
            </v-col>
            <v-col cols="12" md="4">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field placeholder="Enter your city" filled dense rounded v-model="cityName"
                        :rules="cityRule" required></v-text-field>
                    <v-btn class="rounded-xl" color="#202B3B" width="100%" @click="addCity">View on Map</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
  
  
<script>
import { mapActions } from 'vuex';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    data() {
        return {
            cityName: "",
            valid: true,
            cityRule: [value => !!value || 'City name required.']
        }
    },
    mounted() {
        this.fetchWeather("darbhanga");
        this.fetchWeather("delhi");
        this.fetchWeather("hyderabad");
        this.fetchWeather("jaipur");
    },
    methods: {
        ...mapActions([
            'fetchWeather'
        ]),
        getLatLng(coord) {
            return L.latLng(coord.lat, coord.lon);
        },
        addCity() {
            if (this.$refs.form.validate()) {
                this.fetchWeather(this.cityName);
                this.cityName = "";
                this.$refs.form.resetValidation();
            }
        },
        setTemp(temp){
            return this.$store.state.tempUnits === "c" ? Math.trunc(temp - 273.15) : Math.trunc(temp * 9/5 - 459.67)
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
    computed: {
        zoom() {
            return 5
        },
        center() {
            return L.latLng(23.5, 80.5);
        },
        tileLayerUrl() {
            return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        maxZoom() {
            return 18
        },
        minZoom() {
            return 3
        },
        locations() {
            return this.$store.state.locations;
        },
    },
}
</script>
    
<style scoped>
.map-container {
    height: 500px;
}

.input-container {
    margin-top: 20px;
}
@media screen and (max-width: 960px) {
    .weather-container{
        flex-direction: column-reverse;
        /* align-items: center; */
    }
}
</style>
