<script>
    import { colorTitles, timeDelta, selectedColor } from "../stores"

    export let time;
    export let day;

    function handleBorder() {
        let slotNode = document.getElementById(`${day}-${time}`);
        let aboveNode = document.getElementById(`${day}-${time - $timeDelta}`);
        let belowNode = document.getElementById(`${day}-${time + $timeDelta}`);

        if (aboveNode) {
            if (slotNode.style.backgroundColor == 'white') {
                if (aboveNode.style.backgroundColor != 'white') {
                    aboveNode.style.borderBottomLeftRadius = ".5em";
                    aboveNode.style.borderBottomRightRadius = ".5em";
                }
                // potentially more if the aboveNode is white?
            } else /* if slotNode is not white */ {
                if (aboveNode.style.backgroundColor == slotNode.style.backgroundColor) {
                    slotNode.style.borderTopLeftRadius = "0px";
                    slotNode.style.borderTopRightRadius = "0px";
                    aboveNode.style.borderBottomLeftRadius = "0px";
                    aboveNode.style.borderBottomRightRadius = "0px";

                    document.getElementById(`title-${day}-${time}`).innerText = "";
                } else {
                    slotNode.style.borderTopLeftRadius = ".5em";
                    slotNode.style.borderTopRightRadius = ".5em";

                    document.getElementById(`title-${day}-${time}`).innerText = $colorTitles[$selectedColor];
                    document.getElementById(`title-${day}-${time}`).style.color = $selectedColor;
                }
            }
        } else if (slotNode.style.backgroundColor != 'white') {
            slotNode.style.borderTopLeftRadius = ".5em";
            slotNode.style.borderTopRightRadius = ".5em";

            document.getElementById(`title-${day}-${time}`).innerText = $colorTitles[$selectedColor];
            document.getElementById(`title-${day}-${time}`).style.color = $selectedColor;
        } else {
            document.getElementById(`title-${day}-${time}`).innerText = "";
        }

        if (belowNode) {
            if (slotNode.style.backgroundColor == 'white') {
                if (belowNode.style.backgroundColor != 'white') {
                    belowNode.style.borderTopLeftRadius = ".5em";
                    belowNode.style.borderTopRightRadius = ".5em";

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
                } else {
                    slotNode.style.borderBottomLeftRadius = ".5em";
                    slotNode.style.borderBottomRightRadius = ".5em";
                }
            }
        } else {
            slotNode.style.borderBottomLeftRadius = ".5em";
            slotNode.style.borderBottomRightRadius = ".5em";
        }
    }

    function handleClick() {
        let slotNode = document.getElementById(`${day}-${time}`);
        slotNode.style.backgroundColor != 'white' ? slotNode.style.backgroundColor = 'white' : slotNode.style.backgroundColor = $selectedColor;
        document.getElementById(`title-${day}-${time}`).innerText = "";

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
        <p id="title-{day}-{time}"></p>
    </div>
    <div class="slot" id="{day}-{time}" style="background-color: white;">

    </div>
</div>

<style>
    p {
        font-size: 1.5em;
        text-align: center;
        margin: .25em;
    }

    .main {
        height: 6em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .slot {
        height: 100%;
        width: 10em;
    }
</style>