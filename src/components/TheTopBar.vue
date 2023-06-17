<script setup>
import { Icon } from "@iconify/vue";

const minimize = (event) => {if (event) {window.windowControls.minimize()}};
const maximize = (event) => {if (event) {window.windowControls.maximize()}};
const close = (event) => {if (event) {window.windowControls.close()}};
</script>

<template>
	<div class="draggable flex-initial flex flex-row justify-between text-xl border-b dark:border-stone-700">
		<span class="non-draggable flex p-3 mx-3">
			<Icon icon="bi:three-dots" />
		</span>

		<span class="non-draggable flex text-center dark:text-stone-300">
			<span class="p-3 dark:hover:text-white dark:hover:bg-stone-800" @click="minimize">
				<Icon icon="mdi:window-minimize" />
			</span>

			<span class="p-3 dark:hover:text-white dark:hover:bg-stone-800" @click="maximize">
				<Icon icon="mdi:window-maximize" />
			</span>

			<span class="p-3 dark:hover:text-white dark:hover:bg-rose-600" @click="close">
				<Icon icon="mdi:window-close" />
			</span>
		</span>
	</div>
</template>

<style scoped>
.draggable {
	user-select: none;
	-webkit-user-select: none;
	-webkit-app-region: drag;
}

.non-draggable {
	-webkit-app-region: no-drag;
}
</style>
