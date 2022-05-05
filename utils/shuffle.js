import { decodeHtml } from "./decodeHtml";

export function shuffle(array) {
    let m = array.length, t, i;

    //While there remain elements to shuffle

    while (m) {
        //Pick a remaining element
        i = Math.floor(Math.random() * m--);

        //and swap it with the current element
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array.map((item) => decodeHtml(item));
};