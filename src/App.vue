<template>
	<v-app class="my-background" app>
		<v-container class="main-container">
			<v-row class="ma-0" v-if="isLoogedIn">
				<v-col cols="1" class="pa-0">
					<Sidebar />
				</v-col>
				<v-col cols="12" sm="11" class="p-responsive">
					<Navbar />
					<v-main class="main-router">
						<router-view />
					</v-main>
				</v-col>
			</v-row>
			<v-main class="h-100" v-else>
				<router-view />
			</v-main>
		</v-container>
	</v-app>
</template>
  
  
<script>
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';

export default {
	name: 'App',

	data: () => ({
		//
	}),
	created(){
	},
	components: {
		Sidebar,
		Navbar
	},
	computed:{
		isLoogedIn(){
			const isLoggedIn = sessionStorage.getItem("sky-guru-loogedIn")
			if (!isLoggedIn && this.$route.path !== '/') {
			this.$router.replace("/")
			} else if (isLoggedIn && this.$route.path === '/') {
			this.$router.replace("/dashboard")
			}
			return isLoggedIn
		}
}

};
</script>
  
<style>
.my-background {
	background-color: #030303;
}

.main-container {
	background-color: #0B131E;
	height: 100vh;
	padding: 30px;
	font-family: 'Roboto', sans-serif !important;
}
.main-router {
	overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 98px);
}
.main-router::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.main-router {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.p-responsive{
	padding: 0;
}
@media screen and (max-width: 1264px) {
	.p-responsive {
		padding: 0 15px !important;
	}
}
@media screen and (max-width: 600px) {
	.main-container {
		padding: 15px 0;
	}
	.main-router{
		height: calc(100vh - 130px) !important;
	}
}
</style>