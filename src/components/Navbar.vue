<template>
        <v-app-bar>
        <v-row>
            <v-col
          cols="11"
          md="8"
          class="pa-0"
        >
          <v-text-field
            placeholder="Search for city"
            filled
            dense
            rounded
            color="green"
            class="nav-input"
            v-model="searchCity"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-app-bar-nav-icon @click.stop="$store.state.drawer = !$store.state.drawer" class="show-on-mobile"></v-app-bar-nav-icon>
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
    methods:{
        ...mapActions(["search", "fetchTodayHourlyForecast"]),
    },
    watch: {
        searchCity(city){ 
            this.$store.state.searchedCity = city;
            this.search(city);
            this.fetchTodayHourlyForecast({city, page: "dashboard"});
            if(this.$route.path !== '/dashboard'){
              this.$router.replace("/dashboard")
            }
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

.show-on-mobile{
    display: none;
}
@media screen and (max-width: 600px) {
    .show-on-mobile{
        display: block;
        margin-top: -15px;
    }
}
</style>