<script>
	import Day from './components/Day.svelte'
	import Palette from './components/Palette.svelte'

	import Settings from './icons/Settings.svelte'

	let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
</script>

<main>
	<div class="days-container">
		{#each days as day}
		<div class="day-container">
			<Day {day} />
		</div>
		{/each}
	</div>
	<div class="footer-container">
		<div>

			<Settings />
		</div>
		<div>

			<Palette />
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-x: scroll;
	}

	.day-container {
		padding: 0 .5em;
	}

	.days-container {
		display: flex;
		flex-direction: row;
		height: calc(100vh - 48px - 2em);
		overflow-y: scroll;
	}

	.footer-container {
		background-color: white;
		border: 1px solid #ff3e00;
		margin: .5em;
		padding: .5em;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
	}

	.footer-container > * {
		margin: 0 .5em;
	}

	@media (min-width: 768px) {

	}
</style>