<template>
    <v-row no-gutters class="h-100">
        <v-col
            sm="6"
            class="hide-on-mobile"
        >
        <v-card color="#202B3B" class="d-flex justify-center align-center rounded-xl" height="100%">
            <img src="../../public/favicon.png" alt="" width="100%">
        </v-card>
    </v-col>
    <v-col cols="12" sm="6">
        <div class="d-flex justify-center align-center flex-column h-100">
                <img src="../../public/favicon.png" alt="" width="60px" class="mb-5">
                <h2 class="fs-40 fw-600">SkyGuru</h2>
                <p class="primary-gray">Weather App</p>
                <v-btn rounded class="primary-bg fs-10 mt-8" @click="getStarted">Get started</v-btn>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "homePage",
    methods:{
        getStarted(){
            sessionStorage.setItem("sky-guru-loogedIn", true)
            this.$router.push("/dashboard")
        }
    }
    
}
</script>

<style scoped>

</style>