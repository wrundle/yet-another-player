<script setup>
import { removeSpaces } from '@/utilities/vue.js'
import { useStore } from 'vuex';


const props = defineProps({
	song: {
		duration:	Number,
		artists:	Array,
		cover:		Uint8Array,
		track:		Object,
		album:		String,
		title:		String,
		year:		String,
		path:		String,
		id:			Number
	},
	index: Number
});


const store = useStore();

const baseId = removeSpaces(props.song.artists[0]) + removeSpaces(props.song.album) + props.song.id + 'playlistEntry';


const setActive = () => {
	document.getElementById(baseId).scrollIntoView({ behavior: 'smooth', block: 'center' });
	document.getElementById(baseId).classList.add('dark:bg-stone-800', 'dark:text-white');
};
const unsetActive = () => {
	document.getElementById(baseId).classList.remove('dark:bg-stone-800', 'dark:text-white');
};


store.subscribe((mutation, state) => {
	if (mutation.type === 'UPDATE_CURRENT_SONG') mutation.payload.id == props.song.id ? setActive() : unsetActive();
});
</script>


<template>
	<div
		:id="baseId"
		class="
			flex flex-row px-2 py-0.5 text-sm max-w-full cursor-pointer
			dark:hover:bg-stone-800 dark:text-stone-300 dark:hover:text-white
		"
	>

		<span class="flex-initial flex mr-1">
			{{ ((props.index + 1) + '').length > 1 ? (props.index + 1) : '0' + (props.index + 1) }}.
		</span>

		<span class="flex-auto flex flex-col place-content-center place-items-start max-w-full overflow-hidden">

			<span class="flex-auto max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
				{{ props.song.title }}
			</span>

			<span class="flex-auto max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-xs dark:text-stone-400">
				{{ props.song.artists[0] }}
			</span>

		</span>

	</div>
</template>


<style scoped>
</style>
