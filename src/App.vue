<template>
	<v-app class="my-background" app>
		<v-container class="main-container">
			<v-row class="h-100 ma-0">
				<v-col cols="1" class="pa-0">
					<Sidebar />
				</v-col>
				<v-col cols="11" class="pa-0">
					<Navbar />
					<v-main class="h-100">
						<router-view />
					</v-main>
				</v-col>
			</v-row>
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
	components: {
		Sidebar,
		Navbar
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
</style>