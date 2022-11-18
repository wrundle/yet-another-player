<script setup>
import * as Vibrant from 'node-vibrant';
import { useStore } from 'vuex';


const updateGradient = () => {
	Vibrant.from(document.getElementById('left-column-img').src)
		.getPalette()
		.then((palette) => {
			// console.log(palette.Vibrant.hex);
			document.getElementById("left-column").style.background = 'linear-gradient(to bottom, '+ palette.Vibrant.hex +' 0%, transparent 45%, #000 100%)';
		});
}


const store = useStore();

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') {
		var arrayBuffer = state.currentSong.images[0].data;
		var image = document.getElementById('left-column-img');

		var bytes = new Uint8Array(arrayBuffer);
		var blob = new Blob([bytes.buffer]);

		var reader = new FileReader();
		reader.onload = function (e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(blob);

		setTimeout(() => {
			updateGradient();
		}, 1000);
	};
});
</script>


<template>
	<div id="left-column" class="flex-auto flex flex-col w-1/6 dark:bg-black border-r dark:border-r-stone-800">

		<img
			id="left-column-img"
			class="flex-initial max-w-fill aspect-square object-cover"
			:src="require('@/assets/placeholder.jpg')"
		/>

		<div class="flex-auto p-5 text-xs">

		</div>

	</div>
</template>


<style scoped>
#left-column {
	background: linear-gradient(to bottom, transparent 0%, #000 100%);
}
</style>
