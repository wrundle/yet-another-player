<script setup>
import { removeSpaces, getImageSrcFromBuffer } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { onMounted } from 'vue';


const props = defineProps({ songs: Array });


const baseId = removeSpaces(props.songs[0].artists[0]) + removeSpaces(props.songs[0].album) + 'AlbumThumbnail';


onMounted(() => {
	if (!props.songs[0].cover) return;

	getImageSrcFromBuffer(props.songs[0].cover, (event) => {
		var image = document.getElementById(baseId + '-cover');
		image.src = event.target.result;
	});
});
</script>


<template>
	<div>
		<img
			:id="baseId + '-cover'"
			class="flex-initial mr-5 aspect-square w-36 object-fill"
			:src="require('@/assets/placeholder.jpg')"
		/>
	</div>
</template>


<style scoped>
</style>
