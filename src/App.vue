<script setup>
import { useStore } from 'vuex';
// @ is an alias to /src
import LeftColumn from '@/components/LeftColumn.vue';
import BottomBar from '@/components/BottomBar.vue';
import Playlist from '@/components/Playlist.vue';
import Tabs from '@/components/Tabs.vue';

const store = useStore();
store.dispatch('updateMusicLibrary')
</script>


<!-- <button @click="$store.dispatch('addToPlaylist', 'C:/Users/Zanda/Desktop/test2.mp3')">add</button>
<button @click="$store.dispatch('log')">log</button>
<button @click="$store.dispatch('playTrack')">play</button> -->


<template>

	<div
		class="
			app
			flex flex-col min-h-screen max-h-screen overflow-hidden
			bg-white dark:bg-stone-900 dark:text-white"
	>

		<div class="flex-grow flex flex-row max-h-full overflow-hidden">

			<LeftColumn />

			<div class="flex-auto w-4/5 flex flex-col max-h-full overflow-hidden">

				<Tabs />

				<div class="flex-auto flex flex-row max-h-full overflow-hidden">

					<router-view />

					<Playlist />

				</div>

			</div>

		</div>

		<BottomBar />

	</div>

</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

.app {
	font-family: 'IBM Plex Mono', monospace;
}
</style>
