<template>
    <v-container fluid>
        <v-row>
            <v-col :cols="12" md="8">
                <h3 class="fs-16 mb-2">General</h3>
                <v-sheet class="secondary-bg rounded-xl pa-5">
                    <div>
                        <h3 class="fs-12 text-uppercase mb-2 primary-gray">temperature</h3>
                        <div class="rounded-xl pa-1" style="background-color: #0B131E;">
                            <v-btn :color="$store.state.tempUnits === item.unit ? '#35455E' : '#0B131E'" width="50%" class="rounded-xl primary-gray text-capitalize" height="24" small v-for="item in temperature" :key="item.text" @click="$store.state.tempUnits = item.unit">
                                {{item.text}}
                            </v-btn>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h3 class="fs-12 text-uppercase mb-2 primary-gray">Wind speed</h3>
                        <div class="rounded-xl pa-1" style="background-color: #0B131E;">
                            <v-btn :color="$store.state.speedUnit === item.text ? '#35455E' : '#0B131E'" width="50%" class="rounded-xl primary-gray text-lowercase" height="24" small v-for="item in windSpeed" :key="item.text" @click="$store.state.speedUnit = item.text">
                                {{item.text}}
                            </v-btn>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h3 class="fs-12 text-uppercase mb-2 primary-gray">Time format</h3>
                        <div class="rounded-xl pa-1" style="background-color: #0B131E;">
                            <v-btn :color="$store.state.timeFormat === item.text ? '#35455E' : '#0B131E'" width="50%" class="rounded-xl primary-gray text-lowercase" height="24" small v-for="item in timeFormat" :key="item.text" @click="$store.state.timeFormat = item.text">
                                {{item.text}}
                            </v-btn>
                        </div>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default {
    name: "SettingPage",
    data(){
        return {
    temperature: [
        {
            text: "Celcius",
            unit: "c"
        },
        {
            text: "Fahrenheit",
            unit: "f"
        }
    ],
    windSpeed: [
        {
            text: "km/h",
        },
        {
            text: "m/s",
        }
    ],
    timeFormat: [
        {
            text: "12-Hour",
        },
        {
            text: "24-Hour",
        }
    ]
}

    }
}
</script>
<style scoped>
.theme--dark.v-btn:focus::before, .theme--dark.v-btn:hover::before {
    opacity: 0;
}
</style>