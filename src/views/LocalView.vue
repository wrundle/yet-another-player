<script setup>
// @ is an alias to /src
import CurrentPlaylist from '@/components/CurrentPlaylist.vue';
import LeftColumn from '@/components/LeftColumn.vue';
import BottomBar from '@/components/BottomBar.vue';
import Loading from '@/components/Loading.vue';
import TopBar from '@/components/TopBar.vue';
import Main from '@/components/Main.vue';
</script>


<template>
	<div class="
		flex flex-col min-h-screen max-h-screen overflow-hidden
		bg-white dark:bg-stone-900 dark:text-white
	">

		<TopBar />

		<div class="flex-grow flex flex-row max-h-full overflow-hidden">

			<LeftColumn />

			<Suspense>
				<template #default><Main /></template>
				<template #fallback><Loading /></template>
			</Suspense>

			<CurrentPlaylist />

		</div>

		<BottomBar />

	</div>
</template>


<style scoped>
</style>
