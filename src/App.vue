<script>
</script>


<template>
	<div class="app bg-white dark:bg-black dark:text-white">
		<nav>
			<router-link to="/">Local</router-link> |
			<router-link to="/about">Yandex Music</router-link>
		</nav>

		<div>
			<img src="C:/Users/Zanda/Desktop/test2.jpg" class="aspect-square w-96 object-cover" />
		</div>

		<router-view />
	</div>
</template>


<style scoped>
@font-face {
	font-family: "Josefin Sans";
	src: local("Josefin Sans"), url(./fonts/JosefinSans/JosefinSans-Light.ttf) format("truetype");
}

.app {
	font-family: "Josefin Sans", Helvetica, Arial;
}
</style>
