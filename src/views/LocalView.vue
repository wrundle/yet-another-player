<script setup>
import { useStore } from 'vuex';

// @ is an alias to /src
import songsByAlbum from '@/components/SongsByAlbum.vue';
import RightColumn from '@/components/RightColumn.vue';
import LeftColumn from '@/components/LeftColumn.vue';
import BottomBar from '@/components/BottomBar.vue';
import TopBar from '@/components/TopBar.vue';


const store = useStore();
</script>


<template>
	<div class="
		flex flex-col min-h-screen max-h-screen overflow-hidden
		bg-white dark:bg-stone-900 dark:text-white
	">

		<TopBar />

		<div class="flex-grow flex flex-row max-h-full overflow-hidden">

			<LeftColumn />

			<songsByAlbum />

			<RightColumn />

		</div>

		<BottomBar />

	</div>
</template>


<style scoped>
</style>
