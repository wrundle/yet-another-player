<script setup>
import { onMounted } from 'vue'

// FOR TESTING PURPOSES ONLY
// setInterval(() => {
// 	document.getElementById("progress-bar").value++;
// 	colorRangeSlider(document.getElementById("progress-bar"));
// }, 1000);

var isBeignHovered = false;

var colorRangeSlider = (slider) => {
	var color = isBeignHovered ? '#1DB954' : '#FFF'
	var value = (slider.value - slider.min) / (slider.max - slider.min) * 100
	slider.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' + color + ' ' + value + '%, #5E5E5E ' + value + '%, #5E5E5E 100%)'
}

onMounted(() => {
	colorRangeSlider(document.getElementById("progress-bar"))
	document.getElementById("progress-bar").oninput = function () {colorRangeSlider(this)};
	document.getElementById("progress-bar").onmouseenter = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this);
		document.getElementById("progress-bar").style.setProperty('--thumb-visibility', 'visible');
	};
	document.getElementById("progress-bar").onmouseleave = function () {
		isBeignHovered = !isBeignHovered;
		colorRangeSlider(this);
		document.getElementById("progress-bar").style.setProperty('--thumb-visibility', 'hidden');
	};
})
</script>


<template>
	<div class="flex-auto flex flex-row dark:text-stone-300">

		<div class="flex-auto">
			<span class="text-xs">0:00</span>
		</div>

		<div class="flex-auto w-full mx-2">
			<input
				type="range" min="0" max="100" value="0" step="1"
				id="progress-bar" name="progress-bar"
				class="p-0 h-[3px] w-full"
			/>
		</div>

		<div class="flex-auto">
			<span class="text-xs">3:35</span>
		</div>

	</div>
</template>


<style scoped>
#progress-bar {
	appearance: none;
	/* background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%); */
	border-radius: 8px;
	outline: none;
	transition: background 450ms ease-in;

	--thumb-visibility: hidden;
}

/* #progress-bar::-webkit-slider-runnable-track {

} */

#progress-bar::-webkit-slider-thumb {
	/* Fallback */
	visibility: hidden;
	/* Dynamic value */
	visibility: var(--thumb-visibility);

	appearance: none;
	/* border: solid; */
	border-radius: 10px;
	height: 10px;
	width: 10px;
	background: #FFF;
}
</style>
