<script setup>
import { removeSpaces, getImageSrcFromBuffer } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { onMounted } from 'vue';

const props = defineProps({
	songs: Array,
});

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
	<div
		class="
			p-4 mx-3 mb-3 rounded-md shadow-md flex flex-col place-items-center
			shadow-black/50 bg-stone-900 hover:bg-stone-800 transition-all duration-500
		"
	>
		<img
			:id="baseId + '-cover'"
			:src="require('@/assets/placeholder.jpg')"
			class="flex-initial w-max mb-3 aspect-square object-fill rounded-md"
		/>

		<div class="mb-3 w-full flex-initial font-semibold text-sm">
			{{ props.songs[0].album }}
		</div>

		<div class="w-full text-sm dark:text-stone-300">
			<span>
				{{ props.songs[0].year }}
			</span>

			<Icon
				icon="bi:dot"
				class="inline mx-1"
			/>

			<span>
				Album
			</span>
		</div>
	</div>
</template>
