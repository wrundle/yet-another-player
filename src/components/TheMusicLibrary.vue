<script setup>
import AlbumDetails from '@/components/MusicLibrary/AlbumDetails.vue';
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import { ref } from "vue";


const store = useStore();

const view = ref(true);


const selectFolder = (event) => {if (event) {window.fileHandling.addFolder()}};

function setView(param) {
	view.value = param;
};


await store.dispatch('fetchSongs');

const songsByAlbum = ref(store.state.songsByAlbum);
const albums = ref(store.state.albums);
</script>


<template>
	<div class="main flex-grow w-4/6 flex flex-col max-h-full overflow-auto select-none">

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
					@click=""
					class="
						flex place-items-center text-sm cursor-pointer
						dark:text-stone-300 dark:hover:text-white
					"
				>
					<span clas="p-2">По альбому</span>
					<Icon icon="mdi:triangle-small-down" class="flex text-2xl" />
				</span>

				<button
					@click="setView(true)"
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon icon="mdi:view-list" />
				</button>

				<button
					@click="setView(false)"
					class="
						p-2 text-xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon icon="mdi:view-grid" />
				</button>

				<button
					@click=""
					class="
						p-1 text-2xl
						dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white rounded-full
					"
				>
					<Icon icon="material-symbols:settings-outline-rounded" />
				</button>

			</span>

		</div>

		<div v-if="view" class="flex-auto">
			<div v-for="(album, index) in albums">
				<AlbumDetails :songs="songsByAlbum[albums[index]]" />
			</div>
		</div>

	</div>
</template>


<style scoped>
.main {
	overflow-y: overlay;
}

.main::-webkit-scrollbar {
    width: 10px;
}

.main::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.main::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>
