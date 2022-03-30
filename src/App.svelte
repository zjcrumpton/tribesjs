<script lang="ts">
	import Game from "./core/Game";
	import Storage from './components/Storage.svelte';
	import Jobs from './components/Jobs.svelte';

	let game: Game;
	let debugButton = document.getElementById('debug');
	$: storage = {
      wood_log: 0,
      tall_grass: 0,
      acorn: 0,
      tall_grass_seed: 0,
    };

	$: hours = 0;
	$: day = 1;

	const HOUR_OFFSET = 50;

	const play = () => {
		if (game) {
			if (Math.floor(hours) % 10 === 0) {
				game.advanceTime();
				storage = game.storage;
			}


			const nightCanvas = document.getElementById('night-overlay');
			if ((Math.floor(hours) >= 16 * HOUR_OFFSET)) {
				if (nightCanvas) {
					nightCanvas.style.display = 'block';
				}
			} else {
				if (nightCanvas) {
					nightCanvas.style.display = 'none';
				}
			}

			if (hours < 24 * HOUR_OFFSET) {
				hours++;
				window.requestAnimationFrame(play);
			} else {
				day++;
			}
		} 
	}

	const nextDay = () => {
		console.log('next day running', hours);
		if (hours >= 24 * HOUR_OFFSET) {
			hours = 0;
			play();
		}
	}

	const startSimulation = () => {
		game = new Game();
		const button = document.getElementById('startButton');
		if (button) button.style.display = 'none';

		const advanceTimeButton = document.getElementById('advanceTime');
		if (advanceTimeButton) advanceTimeButton.style.display = 'block';

		debugButton = document.getElementById('debug');
		if (debugButton) debugButton.style.display = 'block';

		const playButton = document.getElementById('play');
		if (playButton) playButton.style.display = 'block';

		play()
	}

	const advanceTime = () => {
		if (game) {
			game.advanceTime();
		}
	}

	
</script>

<Storage storage={storage} />
<Jobs />

<button id="startButton" on:click={startSimulation}>Start Simulation</button>

<button id="advanceTime" on:click={advanceTime}>Advance Time =></button>

<button id="play" on:click={nextDay}>Next Day =></button>

<h1 id="day">Day: {day}</h1>

<h1 id="hours">Time: {Math.floor(hours / HOUR_OFFSET)}</h1> 

<div class="root-container">
	<div id="root" ></div>
	<canvas id="night-overlay" />
</div>

<style>
	:global(:root) {
		background-color: gray;
	}

	#advanceTime {
		position: absolute;
		right: 100px;
		bottom: 100px;
		display: none;
	}

	#debug {
		display: none;
	}

	#play {
		display: none;
		position: absolute;
		right: 100px;
		bottom: 200px;
	}

	#day {
		position: absolute;
		right: 50px;
	}

	#hours {
		position: absolute;
		top: 100px;
		right: 50px;
	}

	#night-overlay {
		background-color: #00000080;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
		width: 700px;
		height: 700px;
	}
</style>

