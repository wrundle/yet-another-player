<script setup>
import ControlButtons from '@/components/BottomBar/ControlButtons.vue';
import MiscButtons from '@/components/BottomBar/MiscButtons.vue';
import ProgressBar from '@/components/BottomBar/ProgressBar.vue';
import SongInfo from '@/components/BottomBar/SongInfo.vue';
</script>

<template>
	<div class="flex-initial flex flex-row dark:bg-stone-900 border-t dark:border-t-stone-700">
		<SongInfo />

		<div class="flex-auto w-3/7 py-5 flex flex-col place-content-center">
			<ControlButtons />
			<ProgressBar />
		</div>

		<MiscButtons />
	</div>
</template>
