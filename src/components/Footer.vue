<script>
import { Icon } from "@iconify/vue";
import {Howl, Howler} from 'howler';

// var sound = new Howl({
//   src: ['C:/Users/Zanda/Desktop/test.mp3']
// });

// sound.play();

export default {
	name: 'Footer',
	props: {
		msg: String
	},
	components: {
		Icon
	},
	mounted() {
		document.getElementById("progress-bar").oninput = function () {
			var value = (this.value - this.min) / (this.max - this.min) * 100
			this.style.background = 'linear-gradient(to right, #1DB954 0%, #1DB954 ' + value + '%, #fff ' + value + '%, white 100%)'
		};
	}
}
</script>


<template>
	<h1>{{ msg }}</h1>

	<div class="flex flex-row dark:bg-stone-900 px-5 py-3">

		<div class="flex-auto w-1/">

			<button
				class="
					block
					hover:underline
					font-bold
					dark:text-white
				"
			>Fur</button>

			<button
				class="
					block
					hover:underline
					text-xs
					dark:text-stone-300
					dark:hover:text-white
				"
			>Helmut</button>

		</div>

		<div class="flex-auto w-3/6 flex flex-col place-content-center">

			<div class="flex-auto flex flex-row place-content-center">

				<Icon
					icon="bi:skip-start-fill"
					:inline="true"
				/>

				<Icon
					icon="bi:play-circle-fill"
					:inline="true"
				/>

				<Icon
					icon="bi:pause-circle-fill"
					:inline="true"
				/>

				<Icon
					icon="bi:skip-end-fill"
					:inline="true"
				/>

			</div>

			<div class="flex-auto flex flex-row">

				<div class="flex-auto dark:text-stone-300">
					<span class="text-xs">0:00</span>
				</div>

				<div class="flex-auto w-full mx-2">
					<input
						type="range" min="0" max="100" value="0" step="1"
						id="progress-bar" name="progress-bar"
						class="p-0 h-1 w-full"
					/>
				</div>

				<div class="flex-auto dark:text-stone-300">
					<span class="text-xs">3:35</span>
				</div>

			</div>

		</div>

		<div class="flex-auto w-1/6 flex justify-end content-center">

			<button>1</button>

			<button>2</button>

			<button>3</button>

		</div>

	</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#progress-bar {
	appearance: none;
	/* background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%); */
	border-radius: 8px;
	outline: none;
	transition: background 450ms ease-in;
}

/* #progress-bar::-webkit-slider-runnable-track {

} */

#progress-bar::-webkit-slider-thumb {
	appearance: none;
	/* border: solid; */
	border-radius: 10px;
	height: 10px;
	width: 10px;
	background: #FFF;
}
</style>
