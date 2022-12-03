<script setup>
import { useStore } from 'vuex';

import CurrentPlaylistEntry from '@/components/CurrentPlaylistEntry.vue';


const store = useStore();
</script>


<template>
	<div class="
		right-column
		flex-initial flex flex-col w-1/6 max-h-max py-2 overflow-auto select-none
		dark:text-stone-400 border-l dark:border-l-stone-800 bg-gradient-to-t dark:from-black
	">
		<CurrentPlaylistEntry v-for="song, index in store.state.currentPlaylist" :key="song.id"
			:song="song"
			:index="index"
		/>
	</div>
</template>


<style scoped>
.right-column::-webkit-scrollbar {
    width: 10px;
}

.right-column::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.right-column::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>
