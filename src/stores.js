import { writable, derived, get } from 'svelte/store';
import { onMount } from 'svelte';

export const selectedColor = writable("deeppink");

export const scheduleName = writable(Object.keys(window.localStorage)[0] || "New Schedule");

const colorTitlesTemplate = {
    "deeppink": "", 
    "orchid": "", 
    "mediumslateblue": "", 
    "crimson": "", 
    "darkorange": "", 
    "gold": "", 
    "palegreen": "", 
    "lightseagreen": "", 
    "cyan": ""
}
export const scheduleData = writable({
    'colorLabels': JSON.parse(window.localStorage.getItem(get(scheduleName)))?.colorLabels || colorTitlesTemplate,
    'settings': {
        'start': JSON.parse(window.localStorage.getItem(get(scheduleName)))?.settings.start || 360,
        'end': JSON.parse(window.localStorage.getItem(get(scheduleName)))?.settings.end || 1340,
        'delta': JSON.parse(window.localStorage.getItem(get(scheduleName)))?.settings.delta || 15
    },
    'times': JSON.parse(window.localStorage.getItem(get(scheduleName)))?.times || {}
});

export const scheduleList = writable(Object.keys(window.localStorage));

export const minTime = derived(scheduleData, $scheduleData => $scheduleData?.settings?.start || 360);
export const maxTime = derived(scheduleData, $scheduleData => $scheduleData?.settings?.end || 1340);
export const timeDelta = derived(scheduleData, $scheduleData => $scheduleData?.settings?.delta || 15);

export const colorTitles = derived(scheduleData, 
    $scheduleData => $scheduleData?.colorLabels || colorTitlesTemplate
);