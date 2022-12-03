<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';


const songTitle = ref('');
const songArtists = ref('');

const store = useStore();
store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') {
		songTitle.value = state.currentSong.title;
		songArtists.value = state.currentSong.artists[0];
	};
});
</script>


<template>
	<div class="flex-1 w-2/7 flex flex-col place-content-center place-items-start">

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
		>{{ songArtists }}</button>

	</div>
</template>


<style scoped>
</style>
