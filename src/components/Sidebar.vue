<template>
    <v-navigation-drawer
    permanent
    mini-variant
    mini-variant-width="65"
    class="secondary-bg rounded-xl"
    >
    <v-avatar class="ml-2 mt-4">
        <img src="../../public/favicon.png" alt="" style="width:40px; height:40px;">
    </v-avatar>
    <v-list class="mt-10">
            <v-list-item v-for="(item, index) in links" :key="index" class="pointer flex-column mb-5" link :to="item.to" active-class="active-link">
                <v-list-item-icon class="w-100 d-flex justify-center">
                    <v-icon v-text="item.icon" class="primary-gray fs-18 link-icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title class="primary-gray fs-12 w-auto link-text" style="position: relative !important;">{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideBar",
    data: () => ({
        links: [
            {
            icon: "mdi-weather-partly-cloudy",
            text: "Weather",
            to:"/dashboard"
        },
        {
            icon: "mdi-city",
            text: "Cities",
            to:"/city-weather"
        },
        {
            icon: "mdi-map-marker-outline",
            text: "Map",
            to:"/map-weather"
        },
        {
            icon: "mdi-cog",
            text: "Settings",
            to:"/setting"
        },
    ]
})
}
</script>

<style scoped>
    .v-list-item {
        min-height: auto !important;
    }
    .v-list-item__icon {
    margin: 5px 0;
}
.active-link .link-icon, .active-link .link-text {
    color: white !important;
}
.theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before {
    opacity: 0;
}
</style>