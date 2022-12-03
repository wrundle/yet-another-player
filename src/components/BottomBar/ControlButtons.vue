<script setup>
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import { ref } from "vue";

const store = useStore();

const playBtnClick = () => {
	window.songControls.togglePause();
};

const pauseBtnClick = () => {
	window.songControls.togglePause();
};
</script>


<template>
	<div class="flex-auto flex flex-row place-content-center place-items-center text-3xl">

		<Icon
			id="previous-button"
			class="mx-4 text-stone-300 hover:text-white text-lg"
			icon="bi:shuffle"
			:inline="true"
		/>

		<Icon
			id="previous-button"
			class="mx-3 text-stone-300 hover:text-white"
			icon="bi:skip-start-fill"
			:inline="true"
		/>

		<Icon
			v-if="store.state.currentSongState.isPlaying"
			id="pause-button"
			@click="pauseBtnClick"
			class="mx-3 hover:scale-110 transition duration-200 text-4xl"
			icon="bi:pause-circle-fill"
			:inline="true"
		/>

		<Icon
			v-else
			id="play-button"
			@click="playBtnClick"
			class="mx-3 hover:scale-110 transition duration-200 text-4xl"
			icon="bi:play-circle-fill"
			:inline="true"
		/>

		<Icon
			id="next-button"
			class="mx-3 text-stone-300 hover:text-white"
			icon="bi:skip-end-fill"
			:inline="true"
		/>

		<Icon
			id="previous-button"
			class="mx-4 text-stone-300 hover:text-white text-lg"
			icon="bi:repeat"
			:inline="true"
		/>

	</div>
</template>


<style scoped>
</style>
