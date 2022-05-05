export const sortByScore = (a, b) => {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}

export const capitalize = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();

    return firstLetter + str.substring(1);
}