<script setup>
// @ is an alias to /src
import LeftColumn from '@/components/LeftColumn.vue';
import BottomBar from '@/components/BottomBar.vue';
import Playlist from '@/components/Playlist.vue';
import Tabs from '@/components/Tabs.vue';
</script>


<template>

	<div
		class="
			app
			flex flex-col min-h-screen max-h-screen overflow-hidden
			bg-white dark:bg-stone-900 dark:text-white"
	>

		<div class="flex-grow flex flex-row max-h-full overflow-hidden">

			<LeftColumn />

			<div class="flex-auto w-5/6 flex flex-col max-h-full overflow-hidden">

				<Tabs />

				<div class="flex-auto flex flex-row max-h-full overflow-hidden">

					<Suspense>
						<router-view />
					</Suspense>

					<Playlist />

				</div>

			</div>

		</div>

		<BottomBar />

	</div>

</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

.app {
	font-family: 'IBM Plex Mono', monospace;
}
</style>
