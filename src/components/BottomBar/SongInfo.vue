<script setup>
import { isObjectEmpty, getImageSrcFromBuffer } from '@/utilities/utilities.js'
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import { ref } from 'vue';


const setCoverView = function (param) {
	store.dispatch('setCoverView', param);
}

const songTitle = ref('');
const songArtists = ref('');

const store = useStore();

const init = () => {
	if (isObjectEmpty(store.state.currentSong)) return;
	songTitle.value = store.state.currentSong.title;
	songArtists.value = store.state.currentSong.artists[0];

	if (!store.state.currentSong.cover || store.state.settings.coverView) return;
	getImageSrcFromBuffer(store.state.currentSong.cover, (event) => {
		var image = document.getElementById('song-info-img');
		image.src = event.target.result;
	});
};

init();

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG' || mutation.type === 'UPDATE_COVER_VIEW') {
		init();
	};
});
</script>


<template>
	<div class="flex-1 ml-3 w-2/7 flex flex-row max-w-full overflow-hidden">

		<Transition name="slide-fade">
			<div
				v-if="!store.state.settings.coverView"
				id="song-info-img-wrapper"
				class="flex-initial flex w-16 relative"
			>

				<img v-if="store.state.currentSong.cover" id="song-info-img" class="w-max aspect-square object-contain" />

				<button
					@click="setCoverView(true)"
					id="song-info-img-btn"
					class="
						absolute top-4 right-0 mr-1 mt-1 text-2xl rounded-full
						hover:scale-110 hover:text-white transition duration-100
					"
				><Icon icon="material-symbols:keyboard-arrow-up-rounded" /></button>

			</div>
		</Transition>

		<div class="ml-3 flex flex-col place-content-center place-items-start max-w-full overflow-hidden">

			<button
				class="
					max-w-full overflow-hidden whitespace-nowrap text-ellipsis
					flex-initial
					hover:underline
					text-sm
					font-bold
					dark:text-white
				"
			>{{ songTitle }}</button>

			<button
				class="
					max-w-full overflow-hidden whitespace-nowrap text-ellipsis
					flex-initial
					hover:underline
					text-xs
					dark:text-stone-300
					dark:hover:text-white
				"
			>{{ songArtists }}</button>

		</div>

		<div v-if="store.state.currentSong.title" class="flex ml-7 place-items-center">

			<Icon icon="bi:suit-heart" class="text-stone-300 dark:hover:text-white" />

		</div>

	</div>
</template>


<style scoped>
#song-info-img-wrapper:hover #song-info-img-btn {
	opacity: 100;
}

#song-info-img-btn {
	opacity: 0;
	background: rgba(0, 0, 0, 0.7);
}

#song-info-img-btn:hover {
	background: rgba(0, 0, 0, 0.8);
}

.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
