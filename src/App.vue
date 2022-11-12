<script setup>
// @ is an alias to /src
import BottomBar from '@/components/BottomBar.vue'
import LeftColumn from '@/components/LeftColumn.vue'
</script>

<!-- <router-view /> -->

<template>
	<div class="app bg-white dark:bg-stone-900 dark:text-white flex flex-col min-h-screen max-h-screen">

		<div class="flex-grow flex flex-row">

			<LeftColumn />

			<div class="flex-auto w-3/4">
				<nav>
					<router-link to="/">Local</router-link> |
					<router-link to="/about">Yandex Music</router-link>
				</nav>
				<button id="test" />
				<p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p>
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
