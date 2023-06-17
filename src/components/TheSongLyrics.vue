<script setup>
import axios, {isCancel, AxiosError} from 'axios';
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();

const lyrics = ref('')

const response = await axios({
	method: 'GET',
	baseURL: 'https://yet-another-player-lyrics-api.vercel.app/',
	url: 'lyrics',
	params: {
		'title': store.state.currentSong.artists[0] + ' ' + store.state.currentSong.title
	}
});

lyrics.value = response.data;
</script>

<template>
	<pre class="lyrics flex-grow w-4/6 max-h-full p-10 overflow-auto leading-relaxed text-xl">{{ lyrics }}</pre>
</template>

<style scoped>
.lyrics {
	overflow-y: overlay;
}

.lyrics::-webkit-scrollbar {
    width: 10px;
	height: 10px;
}

.lyrics::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
}

.lyrics::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>
