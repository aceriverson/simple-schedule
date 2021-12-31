<script>
    import TimeSlot from "./TimeSlot.svelte"

    import { minTime, maxTime, timeDelta } from '../stores'
    import { onDestroy } from 'svelte'

    export let day;

    let times = [];
    let localMinTime = 0;
    let localMaxTime = 1440;
    let localTimeDelta = 15;

    const minTimeSubscription = minTime.subscribe(value => updateTimespan(value, localMaxTime, localTimeDelta));
    onDestroy(minTimeSubscription);
    const maxTimeSubscription = maxTime.subscribe(value => updateTimespan(localMinTime, value, localTimeDelta));
    onDestroy(maxTimeSubscription);
    const timeDeltaSubscription = timeDelta.subscribe(value => updateTimespan(localMinTime, localMaxTime, value));
    onDestroy(timeDeltaSubscription);

    function updateTimespan(min, max, delta) {
        localMinTime = min;
        localMaxTime = max;
        localTimeDelta = delta;

        times = [];

        for (let i = min; i < max; i += delta) {
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