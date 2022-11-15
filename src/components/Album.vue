<script setup>
import Song from './Song.vue'
</script>


<template>
	<div
		class="
			album
			px-10
		"
	>
		<Song />
		<Song />
		<Song />
	</div>
</template>


<style scoped>
.album {
	background: linear-gradient(to bottom, #231f1d 0%, transparent 100%);
}
</style>
