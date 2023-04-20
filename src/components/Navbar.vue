<template>
        <v-app-bar>
        <v-row>
            <v-col
          cols="11"
          sm="8"
          class="pa-0"
        >
          <v-text-field
            placeholder="Search for cities"
            filled
            dense
            rounded
            color="green"
            class="nav-input"
            v-model="searchCity"
          ></v-text-field>
        </v-col>
      </v-row>
        </v-app-bar>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: "NavBar",
    data(){
        return{
            searchCity: "",
        }
    },
    mounted(){
        this.search("Darbhanga");
        this.fetchTodayHourlyForecast({city: "Darbhanga", page: "dashboard"});
    },
    methods:{
        ...mapActions(["search", "fetchTodayHourlyForecast"]),
    },
    watch: {
        searchCity(city){
            this.search(city);
            this.fetchTodayHourlyForecast({city, page: "dashboard"});
        }
    }
}
</script>
<style scoped>
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
    background-color: transparent;
}
.nav-input {
  font-size: 12px;
}

.nav-input ::placeholder {
  font-size: 12px;
}


</style>