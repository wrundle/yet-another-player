<script setup>
// @ is an alias to /src
import TheRightSidebar from '@/components/TheRightSidebar.vue';
import TheLeftSidebar from '@/components/TheLeftSidebar.vue';
import TheBottomBar from '@/components/TheBottomBar.vue';
import LoadingMsg from '@/components/TheLoadingMsg.vue';
import TheTopBar from '@/components/TheTopBar.vue';
</script>


<template>
	<div class="
		flex flex-col min-h-screen max-h-screen overflow-hidden
		bg-white dark:bg-stone-900 dark:text-white
	">


		<div class="flex-grow flex flex-row max-h-full overflow-hidden"></div>

		<TheBottomBar />

	</div>
</template>


<style scoped>
</style>
