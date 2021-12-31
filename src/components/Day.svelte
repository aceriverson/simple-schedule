<script>
    import TimeSlot from "./TimeSlot.svelte"

    import { minTime, maxTime, timeDelta, scheduleData } from '../stores'
    import { onDestroy, onMount } from 'svelte'

    export let day;

    const scheduleDataSubscription = scheduleData.subscribe(value => updateTimespan());
    onDestroy(scheduleDataSubscription);

    onMount(() => {
        updateTimespan();
    })

    var times = [];

    function updateTimespan() {
        times = [];
        for (let i = $minTime; i < $maxTime; i += $timeDelta) {
            times.push(i);
        }
        times = times;
    }
</script>

<div class="main">
    <div class="blind"></div>
    <h1>{day}</h1>
    {#each times as time}
    <TimeSlot {time} {day} />
    {/each}
</div>

<style>
	h1 {
        text-align: center;
        background-color: white;
        text-transform: uppercase;
        font-size: 1.25em;
        font-weight: 100;
        padding: 1em;
        position: sticky;
        top: .5em;
    }

    .blind {
        height: 1em;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: white;
    }

    .main {
        width: 18em;
        margin-bottom: calc(48px + 1em);
    }
</style>