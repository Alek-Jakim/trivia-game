
//decodes HTML special characters/entities to normal text - i will make this function better i promise
export function decodeHtml(str) {
    if (str.includes("&quot;")) {
        str = str.replaceAll("&quot;", '"');
    }

    if (str.includes("&#039;")) {
        str = str.replaceAll("&#039;", "'");
    }

    if (str.includes("&rdquo;")) {
        str = str.replaceAll("&rdquo;", "”");
    }

    if (str.includes("&ldquo;")) {
        str = str.replaceAll("&ldquo;", "“");
    }

    if (str.includes("&deg;")) {
        str = str.replaceAll("", "°");
    }

    if (str.includes("&rsquo;")) {
        str = str.replaceAll("&rsquo;", "'");
    }

    if (str.includes("&lsquo;")) {
        str = str.replaceAll("&lsquo;", "'");
    }

    if (str.includes("&oacute;")) {
        str = str.replaceAll("&oacute;", "ó");
    }

    if (str.includes("&ouml;")) {
        str = str.replaceAll("&ouml;", "ö");
    }

    if (str.includes("&auml;")) {
        str = str.replaceAll("&auml;", "ä");
    }

    return str;
}