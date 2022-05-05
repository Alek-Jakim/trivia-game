//helps me extract the difficulty from the url
export function findDifficulty(url) {
    if (!url) return;
    let difficulty;

    if (url.includes("difficulty")) {
        let splitUrl = url.split("&difficulty=")[1]
        if (!splitUrl.includes("&")) {
            difficulty = splitUrl;
        } else {
            difficulty = splitUrl.substring(0, splitUrl.indexOf("&"))
        }
    } else {
        difficulty = "any"
    }
    return difficulty.trim();
}