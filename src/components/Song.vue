<script setup>
import { removeSpaces } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { onMounted } from 'vue';
import { useStore } from 'vuex';


const props = defineProps({
	album: String,
	artist: String,
	duration: Number,
	images: Array,
	path: String,
	title: String,
	track: String,
	year: String
});


const baseId = removeSpaces(props.artist) + removeSpaces(props.album) + removeSpaces(props.title);
const toggleVisibility = () => {
	document.getElementById(baseId + '-track').classList.toggle('hidden');
	document.getElementById(baseId + '-btnPlay').classList.toggle('hidden');
	document.getElementById(baseId + '-btnHeart').classList.toggle('invisible');
	document.getElementById(baseId + '-btnDots').classList.toggle('invisible');
};


const store = useStore();
const setCurrentSong = function (event) {
	if (event) {
		store.dispatch('setCurrentSong', props)
	};
};


const normalizeTrack = (track) => Number(track.split('/')[0]);


onMounted(() => {
	var arrayBuffer = props.images[0].data;
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
		:id="baseId"
		@mouseenter="toggleVisibility"
		@mouseleave="toggleVisibility"
		class="
			song
			px-4 flex flex-row rounded-md select-none
			dark:hover:bg-neutral-700 dark:text-stone-300 dark:hover:text-white
		"
	>

		<span class="w-6 mr-4 flex-initial flex place-items-center text-lg justify-end">
			<span :id="baseId + '-track'">{{ normalizeTrack(props.track) }}</span>
			<Icon
				:id="baseId + '-btnPlay'"
				@click="setCurrentSong"
				icon="mdi:play"
				class="text-xl hidden"
			/>
		</span>

		<img
			:id="baseId + '-cover'"
			:src="require('@/assets/placeholder.jpg')"
			class="flex-initial mr-4 w-10 aspect-square object-scale-down"
		/>

		<div class="py-2 flex-initial flex flex-col w-1/2">
			<span class="flex-auto mb-1 text-sm text-start font-medium dark:text-white">
				{{ props.title }}
			</span>
			<span class="flex-auto text-xs text-start">
				<span class="dark:hover:text-white hover:underline cursor-pointer">
					{{ props.artist }}
				</span>
			</span>
		</div>

		<span class="mr-4 w-1/2 flex-initial flex place-items-center text-sm">
			<span class="dark:hover:text-white hover:underline cursor-pointer">
				{{ props.album }}
			</span>
		</span>

		<span class="mr-3 flex-initial flex place-items-center">
			<Icon
				:id="baseId + '-btnHeart'"
				icon="bi:suit-heart"
				class="text-base invisible text-stone-300 dark:hover:text-white"
			/>
		</span>

		<span class="mr-3 w-20 justify-center text-sm flex-initial flex place-items-center">
			{{ props.duration }}
		</span>

		<span class="text-base flex-initial flex place-items-center">
			<Icon
				:id="baseId + '-btnDots'"
				icon="bi:three-dots"
				class="text-base invisible dark:text-white"
			/>
		</span>

	</div>
</template>


<style scoped>
.song {
	transition: transform .1s ease-in-out;
}

.song:hover {
	transform: scale(1.01);
}
</style>
