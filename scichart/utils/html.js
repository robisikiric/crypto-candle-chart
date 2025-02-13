"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringOccurrences = exports.htmlToElement = void 0;
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
exports.htmlToElement = htmlToElement;
function stringOccurrences(str, subStr, allowOverlapping) {
    if (allowOverlapping === void 0) { allowOverlapping = false; }
    str += "";
    subStr += "";
    if (subStr.length <= 0)
        return str.length + 1;
    var n = 0;
    var pos = 0;
    var step = allowOverlapping ? 1 : subStr.length;
    while (true) {
        pos = str.indexOf(subStr, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        }
        else
            break;
    }
    return n;
}
exports.stringOccurrences = stringOccurrences;
