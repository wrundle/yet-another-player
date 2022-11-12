<script setup>
import ProgressBar from './BottomBar/ProgressBar.vue'
import ControlButtons from './BottomBar/ControlButtons.vue'
import SongInfo from './BottomBar/SongInfo.vue'
import MiscButtons from './BottomBar/MiscButtons.vue'
</script>


<template>
	<!-- <h1>{{ msg }}</h1> -->

	<div class="flex flex-row dark:bg-stone-900 px-5 py-5 border border-t-stone-600 flex-initial">

		<SongInfo />

		<div class="flex-auto w-3/6 flex flex-col place-content-center">

			<ControlButtons />

			<ProgressBar />

		</div>

		<div class="flex-auto w-1/6 flex justify-end content-center">

			<MiscButtons />

		</div>

	</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
