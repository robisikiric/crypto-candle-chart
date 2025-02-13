"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDoubleVector = void 0;
var appendDoubleVectorFromJsArray_1 = require("./ccall/appendDoubleVectorFromJsArray");
var copyDoubleVector = function (source, target, wasmContext) {
    var size = source.size();
    target.resizeFast(size);
    wasmContext.SCRTMemCopy(target.dataPtr(0), source.dataPtr(0), size * appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
};
exports.copyDoubleVector = copyDoubleVector;
