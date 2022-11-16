<script setup>
import { Icon } from "@iconify/vue";
import Song from './Song.vue'
</script>


<template>
	<div
		class="
			album
			px-8 pb-8
			flex flex-col
			select-none
		"
	>

		<div class="flex-auto flex pb-5 pt-10">

			<object
				type="image/jpeg"
				data="C:/Users/Zanda/Desktop/test2.jpg"
				class="flex-initial mr-5 aspect-square w-36 object-scale-down dark:bg-stone-900"
			></object>

			<div class="flex-auto py-2">
				<div class="text-2xl text-white font-extrabold mb-3">Our Walls</div>
				<div class="text-sm dark:text-stone-300">
					<span>EP</span>
					<Icon class="inline mx-1" icon="bi:dot" />
					<span>2019</span>
					<Icon class="inline mx-1" icon="bi:dot" />
					<span>5 songs</span>
				</div>
			</div>

		</div>

		<div
			class="
				px-4 mb-4
				flex-auto flex flex-row
				uppercase dark:text-stone-300
				border-b border-stone-600
			"
		>

			<span class="mr-4 flex-initial flex place-items-center text-lg">
				#
			</span>

			<span class="w-1/2 flex-initial flex place-items-center text-sm">
				<span class="dark:hover:text-white">Название</span>
			</span>

			<object
				type="image/jpeg"
				class="flex-initial mr-5 w-12 aspect-square object-scale-down invisible"
			></object>

			<span class="mr-4 w-1/2 flex-initial flex place-items-center text-sm">
				<span class="dark:hover:text-white">Альбом</span>
			</span>

			<span class="mr-8 flex-initial flex place-items-center invisible text-base">
				<Icon icon="bi:suit-heart" :inline="true" />
			</span>

			<span class="mr-3 w-20 justify-center text-base flex-initial flex place-items-center">
				<Icon class="dark:hover:text-white" icon="mdi:clock-time-three-outline" :inline="true" />
			</span>

			<span class="flex-initial flex place-items-center invisible">
				<Icon icon="bi:three-dots" :inline="true" />
			</span>

		</div>

		<div class="flex-auto flex flex-col">
			<Song />
			<Song />
			<Song />
		</div>

	</div>
</template>


<style scoped>
.album {
	background: linear-gradient(to bottom, #231f1d 0%, transparent 50%);
}
</style>
