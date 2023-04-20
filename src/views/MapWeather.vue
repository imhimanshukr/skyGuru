<template>
    <v-container fluid>
        <v-row>
            <v-col :cols="12" class="map-container">
                <l-map :zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom" style="height: 500px">
                    <l-tile-layer :url="tileLayerUrl" />
                    <l-marker v-for="(location, index) in locations" :key="index"
                        :lat-lng="getLatLng(location.weather.coord)">
                        <l-popup>
                            <h3 class="text-capitalize">{{ location.location }}</h3>
                            <p>{{ location.weather.weather[0].description }}</p>
                            <p>{{ location.weather.main.temp }}°C</p>
                        </l-popup>
                    </l-marker>
                </l-map>
            </v-col>
        </v-row>
    </v-container>
</template>
  
  
<script>
import { mapActions } from 'vuex';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
    mounted() {
        this.fetchWeather("darbhanga");
        this.fetchWeather("delhi");
        this.fetchWeather("hyderabad");
        this.fetchWeather("jaipur");
    },
    computed: {
        zoom() {
            return 10
        },
        center() {
            return L.latLng(26.1670, 85.8950);
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
            const data = this.$store.state.locations;
            console.log("loc: ", data);
            return data;
        },
    },
    data() {
        return {
            newLocation: '',
        }
    },
    methods: {
        ...mapActions([
            'fetchWeather'
        ]),
        getLatLng(coord) {
            return L.latLng(coord.lat, coord.lon);
        }
    }
}
</script>
    
<style scoped>
.map-container {
    height: 500px;
}

.input-container {
    margin-top: 20px;
}
</style>
