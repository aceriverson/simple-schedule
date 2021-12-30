<script>
    import { timeDelta } from "../stores"

    export let time;
    export let day;

    function handleBorder() {
        let slotNode = document.getElementById(`${day}-${time}`);
        let aboveNode = document.getElementById(`${day}-${time - $timeDelta}`);
        let belowNode = document.getElementById(`${day}-${time + $timeDelta}`);

        // console.log(belowNode);

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
                } else {
                    slotNode.style.borderTopLeftRadius = ".5em";
                    slotNode.style.borderTopRightRadius = ".5em";
                }
            }
        } else {
            slotNode.style.borderTopLeftRadius = ".5em";
            slotNode.style.borderTopRightRadius = ".5em";
        }

        if (belowNode) {
            if (slotNode.style.backgroundColor == 'white') {
                if (belowNode.style.backgorundColor != 'white') {
                    belowNode.style.borderTopLeftRadius = ".5em";
                    belowNode.style.borderTopRightRadius = ".5em";
                }
            } else {
                if (belowNode.style.backgroundColor == slotNode.style.backgroundColor) {
                    slotNode.style.borderBottomLeftRadius = "0px";
                    slotNode.style.borderBottomRightRadius = "0px";
                    belowNode.style.borderTopLeftRadius = "0px";
                    belowNode.style.borderTopRightRadius = "0px";
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
        console.log(this)
        let slotNode = document.getElementById(`${day}-${time}`);
        slotNode.style.backgroundColor != 'white' ? slotNode.style.backgroundColor = 'white' : slotNode.style.backgroundColor = 'deeppink';

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
    {hrminFormat(time)}
    <div class="slot" id="{day}-{time}" style="background-color: white;">

    </div>
</div>

<style>
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