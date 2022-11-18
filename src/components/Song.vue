<script setup>
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


onMounted(() => {
	var arrayBuffer = props.images[0].data;
	var image = document.getElementById(props.album + props.title + '-cover');

	var bytes = new Uint8Array(arrayBuffer);
	var blob = new Blob([bytes.buffer]);

	var reader = new FileReader();
	reader.onload = function (e) {
		image.src = e.target.result;
	};
	reader.readAsDataURL(blob);

	var song = document.getElementById(props.album + props.title + '-song');
	song.onmouseenter = function () {
		document.getElementById(props.album + props.title + '-track').classList.toggle('hidden');
		document.getElementById(props.album + props.title + '-btnPlay').classList.toggle('hidden');
		document.getElementById(props.album + props.title + '-btnHeart').classList.toggle('invisible');
		document.getElementById(props.album + props.title + '-btnDots').classList.toggle('invisible');
	}
	song.onmouseleave = function () {
		document.getElementById(props.album + props.title + '-track').classList.toggle('hidden');
		document.getElementById(props.album + props.title + '-btnPlay').classList.toggle('hidden');
		document.getElementById(props.album + props.title + '-btnHeart').classList.toggle('invisible');
		document.getElementById(props.album + props.title + '-btnDots').classList.toggle('invisible');
	}
});


const normalizeTrack = (track) => Number(track.split('/')[0]);

const store = useStore();

const playSong = function (event) {
	if (event) {
		store.dispatch('setCurrentSong', props)
	};
};
</script>


<template>
	<div
		:id="props.album + props.title + '-song'"
		class="
			song
			px-4
			flex flex-row
			dark:hover:bg-neutral-700 dark:text-stone-300 dark:hover:text-white
			rounded-md
			select-none
		"
	>

		<span class="w-6 mr-4 flex-initial flex place-items-center text-lg justify-end">
			<span :id="props.album + props.title + '-track'">{{ normalizeTrack(props.track) }}</span>
			<span :id="props.album + props.title + '-btnPlay'" class="text-xl hidden">
				<Icon
					@click="playSong"
					icon="mdi:play"
					:inline="true"
				/>
			</span>
		</span>

		<img
			:id="props.album + props.title + '-cover'"
			class="flex-initial mr-4 w-10 aspect-square object-scale-down"
			:src="require('@/assets/placeholder.jpg')"
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
				:id="props.album + props.title + '-btnHeart'"
				class="text-stone-300 dark:hover:text-white text-base invisible"
				icon="bi:suit-heart"
				:inline="true"
			/>
		</span>

		<span class="mr-3 w-20 justify-center text-sm flex-initial flex place-items-center">
			{{ props.duration }}
		</span>

		<span class="text-base flex-initial flex place-items-center">
			<Icon
				:id="props.album + props.title + '-btnDots'"
				class="dark:text-white text-base invisible"
				icon="bi:three-dots"
				:inline="true"
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
