import { writable } from 'svelte/store';

export const minTime = writable(360);
export const maxTime = writable(1440);
export const timeDelta = writable(43);

export const selectedColor = writable("deeppink");
export const colorTitles = writable({
        "deeppink": "", 
        "orchid": "", 
        "mediumslateblue": "", 
        "crimson": "", 
        "darkorange": "", 
        "gold": "", 
        "palegreen": "", 
        "lightseagreen": "", 
        "cyan": ""
})