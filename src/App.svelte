<script>
	import Day from './components/Day.svelte'

	let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	let widthScale = 24;
</script>

<main>
	<div class="days-container">
		{#each days as day}
		<div class="day-container">
			<Day {day} />
		</div>
		{/each}
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
	}

	@media (min-width: 768px) {

	}
</style>