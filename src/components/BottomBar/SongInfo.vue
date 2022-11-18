<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';


const store = useStore();
const songTitle = ref('');
const songArtist = ref('');

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') {
		songTitle.value = state.currentSong.title;
		songArtist.value = state.currentSong.artist;
	};
});
</script>


<template>
	<div class="flex-auto w-1/6 flex flex-col place-content-center place-items-start">

	<button
		class="
			-mb-3
			flex-auto
			hover:underline
			text-sm
			font-bold
			dark:text-white
		"
	>{{ songTitle }}</button>

	<button
		class="
			flex-auto
			hover:underline
			text-xs
			dark:text-stone-300
			dark:hover:text-white
		"
	>{{ songArtist }}</button>

	</div>
</template>


<style scoped>
</style>
