<script>
    import { scheduleData, scheduleName, scheduleList } from '../stores'

    let localScheduleName = $scheduleName;

    function changeSchedule() {
        if (this.value == 'New...') {
            return
        }
        $scheduleName = this.value;
        $scheduleData = JSON.parse(window.localStorage.getItem(this.value));
        $scheduleData = $scheduleData;
    }

    function changeScheduleName() {
        window.localStorage.removeItem($scheduleName);
        $scheduleName = localScheduleName;
        $scheduleData = $scheduleData;
    }

    function makeNewSchedule() {
        console.log('hi')
        let uniqueInt = getUniqueSchedule(0)
        $scheduleName = 'New Schedule ' + uniqueInt;
        $scheduleData = {
            'colorLabels': {
                "deeppink": "", 
                "orchid": "", 
                "mediumslateblue": "", 
                "crimson": "", 
                "darkorange": "", 
                "gold": "", 
                "palegreen": "", 
                "lightseagreen": "", 
                "cyan": "",
            },
            'settings': {
                'start': 360,
                'end': 1340,
                'delta': 15
            },
            'times': {}
        };
        localScheduleName = 'New Schedule ' + uniqueInt;
        // document.getElementById('title-select').value = 'New Schedule ' + uniqueInt;
    }

    function getUniqueSchedule(i) {
        if (i == 0 && !window.localStorage.getItem('New Schedule')) {
            return i
        } else if (i != 0 && !window.localStorage.getItem(`New Schedule ${i}`)) {
            return i
        } else {
            return getUniqueSchedule(++i);
        }
    }
</script>

<div>
    <div class="dropdown">
        <input bind:value={localScheduleName} on:change={changeScheduleName} placeholder="Schedule Name" />
        <!-- https://stackoverflow.com/a/31474567 -->
        <select on:change={changeSchedule} onchange="this.value != 'New...' ? this.previousElementSibling.value=this.value : null; this.previousElementSibling.focus()">
            {#each $scheduleList.sort() as key}
            <option selected={localScheduleName == key}>{key}</option>
            {/each}
            <option disabled></option>
            <option on:click={makeNewSchedule}>New...</option>
        </select>
      </div>
</div>

<style>
    .dropdown {
        position: relative;
        width: 300px;
    }
  
    .dropdown select {
        width: 99.5%;
    }
    
    .dropdown > * {
        box-sizing: border-box;
        /* height: 1.5em; */
    }
    
    .dropdown input {
        position: absolute;
        width: calc(100% - 20px);
    }
</style>