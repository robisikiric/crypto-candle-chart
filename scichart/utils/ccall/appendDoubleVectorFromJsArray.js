"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendDoubleVectorFromJsArray = exports.memCopyFloat32 = exports.insertDoubleVectorFromJsArray = exports.SIZEOF_FLOAT32 = exports.SIZEOF_NUMBER = void 0;
var Guard_1 = require("../../Core/Guard");
exports.SIZEOF_NUMBER = 8;
exports.SIZEOF_FLOAT32 = 4;
/**
 * Inserts the values from the source Js array into the destination wasm array (and resizes) at index destIndex
 * @param wasmContext
 * @param source
 * @param dest
 * @param destIndex
 */
function insertDoubleVectorFromJsArray(wasmContext, source, dest, destIndex) {
    // Sanity checks
    Guard_1.Guard.notNull(wasmContext, "wasmContext");
    Guard_1.Guard.notNull(source, "source");
    Guard_1.Guard.notNull(dest, "dest");
    Guard_1.Guard.isTrue(destIndex >= 0, "destIndex must be greater than or equal to zero");
    Guard_1.Guard.isTrue(destIndex <= dest.size(), "destIndex must be less than or equal to dest.size()");
    var count = source.length;
    if (count === 0)
        return;
    var beforeSize = dest.size();
    // Resize the dest vector to fit memory
    dest.resizeFast(beforeSize + count);
    // Shift memory up for the insert
    if (destIndex < beforeSize) {
        wasmContext.SCRTMemMove(dest.dataPtr(destIndex + count), // Dest
        dest.dataPtr(destIndex), // Src
        (beforeSize - destIndex) * exports.SIZEOF_NUMBER); // count in bytes
    }
    // Overwrite dest memory with Js array
    // @ts-ignore
    wasmContext.HEAPF64.set(source, dest.dataPtr(destIndex) / exports.SIZEOF_NUMBER);
}
exports.insertDoubleVectorFromJsArray = insertDoubleVectorFromJsArray;
/**
 * Copies the values from the source Js array into the destination wasm array (and resizes) at index destIndex
 * @param wasmContext
 * @param source
 * @param dest
 * @param destIndex
 */
function memCopyFloat32(wasmContext, source, dest, destIndex) {
    // Sanity checks
    Guard_1.Guard.notNull(wasmContext, "wasmContext");
    Guard_1.Guard.notNull(source, "source");
    Guard_1.Guard.notNull(dest, "dest");
    Guard_1.Guard.isTrue(destIndex >= 0, "destIndex must be greater than or equal to zero");
    Guard_1.Guard.isTrue(destIndex <= dest.size() + source.length, "destIndex must be less than or equal to dest.size() + source.Length");
    var count = source.length;
    if (count === 0)
        return;
    // Overwrite dest memory with Js array
    // @ts-ignore
    wasmContext.HEAPF32.set(source, dest.dataPtr(destIndex) / exports.SIZEOF_FLOAT32);
}
exports.memCopyFloat32 = memCopyFloat32;
/**
 * Resizes the destinationVector by jsArray.length and copies the values into it
 * @param wasmContext
 * @param destinationVector
 * @param jsArray
 * @param experimentalMethod
 */
function appendDoubleVectorFromJsArray(wasmContext, destinationVector, jsArray, experimentalMethod) {
    if (experimentalMethod === void 0) { experimentalMethod = true; }
    var buffer;
    try {
        if (experimentalMethod) {
            var vectorSize = destinationVector.size();
            var arraySize = jsArray.length;
            var startPosition = vectorSize;
            var endPosition = startPosition + arraySize;
            // Resize without initializing values
            destinationVector.resizeFast(endPosition);
            // Get pointer to destination
            var bufferPointer = destinationVector.dataPtr(startPosition);
            // HEAPF64.set copies js array into buffer pointer
            // @ts-ignore
            wasmContext.HEAPF64.set(jsArray, bufferPointer / exports.SIZEOF_NUMBER);
        }
        else {
            var vectorSize = destinationVector.size();
            var arraySize = jsArray.length;
            var startPosition = vectorSize;
            var endPosition = startPosition + arraySize;
            /// because plain c functions were receiving the object pointer as null, this is the way around that...
            wasmContext.SCRTSetActiveDoubleVector(destinationVector, vectorSize);
            // Allocate some space in the heap for the data (making sure to use the appropriate memory size of the elements)
            // @ts-ignore
            buffer = wasmContext._malloc(arraySize * 8);
            // Assign the data to the heap - Keep in mind bytes per element
            // @ts-ignore
            wasmContext.HEAPF64.set(jsArray, buffer / exports.SIZEOF_NUMBER);
            // Finally, call the function
            // Here we use start position 0 and the end position array.length
            // @ts-ignore
            wasmContext.ccall("SCRTFillActiveDoubleVector", null, ["number", "number", "number"], [buffer, startPosition, endPosition]);
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        // To avoid memory leaks we need to always clear out the allocated heap data
        if (buffer) {
            // @ts-ignore
            wasmContext._free(buffer);
        }
    }
}
exports.appendDoubleVectorFromJsArray = appendDoubleVectorFromJsArray;
