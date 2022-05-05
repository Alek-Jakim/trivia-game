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

export const checkToken = (token, decode, logout) => {
    if (token) {
        let decodedToken = decode(token);

        if (decodedToken?.exp * 1000 < new Date().getTime()) {
            valid = false;
            logout();
        }
    }
}

export const checkValidToken = (token, decode) => {
    let valid;

    if (!token) {
        valid = false;
    }

    let decodedToken = decode(token);
    if (decodedToken?.exp * 1000 < new Date().getTime()) {
        valid = false;
    }

    return valid;
}

export const categoryMap = {
    generalKnowledge: 9,
    computerScience: 18,
    sports: 21,
    animals: 27,
    mythology: 20,
    history: 23
};