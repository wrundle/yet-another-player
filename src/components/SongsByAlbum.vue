<script setup>
import Album from '@/components/Album.vue';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import { ref } from "vue";


var selectFolder = (event) => {if (event) {window.fileHandling.addFolder()}};

const store = useStore();
const songs = ref([]);
const songsByAlbum = ref({});
const albums = ref([]);

const updateSongs = () => {
	songs.value = store.state.songs;
	songsByAlbum.value = songs.value.reduce((acc, song) => {
		const { album } = song;
		acc[album] = acc[album] ?? [];
		acc[album].push(song);
		return acc;
	}, {});
	albums.value = Object.keys(songsByAlbum.value).sort();
};

updateSongs();

store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_SONGS') {
		updateSongs();
	}
});
</script>


<template>
	<div class="local-view flex-grow w-4/6 flex flex-col max-h-full overflow-auto">

		<div class="flex flex-row justify-between p-1">

			<span class="flex">
				<button
					@click="selectFolder"
					class="p-2 text-sm dark:text-stone-300 italic dark:hover:text-white"
				>
					+ добавить директорию...
				</button>
			</span>

			<span class="flex">

				<button
					@click=""
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon
						icon="mdi:view-list"
						:inline="true"
					/>
				</button>

				<button
					@click=""
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon
						icon="mdi:view-grid"
						:inline="true"
					/>
				</button>

				<button
					@click=""
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon
						icon="material-symbols:settings-outline-rounded"
						:inline="true"
					/>
				</button>

			</span>

		</div>

		<div class="flex-auto">
			<div v-for="(album, index) in albums">
				<Album :songs="songsByAlbum[albums[index]]" />
			</div>
		</div>

	</div>
</template>


<style scoped>
.local-view::-webkit-scrollbar {
    width: 13px;
}

.local-view::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.local-view::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>
