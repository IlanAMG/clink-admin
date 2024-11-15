export const transformColor = (bg) => {
    if (!bg) return "#FFF"
    const result = getG(bg)
    return result ? (result > 186 ? "#000" : "#FFF") : "#FFF"
}

const getG = (color) => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? parseInt(result[2], 16) : null
}