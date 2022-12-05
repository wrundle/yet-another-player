<script setup>
import { colorRangeSlider } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { onMounted } from 'vue';


var isBeignHovered = false;

onMounted(() => {
	colorRangeSlider(document.getElementById("volume-bar"), isBeignHovered)
	document.getElementById("volume-bar").oninput = function () {colorRangeSlider(this, isBeignHovered)};
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

		<Icon
			id=""
			class="mr-2 text-stone-300 hover:text-white"
			icon="material-symbols:lyrics-outline"
			:inline="true"
		/>

		<Icon
			id=""
			class="ml-2 text-stone-300 hover:text-white"
			icon="material-symbols:volume-down-outline"
			:inline="true"
		/>

		<input
			id="volume-bar"
			type="range" min="0" max="100" value="0" step="1"
			name="volume-bar"
			class="mx-1 h-[4px] w-24"
		/>

		<router-link to="/theater" id="TheaterViewLink">
			<Icon
				class="ml-4 text-stone-300 hover:text-white"
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
