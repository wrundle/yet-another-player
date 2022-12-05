<script setup>
import Song from '@/components/RightSidebar/Song.vue';
import { useStore } from 'vuex';


const store = useStore();
</script>


<template>
	<div class="
		right-sidebar
		flex-initial flex flex-col w-1/6 max-h-max py-2 overflow-auto select-none
		dark:text-stone-400 border-l dark:border-l-stone-800 bg-gradient-to-t dark:from-black
	">
		<Song v-for="song, index in store.state.currentPlaylist" :key="song.id"
			:song="song"
			:index="index"
		/>
	</div>
</template>


<style scoped>
.right-sidebar::-webkit-scrollbar {
    width: 10px;
}

.right-sidebar::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.right-sidebar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>
