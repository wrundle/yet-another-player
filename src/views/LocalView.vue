<script setup>
import Album from '@/components/Album.vue';
import { Icon } from "@iconify/vue";


var pickFolder = (event) => {if (event) {window.fileHandling.addFolder()}};

var localLibrary;
const updateLocalLibrary = async () => {localLibrary = await window.fileHandling.readFolders};
await updateLocalLibrary();
window.fileHandling.settingsHaveBeenUpdated(async (event, data) => {
	console.log('settingsHaveBeenUpdated');
	await updateLocalLibrary();
});

const songsByAlbum = localLibrary.reduce((acc, song) => {
	const { album } = song;
	acc[album] = acc[album] ?? [];
	acc[album].push(song);
	return acc;
}, {});
const albums = Object.keys(songsByAlbum).sort();
</script>


<template>
	<div class="local-view flex-auto w-4/5 flex flex-col max-h-full overflow-auto">

		<div class="flex flex-row justify-between">

			<span class="flex">
				<button
					@click="pickFolder"
					class="p-3 text-sm dark:text-stone-300 italic dark:hover:text-white"
				>
					+ добавить директорию...
				</button>
			</span>

			<span class="flex">
				<button
					@click=""
					class="p-3 text-2xl dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full"
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
				<Album :songs="songsByAlbum[albums[index]]" :idx="index" />
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
