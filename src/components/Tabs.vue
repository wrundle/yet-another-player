<script setup>
import { Icon } from "@iconify/vue";

var minimize = (event) => {if (event) {window.windowControls.minimize()}};
var maximize = (event) => {if (event) {window.windowControls.maximize()}};
var close = (event) => {if (event) {window.windowControls.close()}};
</script>


<template>
	<div class="draggable flex-initial border-b dark:border-stone-600 flex flex-row justify-between">

		<span class="flex text-sm text-center dark:text-stone-300">

			<router-link to="/" class="non-draggable">
				<span class="flex pt-4 pb-3 pr-4 dark:hover:text-white dark:hover:bg-stone-800">
					<Icon
						class="mx-2 text-stone-300 text-xl"
						icon="material-symbols:filter-1-sharp"
						:inline="true"
					/>
					Локальные файлы
				</span>
			</router-link>

			<router-link to="/ym" class="non-draggable">
				<span class="flex pt-4 pb-3 pr-4 dark:hover:text-white dark:hover:bg-stone-800">
					<Icon
						class="mx-2 text-stone-300 text-xl"
						icon="material-symbols:filter-2-sharp"
						:inline="true"
					/>
					Yandex Music
				</span>
			</router-link>

		</span>


		<span class="flex text-2xl text-center dark:text-stone-300">

			<button
				@click="minimize"
				class="non-draggable p-3 dark:hover:text-white dark:hover:bg-stone-800"
			>
				<Icon
					icon="mdi:window-minimize"
					:inline="true"
				/>
			</button>

			<button
				@click="maximize"
				class="non-draggable p-3 dark:hover:text-white dark:hover:bg-stone-800"
			>
				<Icon
					icon="mdi:window-maximize"
					:inline="true"
				/>
			</button>

			<button
				@click="close"
				class="non-draggable p-3 dark:hover:text-white dark:hover:bg-rose-600"
			>
				<Icon
					icon="mdi:window-close"
					:inline="true"
				/>
			</button>

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
