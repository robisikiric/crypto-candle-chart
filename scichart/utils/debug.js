"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDoubleVector = void 0;
var logDoubleVector = function (vector, name, precision) {
    if (precision === void 0) { precision = 2; }
    var s = "";
    for (var i = 0; i < vector.size(); i++) {
        s += vector.get(i).toFixed(precision) + ",";
    }
    if (name) {
        console.log(name, s);
    }
    else {
        console.log(s);
    }
};
exports.logDoubleVector = logDoubleVector;
