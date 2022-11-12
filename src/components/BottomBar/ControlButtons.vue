<script setup>
import { Icon } from "@iconify/vue";
</script>


<template>
	<div class="flex-auto flex flex-row place-content-center place-items-center text-2xl">

		<Icon
			id="previous-button"
			class="mx-2 text-stone-300 hover:text-white"
			icon="bi:skip-start-fill"
			:inline="true"
		/>

		<Icon
			id="play-button"
			class="mx-2 text-3xl hover:scale-110"
			icon="bi:play-circle-fill"
			:inline="true"
		/>

		<Icon
			id="pause-button"
			class="mx-2 text-3xl hover:scale-110 hidden"
			icon="bi:pause-circle-fill"
			:inline="true"
		/>

		<Icon
			id="next-button"
			class="mx-2 text-stone-300 hover:text-white"
			icon="bi:skip-end-fill"
			:inline="true"
		/>

	</div>
</template>


<style scoped>
</style>
