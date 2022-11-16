<script setup>
import * as Vibrant from 'node-vibrant';
import { onUpdated } from 'vue';
import { useStore } from 'vuex';


onUpdated(() => {
	Vibrant.from(document.getElementById('left-column-img').src)
		.getPalette()
		.then((palette) => {
			// console.log(palette.Vibrant.hex);
			document.getElementById("left-column").style.background = 'linear-gradient(to bottom, '+ palette.Vibrant.hex +' 0%, transparent 55%, #000 100%)';
		});
});


const store = useStore();

// store.dispatch('addToPlaylist', 1)

store.subscribe((mutation, state) => {
	console.log('тык');
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
