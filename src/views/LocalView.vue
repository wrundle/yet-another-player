<script setup>
var pickFolder = (event) => {if (event) {window.folderHandling.selectFolder()}};
</script>


<template>
	<div class="flex-auto w-3/4">

		<button
			@click="pickFolder"
			class="p-3 text-sm dark:text-stone-300 italic dark:hover:text-white"
		>
			+ добавить директорию...
		</button>

	</div>
</template>


<style scoped>
</style>
