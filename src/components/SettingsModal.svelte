<script>
    import { minTime, maxTime, timeDelta, scheduleData } from '../stores'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close-settings');
    }

    // let begin = 0;
    // let end = 1440;

    function hrminFormat(time) {
        let hour = Math.trunc(time / 60)
        let minutes = time % 60
        let meridian = "am"

        if (hour > 12) {
            hour -= 12
            meridian = "pm"
        } else if (hour == 0) {
            hour = 12;
        }

        return hour + ":" + String(minutes).padStart(2, '0') + meridian;
    }
</script>

<div class="main">
    <div class="bg" on:click={closeModal}>
    </div>
    <div class="box">
        <div>
            <label for="begin">Start Time</label>
            <input type="range" id="begin" name="begin"
                min="0" max="1439" bind:value={$scheduleData.settings.start} on:change={() => {$minTime >= $maxTime ? $minTime = $maxTime - 1 : null}}>
            <p>{hrminFormat($minTime)}</p>
        </div>
        <div>
            <label for="end">End Time</label>
            <input type="range" id="end" name="end"
                min="1" max="1440" bind:value={$scheduleData.settings.end} on:change={() => {$maxTime <= $minTime ? $maxTime = $minTime + 1 : null}}>
                <p>{hrminFormat($maxTime)}</p>
        </div>
        <div>
            <label for="delta">Increment</label>
            <input type="range" id="delta" name="delta"
                min="1" max="120" bind:value={$scheduleData.settings.delta}>
                <p>{$timeDelta} minutes</p>
        </div>
        <div class="close">
            <!-- X -->
        </div>
    </div>
</div>

<style>
    label {
        margin-top: 3em;
    }

    p {
        margin-top: 0;
        /* margin-bottom: 5em; */
    }

    input {
        margin-bottom: 0;
    }

    .bg {
        background-color: slategray;
        width: 100%;
        height: 100%;
        opacity: .4;
    }

    .box {
        width: 50%;
        height: 50%;
        background-color: white;
        opacity: 1;
        position: absolute;
        border-radius: .2em;
        text-align: center;
        font-size: 1.25em;
        font-weight: 100;
        text-transform: uppercase;
        border: 1px solid slategray;
    }

    .close {
        position: relative;
        left: 48%;
        bottom: 92%;
        
    }

    .main {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>