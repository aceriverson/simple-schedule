<script>
    import { fly } from 'svelte/transition';

    import { colorTitles, selectedColor } from "../stores.js"

    import CloseExpansion from "../icons/CloseExpansion.svelte"
    import OpenExpansion from "../icons/OpenExpansion.svelte"

    let colors = [
        "deeppink", "orchid", "mediumslateblue", "crimson", "darkorange", 
        "gold", "palegreen", "lightseagreen", "cyan"
    ];

    let togglePalette = false;

    function handleColorChange(clr) {
        togglePalette = false;
        selectedColor.set(clr);
    }

    function toggleColorPalette() {
        togglePalette ? togglePalette = false : togglePalette = true;
    }
</script>

<div class="main">
    {#if togglePalette}
    <div class="palette-container" in:fly="{{ y: 400, duration: 200 }}" out:fly="{{ y: 200, duration: 200 }}">
        {#each colors as color}
        <div class="color" style="background-color: {color}" on:click={() => handleColorChange(color)}></div>
        {/each}
    </div>
    {/if}
    <div class="color" style="background-color: {$selectedColor}" on:click={toggleColorPalette}>
        {#if togglePalette}
        <OpenExpansion />
        {:else}
        <CloseExpansion />
        {/if}
    </div>
</div>

<style>
    .color {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5em;
    }

    .palette-container {
        margin-bottom: 24px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        position: absolute;
        top: -160px;
    }
</style>