<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";


const isLoading = ref(false);
const isPlayting = ref(false);

window.songControls.songStateHasBeenUpdated((event, args) => {
	// console.log(args);
	isLoading.value = args[0] == 'loading' ? true : false;
	isPlayting.value = args[1];
});


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
			class="mx-2 text-stone-300 hover:text-white"
			icon="bi:skip-start-fill"
			:inline="true"
		/>

		<Icon
			v-if="isLoading"
			id="loading-icon"
			class="mx-2 text-4xl animate-spin"
			icon="mdi:loading"
			:inline="true"
		/>

		<Icon
			v-else-if="isPlayting"
			id="pause-button"
			@click="pauseBtnClick"
			class="mx-2 hover:scale-110 transition duration-200 text-4xl"
			icon="bi:pause-circle-fill"
			:inline="true"
		/>

		<Icon
			v-else
			id="play-button"
			@click="playBtnClick"
			class="mx-2 hover:scale-110 transition duration-200 text-4xl"
			icon="bi:play-circle-fill"
			:inline="true"
		/>

		<Icon
			id="next-button"
			class="mx-2 text-stone-300 hover:text-white"
			icon="bi:skip-end-fill"
			:inline="true"
		/>

	</div>
</template>


<style scoped>
</style>
