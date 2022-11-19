<script setup>
import { removeSpaces } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { onMounted } from 'vue';
import Song from './Song.vue';


const props = defineProps({
	songs: Array,
	idx: Number
})


const baseId = removeSpaces(props.songs[0].artist) + removeSpaces(props.songs[0].album);


onMounted(() => {
	if (props.songs[0].images == []) return;
	var arrayBuffer = props.songs[0].images[0].data;
	var image = document.getElementById(baseId + '-cover');

	var bytes = new Uint8Array(arrayBuffer);
	var blob = new Blob([bytes.buffer]);

	var reader = new FileReader();
	reader.onload = function (e) {
		image.src = e.target.result;
	};
	reader.readAsDataURL(blob);
});
</script>


<template>
	<div
		class="
			album
			px-8 pb-8
			flex flex-col
			select-none
		"
	>

		<div class="flex-auto flex pb-5 pt-10">

			<img
				:id="baseId + '-cover'"
				class="flex-initial mr-5 aspect-square w-36 object-fill"
				:src="require('@/assets/placeholder.jpg')"
			/>

			<div class="flex-auto flex flex-col py-2">

				<div class="flex-initial text-2xl text-white font-extrabold mb-3">{{ props.songs[0].album }}</div>

				<div class="flex-initial text-sm dark:text-stone-300">

					<span>Album</span>
					<Icon class="inline mx-1" icon="bi:dot" />
					<span>{{ props.songs[0].year }}</span>
					<Icon class="inline mx-1" icon="bi:dot" />
					<span>{{ props.songs.length }} {{ props.songs.length > 1 ? "songs" : "song"}}</span>

				</div>

				<div class="flex-grow"></div>

				<div class="flex-initial flex place-items-center text-2xl">

					<Icon
						icon="bi:play-circle-fill"
						class="mr-4 text-4xl hover:scale-110 transition duration-200"
					/>

					<Icon
						icon="bi:suit-heart"
						class="mr-3 text-stone-300 hover:text-white"
					/>

					<Icon
						icon="bi:three-dots"
						class="mr-3 text-stone-300 hover:text-white"
					/>

				</div>

			</div>

		</div>

		<div
			class="
				px-4 mb-4
				flex-auto flex flex-row
				uppercase dark:text-stone-300
				border-b border-stone-600
			"
		>

			<span class="w-6 mr-4 flex-initial flex place-items-center text-lg justify-end">
				#
			</span>

			<span class="w-1/2 flex-initial flex place-items-center text-sm">
				<span class="dark:hover:text-white">Название</span>
			</span>

			<object
				type="image/jpeg"
				class="flex-initial mr-10 w-12 aspect-square object-scale-down invisible"
			></object>

			<span class="mr-4 w-1/2 flex-initial flex place-items-center text-sm">
				<span class="dark:hover:text-white">Альбом</span>
			</span>

			<span class="mr-8 flex-initial flex place-items-center invisible text-base">
				<Icon icon="bi:suit-heart" :inline="true" />
			</span>

			<span class="mr-3 w-20 justify-center text-base flex-initial flex place-items-center">
				<Icon class="dark:hover:text-white" icon="mdi:clock-time-three-outline" :inline="true" />
			</span>

			<span class="flex-initial flex place-items-center invisible">
				<Icon icon="bi:three-dots" :inline="true" />
			</span>

		</div>

		<div class="flex-auto flex flex-col">
			<div v-for="song in props.songs">
				<Song v-bind="song" />
			</div>
		</div>

	</div>
</template>


<style scoped>
.album {
	background: linear-gradient(to bottom, #231f1d 0%, transparent 50%);
}
</style>
