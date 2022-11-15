<script setup>
import { Icon } from "@iconify/vue";

// const showIconsOnHover = (event) => {
// 	console.log(event);
// }
</script>


<template>
	<div
		class="
			py-2 px-4
			flex flex-row
			dark:hover:bg-neutral-700
			rounded-md
		"
	>

		<span
			class="
				mr-4
				flex-initial flex place-items-center
				text-lg dark:text-stone-300
			"
		>
			2
		</span>

		<object
			type="image/jpeg"
			data="C:/Users/Zanda/Desktop/test2.jpg"
			class="
				flex-initial
				mr-4
				w-10 aspect-square object-contain
				dark:bg-stone-900
			"
		></object>

		<div class="flex-auto flex flex-col">

			<span
				class="
					flex-auto
					mb-1
					text-sm text-start font-bold dark:text-white
				"
			>Fur</span>

			<button
				class="
					flex-auto
					hover:underline
					text-xs
					dark:text-stone-300
					dark:hover:text-white
					text-start
				"
			>Helmut</button>

		</div>

		<span
			class="
				mr-4
				flex-grow flex place-items-center
				text-sm dark:text-stone-300
			"
		>
			album
		</span>

		<span
			class="
				mr-4
				flex-initial flex place-items-center
				text-lg dark:text-stone-300
			"
		>
			<Icon
				class="text-stone-300 text-base"
				icon="bi:suit-heart"
				:inline="true"
			/>
		</span>

		<span
			class="
				mr-4
				flex-initial flex place-items-center
				text-sm dark:text-stone-300
			"
		>
			00:00
		</span>

		<span
			class="
				mr-4
				flex-initial flex place-items-center
				text-lg dark:text-white
			"
		>
			<Icon
				class="text-stone-300 text-base"
				icon="bi:three-dots"
				:inline="true"
			/>
		</span>

	</div>
</template>


<style scoped>
</style>
