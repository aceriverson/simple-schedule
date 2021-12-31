<script>
    import { colorTitles, selectedColor } from '../stores.js'

    import { onDestroy, onMount } from 'svelte'

    let currentColorTitle;

    let localColorTitles = {};
    const colorTitlesSubscription = colorTitles.subscribe(value => localColorTitles = value);
    onDestroy(colorTitlesSubscription);

    const selectedColorSubscription = selectedColor.subscribe(value => currentColorTitle = localColorTitles[value]);
    onDestroy(selectedColorSubscription);

    function handleTitle() {
        document.querySelectorAll(`[data-color="${$selectedColor}"]`).forEach(element => element.style.color != "black" ? element.innerText = this.value : null);
        localColorTitles[$selectedColor] = this.value;
    }

</script>

<div>
    <input bind:value={currentColorTitle} on:input={handleTitle}>
</div>