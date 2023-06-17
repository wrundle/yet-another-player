<script setup>
import AlbumThumbnail from '@/components/MusicLibrary/AlbumThumbnail.vue';
import AlbumDetails from '@/components/MusicLibrary/AlbumDetails.vue';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import { ref } from "vue";

const store = useStore();

await store.dispatch('fetchSongs');
await store.dispatch('fetchSettings');

const albums = ref(store.state.albums);
const songsByAlbum = ref(store.state.songsByAlbum);
const albumsView = ref(store.state.settings.albumsView);

const selectFolder = event => {if (event) {window.folderHandling.addFolder()}};

function setAlbumsView(param) {
	window.settings.setAlbumsView(param);
	albumsView.value = param;
};

function openSettings() {
	store.dispatch('setModal', 1);
}
</script>

<template>
	<div class="music-library flex-grow w-4/6 flex flex-col max-h-full overflow-auto select-none">
		<div class="flex flex-row justify-between px-3">
			<span class="flex">
				<button
					@click="selectFolder"
					class="p-2 text-sm italic dark:text-stone-300 dark:hover:text-white"
				>
					+ добавить директории...
				</button>
			</span>

			<span class="flex">
				<span
					class="
						flex place-items-center text-sm cursor-pointer
						dark:text-stone-300 dark:hover:text-white
					"
				>
					<span clas="p-2">
						По альбому
					</span>

					<Icon
						icon="mdi:triangle-small-down"
						class="flex text-2xl"
					/>
				</span>

				<button
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
					@click="setAlbumsView(true)"
				>
					<Icon icon="mdi:view-list" />
				</button>

				<button
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
					@click="setAlbumsView(false)"
				>
					<Icon icon="mdi:view-grid" />
				</button>

				<button
					class="
						p-1 text-2xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
					@click="openSettings"
				>
					<Icon icon="material-symbols:settings-outline-rounded" />
				</button>
			</span>
		</div>

		<div
			v-if="albumsView"
			class="flex-auto"
		>
			<div
				v-for="(album, index) in albums"
				:key="index"
			>
				<AlbumDetails :songs="songsByAlbum[albums[index]]" />
			</div>
		</div>

		<div
			v-else
			class="flex-auto"
		>
			<div class="album-thumbnails grid grid-cols-4 pt-6 px-3">
				<div
					v-for="(album, index) in albums"
					:key="index"
				>
					<AlbumThumbnail :songs="songsByAlbum[albums[index]]" />
				</div>
			</div>
		</div>

	</div>
</template>

<style scoped>
.music-library {
	overflow-y: overlay;
}

.music-library::-webkit-scrollbar {
    width: 10px;
}

.music-library::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.music-library::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}

.album-thumbnails {
	background: linear-gradient(to bottom, #231f1d 0%, transparent 50%);
}
</style>
