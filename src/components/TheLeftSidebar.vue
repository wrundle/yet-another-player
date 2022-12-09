<script setup>
import { isObjectEmpty, getImageSrcFromBuffer } from '@/utilities/utilities.js'
import * as Vibrant from 'node-vibrant';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';


const setCoverView = function (param) {
	store.dispatch('setCoverView', param);
}

const store = useStore();

const init = () => {
	if (isObjectEmpty(store.state.currentSong) || !store.state.currentSong.cover || !store.state.settings.coverView) return;

	getImageSrcFromBuffer(store.state.currentSong.cover, (event) => {
		var image = document.getElementById('left-sidebar-img');
		image.src = event.target.result;
		Vibrant.from(event.target.result).getPalette()
			.then((result) => {
				const rgb = result.Vibrant.rgb
				image.style.boxShadow = `0px 0px 10px 10px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`
			});
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
	<div class="
		flex-initial flex flex-col w-1/6 max-h-full overflow-hidden select-none
		dark:text-stone-400 border-r dark:border-r-stone-800 bg-gradient-to-t dark:from-black
	">

		<div class="flex-grow mt-4 max-h-full overflow-hidden">

			<div class="pb-4 border-b dark:border-stone-700">

				<router-link to="/" id="MainViewLink">
					<span class="
						flex place-items-center px-2 py-2 text-sm font-bold
						transition-colors ease-in-out duration-300
						dark:hover:text-white
					">
						<Icon icon="mdi:home" class="mx-3 text-2xl" />
						Локальные Файлы
					</span>
				</router-link>

				<router-link to="/search" id="SearchViewLink">
					<span class="
						flex place-items-center px-2 py-2 text-sm font-bold
						transition-colors ease-in-out duration-300
						dark:hover:text-white
					">
						<Icon icon="mdi:magnify" class="mx-3 text-2xl" />
						Поиск
					</span>
				</router-link>

				<div class="h-5"></div>

				<span class="
					flex place-items-center px-2 py-2 text-sm font-bold
					transition-colors ease-in-out duration-300
					dark:hover:text-white cursor-pointer
				">
					<Icon icon="mdi:plus-box" class="mx-3 text-2xl" />
					Создать плейлист
				</span>

				<span class="
					flex place-items-center px-2 py-2 text-sm font-bold
					transition-colors ease-in-out duration-300
					dark:hover:text-white cursor-pointer
				">
					<Icon
						icon="material-symbols:favorite"
						class="
							mx-3 p-0.5 text-2xl rounded-sm
							text-white bg-gradient-to-tl from-sky-50 to-indigo-600
						"
					/>
					Избранное
				</span>

			</div>

			<div class="flex-auto max-h-full overflow-hidden py-2 px-3">
				<div class="py-1">Плейлист #1</div>
				<div class="py-1">Плейлист #2</div>
			</div>

		</div>

		<Transition name="slide-fade">
			<div
				v-if="store.state.settings.coverView"
				id="left-sidebar-img-wrapper"
				class="flex-initial max-w-fill aspect-square object-cover relative"
			>

				<img id="left-sidebar-img" class="w-max aspect-square object-cover" />

				<button
					@click="setCoverView(false)"
					id="left-sidebar-img-btn"
					class="
						absolute top-0 right-0 mr-2 mt-2 text-2xl rounded-full
						hover:scale-110 hover:text-white transition duration-100
					"
				>
					<Icon icon="material-symbols:keyboard-arrow-down-rounded" />
				</button>

			</div>
		</Transition>

	</div>
</template>


<style scoped>
#left-sidebar-img-wrapper {
	box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.3);
	/* -webkit-transition : all ease-in-out 5s;
	transition : all ease-in-out 5s; */
}

#left-sidebar-img-wrapper:hover #left-sidebar-img-btn {
	opacity: 100;
}

#left-sidebar-img-btn {
	opacity: 0;
	background: rgba(0, 0, 0, 0.7);
}

#left-sidebar-img-btn:hover {
	background: rgba(0, 0, 0, 0.8);
}

.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
  /* opacity: 0; */
}
</style>
