<script setup>
import { Icon } from "@iconify/vue";
</script>


<template>
	<nav class="border-b dark:border-stone-600">

		<ul class="flex-auto flex text-sm text-center dark:text-stone-300">

			<li id="" class="dark:hover:text-white dark:hover:bg-stone-800">
				<router-link to="/">
					<span class="flex pt-4 pb-3 pr-4">
						<Icon
							id="previous-button"
							class="mx-2 text-stone-300 text-xl"
							icon="bi:skip-start-fill"
							:inline="true"
						/>
						Локальные файлы
					</span>
				</router-link>
			</li>

			<li class="dark:hover:text-white dark:hover:bg-stone-800">
				<router-link to="/ym">
					<span class="flex pt-4 pb-3 pr-4">
						<Icon
							id="previous-button"
							class="mx-2 text-stone-300 text-xl"
							icon="bi:skip-start-fill"
							:inline="true"
						/>
						Yandex Music
					</span>
				</router-link>
			</li>

		</ul>

	</nav>
</template>


<style scoped>

</style>
