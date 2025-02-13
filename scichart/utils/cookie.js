"use strict";
/*
 * General utils for managing cookies in Typescript.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.getCookie = exports.setCookie = void 0;
function setCookie(name, val, validDays) {
    var date = new Date();
    var value = val;
    // Set it expire in 7 days
    date.setTime(date.getTime() + validDays * 24 * 60 * 60 * 1000);
    // Set it
    if (typeof document !== "undefined")
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    // TODO can/should we fake this for node?
}
exports.setCookie = setCookie;
function getCookie(name) {
    if (typeof document === "undefined")
        return null;
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
    return "";
}
exports.getCookie = getCookie;
function deleteCookie(name) {
    if (typeof document === "undefined")
        return;
    var date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
exports.deleteCookie = deleteCookie;
