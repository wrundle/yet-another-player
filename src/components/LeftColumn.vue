<script setup>
import * as Vibrant from 'node-vibrant';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';


const updateAccentColor = () => {
	Vibrant.from(document.getElementById('left-column-img').src)
		.getPalette()
		.then((palette) => console.log(palette.Vibrant.hex));
}


const store = useStore();

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') {
		var arrayBuffer = state.currentSong.images[0].data;
		var image = document.getElementById('left-column-img');

		var bytes = new Uint8Array(arrayBuffer);
		var blob = new Blob([bytes.buffer]);

		var reader = new FileReader();
		reader.onload = function (e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(blob);

		setTimeout(() => {
			updateAccentColor();
		}, 1000);
	};
});
</script>


<template>
	<div class="
		select-none
		flex-initial flex flex-col w-1/6 bg-gradient-to-t dark:from-black
		border-r dark:border-r-stone-800 dark:text-stone-400
	">

		<div class="flex-grow mt-4">

			<div class="pb-4 border-b dark:border-stone-700">

				<router-link to="/" id="LocalViewLink">
					<span class="
						flex place-items-center px-2 py-2 text-sm font-bold
						transition-colors ease-in-out duration-300
						dark:hover:text-white
					">
						<Icon icon="material-symbols:filter-1-sharp" class="mx-3 text-2xl" />
						Локальные файлы
					</span>
				</router-link>

				<router-link to="/ym" id="YandexMusicView">
					<span class="
						flex place-items-center px-2 py-2 text-sm font-bold
						transition-colors ease-in-out duration-300
						dark:hover:text-white
					">
						<Icon icon="material-symbols:filter-2-sharp" class="mx-3 text-2xl" />
						Яндекс Музыка
					</span>
				</router-link>

				<span class="
					flex place-items-center px-2 py-2 text-sm font-bold
					transition-colors ease-in-out duration-300
					dark:hover:text-white cursor-pointer
				">
					<Icon icon="mdi:magnify" class="mx-3 text-2xl" />
					Поиск
				</span>

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

		</div>

		<img
			id="left-column-img"
			class="flex-initial max-w-fill aspect-square object-cover"
			:src="require('@/assets/placeholder.jpg')"
		/>

	</div>
</template>


<style scoped>
</style>
