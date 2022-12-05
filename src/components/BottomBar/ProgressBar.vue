<script setup>
import { normalizeDuration, colorRangeSlider } from '@/utilities/utilities.js'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';


const isLoading = ref(false);
const isPlaying = ref(false);

const elapsedTimeInSeconds = ref(0);
const elapsedTimeString = ref(normalizeDuration(0));

const songDurationInSeconds = ref(0);
const songDurationString = ref(normalizeDuration(0));


const store = useStore();
store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') {
		elapsedTimeInSeconds.value = 0;
		elapsedTimeString.value = normalizeDuration(elapsedTimeInSeconds.value);
		songDurationInSeconds.value = state.currentSong.duration;
		songDurationString.value = normalizeDuration(songDurationInSeconds.value);
	};
	if (mutation.type === 'UPDATE_CURRENT_SONG_STATE') {
		isLoading.value = mutation.payload.isLoading;
		isPlaying.value = mutation.payload.isPlaying;
	};
});


setInterval(() => {
	if (!isPlaying.value) {
		return;
	};
	elapsedTimeInSeconds.value += 1;
	elapsedTimeString.value = normalizeDuration(elapsedTimeInSeconds.value);
	const percentage = Math.round(elapsedTimeInSeconds.value / songDurationInSeconds.value * 100);
	document.getElementById("progress-bar").value = percentage;
	colorRangeSlider(document.getElementById("progress-bar"));
}, 1000);


var isBeignHovered = false;

onMounted(() => {
	colorRangeSlider(document.getElementById("progress-bar"), isBeignHovered)
	document.getElementById("progress-bar").oninput = function () {colorRangeSlider(this, isBeignHovered)};
	document.getElementById("progress-bar").onmouseenter = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this, isBeignHovered);
		document.getElementById("progress-bar").style.setProperty('--thumb-visibility', 'visible');
	};
	document.getElementById("progress-bar").onmouseleave = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this, isBeignHovered);
		document.getElementById("progress-bar").style.setProperty('--thumb-visibility', 'hidden');
	};
});
</script>


<template>
	<div class="flex-auto flex flex-row dark:text-stone-300">

		<div class="flex-auto select-none">
			<span class="text-xs">{{ elapsedTimeString }}</span>
		</div>

		<div class="flex-auto w-full mx-2">
			<input
				id="progress-bar"
				type="range" min="0" max="100" value="0" step="1"
				name="progress-bar"
				class="h-[4px] w-full"
			/>
		</div>

		<div class="flex-auto select-none">
			<span class="text-xs">{{ songDurationString }}</span>
		</div>

	</div>
</template>


<style scoped>
#progress-bar {
	appearance: none;
	border-radius: 8px;
	outline: none;
	transition: background 450ms ease-in;
	--thumb-visibility: hidden;
}

#progress-bar::-webkit-slider-thumb {
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
