<script>
	import ColorTitle from './components/ColorTitle.svelte'
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
			<Palette />
		</div>
		<div>
			<ColorTitle />
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
		margin: .5em;
		padding: .5em;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.footer-container > * {
		margin: 0 .5em;
	}

	@media (min-width: 768px) {

	}
</style>