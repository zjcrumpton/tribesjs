<script lang="ts">
	import Game from "./core/Game";

	let game: Game;
	let debugButton = document.getElementById('debug');

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
	}

	const advanceTime = () => {
		if (game) {
			game.advanceTime();
		}
	}

	const play = () => {
		if (game) {
			game.advanceTime();
			window.requestAnimationFrame(play)
		} 
	}

	
</script>

<button id="startButton" on:click={startSimulation}>Start Simulation</button>

<button id="advanceTime" on:click={advanceTime}>Advance Time =></button>

<button id="play" on:click={play}>Play =></button>

<div class="root-container">
	<div id="root" ></div>
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
		right: 200px;
		bottom: 200px;
	}


</style>

