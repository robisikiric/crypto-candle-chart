"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUnixDateToHumanStringYYYY = exports.formatUnixDateToHumanStringDD = exports.formatUnixDateToHumanStringMMM = exports.formatUnixDateToHumanStringMMMDD = exports.formatUnixDateToHumanStringHHMM = exports.formatUnixDateToHumanStringSSms = exports.formatUnixDateToHumanStringHHMMSS = exports.formatUnixDateToHumanStringDDMM = exports.formatUnixDateToHumanStringDDMMHHMM = exports.formatUnixDateToHumanStringDDMMYY = exports.formatUnixDateToHumanString = void 0;
/**
 * Result 11/23/2018
 * @param unixTimestamp
 */
var formatUnixDateToHumanString = function (unixTimestamp, locale) {
    if (locale === void 0) { locale = "en-US"; }
    var res = new Date(unixTimestamp * 1000).toLocaleDateString(locale, {
        month: "numeric",
        year: "numeric",
        day: "numeric"
    });
    if (res === "Invalid Date") {
        return "";
    }
    return res;
};
exports.formatUnixDateToHumanString = formatUnixDateToHumanString;
var formatUnixDateToHumanStringDDMMYY = function (unixTimestamp) {
    var res = new Date(unixTimestamp * 1000).toLocaleDateString("en-GB", {
        timeZone: "utc",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    });
    if (res === "Invalid Date") {
        return "";
    }
    return res;
};
exports.formatUnixDateToHumanStringDDMMYY = formatUnixDateToHumanStringDDMMYY;
var formatUnixDateToHumanStringDDMMHHMM = function (unixTimestamp) {
    var ddmm = (0, exports.formatUnixDateToHumanStringDDMM)(unixTimestamp);
    var hhmm = (0, exports.formatUnixDateToHumanStringHHMM)(unixTimestamp);
    return "".concat(ddmm, " ").concat(hhmm);
};
exports.formatUnixDateToHumanStringDDMMHHMM = formatUnixDateToHumanStringDDMMHHMM;
var formatUnixDateToHumanStringDDMM = function (unixTimestamp) {
    var res = new Date(unixTimestamp * 1000).toLocaleDateString("en-GB", {
        timeZone: "utc",
        day: "numeric",
        month: "numeric"
    });
    if (res === "Invalid Date") {
        return "";
    }
    return res;
};
exports.formatUnixDateToHumanStringDDMM = formatUnixDateToHumanStringDDMM;
var formatUnixDateToHumanStringHHMMSS = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return "";
    }
    var hoursString = hours <= 9 ? "0".concat(hours) : hours.toString(10);
    var minutesString = minutes <= 9 ? "0".concat(minutes) : minutes.toString(10);
    var secondsString = seconds <= 9 ? "0".concat(seconds) : seconds.toString(10);
    return "".concat(hoursString, ":").concat(minutesString, ":").concat(secondsString);
};
exports.formatUnixDateToHumanStringHHMMSS = formatUnixDateToHumanStringHHMMSS;
var formatUnixDateToHumanStringSSms = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var seconds = date.getUTCSeconds();
    var milliseconds = date.getUTCMilliseconds();
    if (isNaN(seconds) || isNaN(milliseconds)) {
        return "";
    }
    var secondsString = seconds <= 9 ? "0".concat(seconds) : seconds.toString(10);
    var millisecondsString = milliseconds <= 9 ? "0".concat(milliseconds) : milliseconds.toString(10);
    return "".concat(secondsString, ".").concat(millisecondsString);
};
exports.formatUnixDateToHumanStringSSms = formatUnixDateToHumanStringSSms;
var formatUnixDateToHumanStringHHMM = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    if (isNaN(hours) || isNaN(minutes)) {
        return "";
    }
    var hoursString = hours <= 9 ? "0".concat(hours) : hours.toString(10);
    var minutesString = minutes <= 9 ? "0".concat(minutes) : minutes.toString(10);
    return "".concat(hoursString, ":").concat(minutesString);
};
exports.formatUnixDateToHumanStringHHMM = formatUnixDateToHumanStringHHMM;
var formatUnixDateToHumanStringMMMDD = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    if (isNaN(month) || isNaN(day)) {
        return "";
    }
    return "".concat(getMonthString(month), " ").concat(day);
};
exports.formatUnixDateToHumanStringMMMDD = formatUnixDateToHumanStringMMMDD;
var formatUnixDateToHumanStringMMM = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var month = date.getUTCMonth();
    if (isNaN(month)) {
        return "";
    }
    return getMonthString(month);
};
exports.formatUnixDateToHumanStringMMM = formatUnixDateToHumanStringMMM;
var formatUnixDateToHumanStringDD = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var day = date.getUTCDate();
    if (isNaN(day)) {
        return "";
    }
    var strDay = day.toString();
    if (strDay.length === 2) {
        return strDay;
    }
    else if (strDay.length === 1) {
        return "0".concat(strDay);
    }
    else {
        return "";
    }
};
exports.formatUnixDateToHumanStringDD = formatUnixDateToHumanStringDD;
var formatUnixDateToHumanStringYYYY = function (unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var year = date.getUTCFullYear();
    if (isNaN(year)) {
        return "";
    }
    return year.toString(10);
};
exports.formatUnixDateToHumanStringYYYY = formatUnixDateToHumanStringYYYY;
var getMonthString = function (month) {
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            throw Error("Not correct month");
    }
};
