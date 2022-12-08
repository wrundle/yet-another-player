<script setup>
import { removeSpaces, normalizeDuration, getImageSrcFromBuffer } from '@/utilities/utilities.js'
import { ref, onMounted } from 'vue';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';


const props = defineProps({
	duration:	Number,
	artists:	Array,
	cover:		Uint8Array,
	track:		Object,
	album:		String,
	title:		String,
	year:		String,
	path:		String,
	id:			Number
});


const store = useStore();

const baseId = removeSpaces(props.artists[0]) + removeSpaces(props.album) + props.id + 'song';


const isCurrent = ref(false);
const isPlaying = ref(false);
const isBeingHoveredOver = ref(false);


const playBtnClick = function (event) {
	if (event) {
		if (isCurrent.value) window.songControls.togglePause()
		else {
			store.dispatch('setCurrentSong', props);
			store.dispatch('setCurrentPlaylist', store.state.songsByAlbum);
		};
	};
};
const pauseBtnClick = function (event) {
	if (event) window.songControls.togglePause();
};


const visibilityOn = () => {
	isBeingHoveredOver.value = true
	document.getElementById(baseId + '-btnHeart').classList.remove('invisible');
	document.getElementById(baseId + '-btnDots').classList.remove('invisible');
};
const visibilityOff = () => {
	isBeingHoveredOver.value = false
	document.getElementById(baseId + '-btnHeart').classList.add('invisible');
	document.getElementById(baseId + '-btnDots').classList.add('invisible');
};


const setActive = () => {
	isCurrent.value = true;
};
const unsetActive = () => {
	isCurrent.value = false;
	isPlaying.value = false;
	isBeingHoveredOver.value = false;
};


store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') mutation.payload.id == props.id ? setActive() : unsetActive();
	if (mutation.type === 'UPDATE_CURRENT_SONG_STATE' && state.currentSong.id == props.id) {
		isPlaying.value = mutation.payload.isPlaying;
	};
});


onMounted(() => {
	if (store.state.currentSong.id == props.id) {
		setActive();
		isPlaying.value = store.state.currentSongState.isPlaying;
	};

	if (!props.cover) return;

	getImageSrcFromBuffer(props.cover, (event) => {
		var image = document.getElementById(baseId + '-cover');
		image.src = event.target.result;
	});
});
</script>


<template>
	<div
		:id="baseId"
		@mouseenter="visibilityOn"
		@mouseleave="visibilityOff"
		class="
			song
			px-4 flex flex-row rounded-md select-none
			dark:hover:bg-neutral-700 dark:text-stone-300 dark:hover:text-white
		"
	>

		<span class="w-7 min-w-7 mr-4 flex-initial flex place-items-center text-lg justify-end">

			<span v-if="(!isCurrent && !isBeingHoveredOver)" :id="baseId + '-track'">{{ props.track.no }}</span>

			<span
				v-else-if="(isCurrent && !isBeingHoveredOver && !isPlaying)"
				:id="baseId + '-track'"
				class="text-green-500"
			>{{ props.track.no }}</span>

			<span v-else :id="baseId + '-btnPlay'">
				<Icon v-if="(isPlaying && isBeingHoveredOver)" @click="pauseBtnClick" icon="mdi:pause" />
				<Icon
					v-else-if="isPlaying"
					@click="pauseBtnClick"
					icon="mdi:pause"
					class="text-green-500 animate-pulse"
				/>
				<Icon v-else @click="playBtnClick" icon="mdi:play" />
			</span>

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
					{{ props.artists[0] }}
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
			{{ normalizeDuration(props.duration) }}
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
