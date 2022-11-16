<script setup>
import { Icon } from "@iconify/vue";

// const showIconsOnHover = (event) => {
// 	console.log(event);
// }
</script>


<template>
	<div
		class="
			song
			px-4
			flex flex-row
			dark:hover:bg-neutral-700 dark:text-stone-300 dark:hover:text-white
			rounded-md
			select-none
		"
	>

		<span class="mr-4 flex-initial flex place-items-center text-lg">
			2
		</span>

		<slot>
			<object
				type="image/jpeg"
				data="C:/Users/Zanda/Desktop/test2.jpg"
				class="flex-initial mr-4 w-10 aspect-square object-scale-down"
			/>
		</slot>

		<div class="py-2 flex-initial flex flex-col w-1/2">
			<span class="flex-auto mb-1 text-sm text-start font-semibold dark:text-white">
				Fur
			</span>

			<span class="flex-auto text-xs text-start">
				<span class="dark:hover:text-white hover:underline cursor-pointer">
					<slot>
						Artist
					</slot>
				</span>
			</span>
		</div>

		<span class="mr-4 w-1/2 flex-initial flex place-items-center text-sm">
			<span class="dark:hover:text-white hover:underline cursor-pointer">
				<slot>
					Album
				</slot>
			</span>
		</span>

		<span class="mr-8 flex-initial flex place-items-center">
			<Icon
				class="text-stone-300 dark:hover:text-white text-base"
				icon="bi:suit-heart"
				:inline="true"
			/>
		</span>

		<span class="mr-3 w-20 justify-center text-sm flex-initial flex place-items-center">
			00:00
		</span>

		<span class="text-base flex-initial flex place-items-center">
			<Icon
				class="dark:text-white text-base"
				icon="bi:three-dots"
				:inline="true"
			/>
		</span>

	</div>
</template>


<style scoped>
.song {
	transition: transform .1s ease-in-out;
}

.song:hover {
	transform: scale(1.01);
}
</style>
