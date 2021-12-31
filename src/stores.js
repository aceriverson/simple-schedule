import { writable, derived, get } from 'svelte/store';
import { onMount } from 'svelte';

export const selectedColor = writable("deeppink");

export const scheduleName = writable("Untitled Schedule");

export const scheduleData = writable({
    'colorLabels': JSON.parse(window.localStorage.getItem(get(scheduleName))).colorLabels || {},
    'settings': {
        'start': JSON.parse(window.localStorage.getItem(get(scheduleName))).settings.start || 360,
        'end': JSON.parse(window.localStorage.getItem(get(scheduleName))).settings.end || 1340,
        'delta': JSON.parse(window.localStorage.getItem(get(scheduleName))).settings.delta || 15
    },
    'times': JSON.parse(window.localStorage.getItem(get(scheduleName))).times || {}
});

export const minTime = derived(scheduleData, $scheduleData => $scheduleData.settings.start);
export const maxTime = derived(scheduleData, $scheduleData => $scheduleData.settings.end);
export const timeDelta = derived(scheduleData, $scheduleData => $scheduleData.settings.delta);

export const colorTitles = derived(scheduleData, 
    $scheduleData => $scheduleData.colorLabels
);

// colorTitles = {
//     "deeppink": "", 
//     "orchid": "", 
//     "mediumslateblue": "", 
//     "crimson": "", 
//     "darkorange": "", 
//     "gold": "", 
//     "palegreen": "", 
//     "lightseagreen": "", 
//     "cyan": ""
// }