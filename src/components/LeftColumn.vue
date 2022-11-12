<script setup>
import * as Vibrant from 'node-vibrant';
import { onMounted } from 'vue'

onMounted(() => {
	Vibrant.from("C:/Users/Zanda/Desktop/test2.jpg")
		.getPalette()
		.then((palette) => {
			// console.log(palette.Vibrant.hex);
			document.getElementById("left-column").style.background = 'linear-gradient(to bottom, '+ palette.Vibrant.hex +' 0%, transparent 55%, #000 100%)';
		})
});
</script>


<template>
	<div id="left-column" class="flex-auto flex flex-col w-1/5 dark:bg-black border-r dark:border-r-stone-600">

		<object
			type="image/jpeg"
			data="C:/Users/Zanda/Desktop/test2.jpg"
			class="flex-initial aspect-square max-w-fill object-cover dark:bg-stone-900"
		></object>

		<div class="flex-auto text-center p-5 text-xs">
			lyrics
		</div>

	</div>
</template>


<style scoped>
#left-column {
	background: linear-gradient(to bottom, transparent 0%, #000 100%);
}
</style>
