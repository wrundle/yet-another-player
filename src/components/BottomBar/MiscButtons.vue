<script setup>
import { colorRangeSlider } from '@/utilities/utilities.js'
import { ref, onMounted } from 'vue';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';


const volume = ref(0.5);


const store = useStore();

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_SETTINGS') {
		volume.value = mutation.payload.volume;
		setTimeout(() => {
			colorRangeSlider(document.getElementById("volume-bar"), isBeignHovered);
		}, 10);
	};
});


var isBeignHovered = false;

onMounted(() => {
	colorRangeSlider(document.getElementById("volume-bar"), isBeignHovered)
	document.getElementById("volume-bar").oninput = function () {
		window.settings.setVolume(this.value);
		colorRangeSlider(this, isBeignHovered);
	};
	document.getElementById("volume-bar").onmouseenter = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this, isBeignHovered);
		document.getElementById("volume-bar").style.setProperty('--thumb-visibility', 'visible');
	};
	document.getElementById("volume-bar").onmouseleave = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this, isBeignHovered);
		document.getElementById("volume-bar").style.setProperty('--thumb-visibility', 'hidden');
	};
});
</script>


<template>
	<div class="flex-1 w-2/7 flex flex-row justify-end place-items-center text-2xl">

		<router-link to="/lyrics" id="LyricsViewLink">
			<Icon
				id=""
				class="mr-2 text-stone-300 hover:text-white"
				icon="material-symbols:lyrics-outline"
				:inline="true"
			/>
		</router-link>

		<Icon
			id=""
			class="ml-2 text-stone-300 hover:text-white"
			icon="material-symbols:volume-down-outline"
			:inline="true"
		/>

		<input
			id="volume-bar"
			type="range" min="0" max="1" :value="volume" step="0.05"
			name="volume-bar"
			class="mx-1 h-[4px] w-24"
		/>

		<router-link to="/theater" id="TheaterViewLink">
			<Icon
				class="ml-4 mr-5 text-stone-300 hover:text-white"
				icon="mdi:arrow-expand"
				:inline="true"
			/>
		</router-link>

	</div>
</template>


<style scoped>
#volume-bar {
	appearance: none;
	border-radius: 8px;
	outline: none;
	transition: background 450ms ease-in;
	--thumb-visibility: hidden;
}

#volume-bar::-webkit-slider-thumb {
	/* Fallback */
	visibility: hidden;
	/* Dynamic value */
	visibility: var(--thumb-visibility);

	appearance: none;
	border-radius: 10px;
	height: 11px;
	width: 11px;
	background: #FFF;
}
</style>
