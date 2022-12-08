<script setup>
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';


const store = useStore();


function close() {
	store.dispatch('setModal', 0);
};


function changeSmth(event) {
	console.log(event.target.checked);
};
</script>


<template>
	<div class="absolute w-full h-full flex justify-center items-center backdrop-blur-sm text-white">

		<div class="w-3/4 border-2 border-neutral-400 bg-stone-800">

			<div class="flex justify-between border-b-2 border-neutral-400">
				<span class="ml-8 flex place-items-center font-semibold text-lg">Настройки</span>
				<span class="p-3 text-xl dark:hover:text-white dark:hover:bg-rose-600" @click="close">
					<Icon icon="mdi:window-close" />
				</span>
			</div>

			<div class="p-5">

				<div class="mb-5 p-3 border-2 border-neutral-500">

					<div class="mb-2 font-semibold text-lg">Подключение к сети</div>

					<div class="flex items-center mb-1">
						<input
							type="checkbox"
							@click="changeSmth"
							class="w-4 h-4 focus:ring-0 border-gray-300 dark:border-gray-600"
						>
						<label for="default-checkbox" class="ml-3 font-medium">
							Искать недостающую информацию о файле в интернете
						</label>
					</div>

					<div class="flex items-center mb-1">
						<input
							disabled
							type="checkbox"
							@click=""
							class="w-4 h-4 focus:ring-0 border-gray-300 dark:border-gray-600"
						>
						<label for="default-checkbox" class="ml-3 font-medium dark:text-stone-400">
							Искать текст песни в интернете
						</label>
					</div>

				</div>


				<div class="p-3 border-2 border-neutral-500">

					<div class="mb-2 font-semibold text-lg">Мониторинг файлов</div>

					<div class="text-sm">
						<div class="odd:bg-stone-700" v-for="folder in store.state.settings.allowedFolders">
							{{ folder }}
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
</template>


<style>
</style>
