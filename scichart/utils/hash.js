"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashUtils = void 0;
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
var generateHash = function (s) {
    return s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
};
var generateObjectHash = function (obj) {
    var str = JSON.stringify(obj);
    return generateHash(str);
};
var generateBooleanHash = function (value) {
    if (value === false)
        return generateHash("0");
    if (value === true)
        return generateHash("1");
    return generateHash("-1");
};
var generateNumberHash = function (value) {
    var str = value.toString(10);
    return generateHash(str);
};
var generateCombinedHash = function (hashes) {
    return hashes.reduce(function (prev, curr) { return (prev * 397) ^ curr; }, 0);
};
exports.hashUtils = {
    generateHash: generateHash,
    generateObjectHash: generateObjectHash,
    generateBooleanHash: generateBooleanHash,
    generateNumberHash: generateNumberHash,
    generateCombinedHash: generateCombinedHash
};
