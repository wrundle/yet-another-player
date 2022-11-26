<script setup>
import { useStore } from 'vuex';


const store = useStore();
store.dispatch('fetchSongs');

window.fileHandling.settingsHaveBeenUpdated((event, data) => {
	store.dispatch('fetchSongs');
	// window.windowControls.reload();
});
</script>


<template>
	<div class="app">
		<router-view />
	</div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

.app {
	font-family: 'IBM Plex Mono', monospace;
}
</style>
