<script>
	import ColorTitle from './components/ColorTitle.svelte'
	import Day from './components/Day.svelte'
	import Palette from './components/Palette.svelte'
	import ScheduleTitle from './components/ScheduleTitle.svelte'
	import SettingsModal from './components/SettingsModal.svelte'

	import Settings from './icons/Settings.svelte'

	import { scheduleData, scheduleName } from './stores'

	import { onDestroy } from 'svelte';

	let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	let toggleModal = false;

	const dataSubscription = scheduleData.subscribe(value => updateLocalStorage(value));
	onDestroy(dataSubscription);

	function updateLocalStorage(data) {
		window.localStorage.setItem($scheduleName, JSON.stringify(data))
	}
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
		<div class="label-palette-container">
			<div>
				<Palette />
			</div>
			<div>
				<ColorTitle />
			</div>
		</div>
		<div>
			<ScheduleTitle />
		</div>
		<div class="label-palette-container">
			<input style="visibility: hidden;" />
			<Settings on:open-settings={() => toggleModal = true} />
		</div>
	</div>
	{#if toggleModal} 
	<SettingsModal on:close-settings={() => toggleModal = false} />
	{/if}
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
		justify-content: space-between;
		width: calc(100vw - 2em);
	}

	/* .footer-container > * {
		margin: 0 .5em;
	} */

	.label-palette-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.label-palette-container > * {
		margin: 0 .5em;
	}

	@media (min-width: 768px) {

	}
</style>