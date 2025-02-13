"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAllProperties = void 0;
var hasAllProperties = function (obj, props) {
    for (var i = 0; i < props.length; i++) {
        if (!obj.hasOwnProperty(props[i]))
            return false;
    }
    return true;
};
exports.hasAllProperties = hasAllProperties;
