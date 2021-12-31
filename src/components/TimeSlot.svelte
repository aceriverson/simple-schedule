<script>
    import { colorTitles, timeDelta, scheduleData, selectedColor } from "../stores"

    import { onMount } from "svelte"

    export let time;
    export let day;

    onMount(() => {
        if ($scheduleData.times[`${day}-${time}`]) {
            let colorCache = $selectedColor;
            $selectedColor = $scheduleData.times[`${day}-${time}`];
            handleClick();
            $selectedColor = colorCache;
        }
    })

    function handleBorder() {
        let slotNode = document.getElementById(`${day}-${time}`);
        let aboveNode = document.getElementById(`${day}-${time - $timeDelta}`);
        let belowNode = document.getElementById(`${day}-${time + $timeDelta}`);

        if (aboveNode) {
            if (slotNode.style.backgroundColor == 'white') {
                if (aboveNode.style.backgroundColor != 'white') {
                    aboveNode.style.borderBottomLeftRadius = ".2em";
                    aboveNode.style.borderBottomRightRadius = ".2em";
                }
                // potentially more if the aboveNode is white?
            } else /* if slotNode is not white */ {
                if (aboveNode.style.backgroundColor == slotNode.style.backgroundColor) {
                    slotNode.style.borderTopLeftRadius = "0px";
                    slotNode.style.borderTopRightRadius = "0px";
                    aboveNode.style.borderBottomLeftRadius = "0px";
                    aboveNode.style.borderBottomRightRadius = "0px";

                    document.getElementById(`title-${day}-${time}`).innerText = "";
                    document.getElementById(`title-${day}-${time}`).style.color = "black";
                } else {
                    slotNode.style.borderTopLeftRadius = ".2em";
                    slotNode.style.borderTopRightRadius = ".2em";

                    document.getElementById(`title-${day}-${time}`).innerText = $colorTitles[$selectedColor];
                    document.getElementById(`title-${day}-${time}`).style.color = $selectedColor;
                }
            }
        } else if (slotNode.style.backgroundColor != 'white') {
            slotNode.style.borderTopLeftRadius = ".2em";
            slotNode.style.borderTopRightRadius = ".2em";

            document.getElementById(`title-${day}-${time}`).innerText = $colorTitles[$selectedColor];
            document.getElementById(`title-${day}-${time}`).style.color = $selectedColor;
        } else {
            document.getElementById(`title-${day}-${time}`).innerText = "";
            document.getElementById(`title-${day}-${time}`).style.color = "black";
        }

        if (belowNode) {
            if (slotNode.style.backgroundColor == 'white') {
                if (belowNode.style.backgroundColor != 'white') {
                    belowNode.style.borderTopLeftRadius = ".2em";
                    belowNode.style.borderTopRightRadius = ".2em";

                    document.getElementById(`title-${belowNode.id}`).innerText = $colorTitles[belowNode.style.backgroundColor];
                    document.getElementById(`title-${belowNode.id}`).style.color = belowNode.style.backgroundColor;
                }
            } else {
                if (belowNode.style.backgroundColor == slotNode.style.backgroundColor) {
                    slotNode.style.borderBottomLeftRadius = "0px";
                    slotNode.style.borderBottomRightRadius = "0px";
                    belowNode.style.borderTopLeftRadius = "0px";
                    belowNode.style.borderTopRightRadius = "0px";

                    document.getElementById(`title-${belowNode.id}`).innerText = "";
                    document.getElementById(`title-${belowNode.id}`).style.color = "black";
                } else {
                    slotNode.style.borderBottomLeftRadius = ".2em";
                    slotNode.style.borderBottomRightRadius = ".2em";
                }
            }
        } else {
            slotNode.style.borderBottomLeftRadius = ".2em";
            slotNode.style.borderBottomRightRadius = ".2em";
        }
    }

    function handleClick() {
        let slotNode = document.getElementById(`${day}-${time}`);
        if (slotNode.style.backgroundColor != 'white') {
            slotNode.style.backgroundColor = 'white';

            $scheduleData.times[`${day}-${time}`] = "";

            document.getElementById(`title-${day}-${time}`).innerText = "";
            document.getElementById(`title-${day}-${time}`).setAttribute("data-color", "");
        } else {
            slotNode.style.backgroundColor = $selectedColor;

            $scheduleData.times[`${day}-${time}`] = $selectedColor;

            document.getElementById(`title-${day}-${time}`).setAttribute("data-color", $selectedColor);
        }

        handleBorder();
    }

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

<div class="main" on:click={handleClick}>
    <div>
        {hrminFormat(time)}
        <p id="title-{day}-{time}" data-color=""></p>
    </div>
    <div class="slot" id="{day}-{time}" style="background-color: white;">

    </div>
</div>

<style>
    p {
        font-size: 1.5em;
        text-align: center;
        margin: .25em;
        overflow: scroll;
        width: 5em;
        height: 6em;
    }

    .main {
        height: 6em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 100;
    }

    .main:hover {
        /* border: 1px solid black; */
        /* border-radius: .2em; */
    }

    .slot {
        height: 100%;
        width: 10em;
    }
</style>