"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeFromString = void 0;
var getAttributeFromString = function (str, attributeName) {
    var index = str.indexOf(attributeName);
    if (index >= 0) {
        var strStart = str.indexOf('"', index);
        var strEnd = strStart >= 0 ? str.indexOf('"', strStart + 1) : -1;
        if (strEnd >= 0) {
            var attributeStr = str.substr(strStart + 1, strEnd - strStart - 1);
            var attributeNum = parseInt(attributeStr, 10);
            if (!isNaN(attributeNum)) {
                return attributeNum;
            }
        }
    }
    return undefined;
};
exports.getAttributeFromString = getAttributeFromString;
