"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIFOVectorProvider = exports.DoubleVectorProvider = void 0;
var NumberArray_1 = require("../../types/NumberArray");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var DoubleVectorProvider = /** @class */ (function () {
    function DoubleVectorProvider() {
    }
    DoubleVectorProvider.prototype.getDoubleVector = function (wasmContext) {
        if (this.capacity) {
            return new wasmContext.SCRTDoubleVector(this.capacity);
        }
        else {
            return new wasmContext.SCRTDoubleVector();
        }
    };
    DoubleVectorProvider.prototype.appendArray = function (wasmContext, destinationVector, jsArray) {
        (0, appendDoubleVectorFromJsArray_1.appendDoubleVectorFromJsArray)(wasmContext, destinationVector, jsArray);
    };
    return DoubleVectorProvider;
}());
exports.DoubleVectorProvider = DoubleVectorProvider;
// tslint:disable-next-line: max-classes-per-file
var FIFOVectorProvider = /** @class */ (function () {
    function FIFOVectorProvider(fifoCapacity) {
        this.capacity = fifoCapacity;
    }
    FIFOVectorProvider.prototype.getDoubleVector = function (wasmContext) {
        return new wasmContext.SCRTFifoVector(this.capacity);
    };
    FIFOVectorProvider.prototype.appendArray = function (wasmContext, destinationVector, jsArray) {
        var vectorSize = destinationVector.size();
        var fifoCapacity = destinationVector.capacity();
        var arraySize = jsArray.length;
        var startIndex = destinationVector.getStartIndex();
        //console.log(vectorSize, startIndex, fifoCapactiy, arraySize);
        if (fifoCapacity >= vectorSize + arraySize) {
            // Space to append all data.  Use normal method
            // Get pointer to destination
            var bufferPointer = destinationVector.dataPtr(vectorSize);
            // HEAPF64.set copies js array into buffer pointer
            // @ts-ignore
            wasmContext.HEAPF64.set(jsArray, bufferPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            destinationVector.notifyAppend(arraySize);
        }
        else if (arraySize > fifoCapacity) {
            // new data is larger than buffer.  Replace buffer with end of data
            var dataIndex = arraySize - fifoCapacity;
            var dataThatWillFit = (0, NumberArray_1.subArray)(jsArray, dataIndex);
            var zeroPointer = destinationVector.dataPtrZero();
            // @ts-ignore
            wasmContext.HEAPF64.set(dataThatWillFit, zeroPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            destinationVector.notifyAppend(fifoCapacity);
        }
        else if (fifoCapacity > vectorSize) {
            // buffer not full yet, but new data will overflow
            var remainingCap = fifoCapacity - vectorSize;
            var dataStart = (0, NumberArray_1.subArray)(jsArray, 0, remainingCap);
            var endPointer = destinationVector.dataPtr(vectorSize);
            // @ts-ignore
            wasmContext.HEAPF64.set(dataStart, endPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            var dataEnd = (0, NumberArray_1.subArray)(jsArray, remainingCap);
            var zeroPointer = destinationVector.dataPtrZero();
            // @ts-ignore
            wasmContext.HEAPF64.set(dataEnd, zeroPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            destinationVector.notifyAppend(arraySize);
        }
        else {
            // buffer already full
            if (startIndex + arraySize > fifoCapacity) {
                // need to do two writes
                var remainingCap = fifoCapacity - startIndex;
                var dataStart = (0, NumberArray_1.subArray)(jsArray, 0, remainingCap);
                var endPointer = destinationVector.dataPtr(0);
                // @ts-ignore
                wasmContext.HEAPF64.set(dataStart, endPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
                var dataEnd = (0, NumberArray_1.subArray)(jsArray, remainingCap);
                var zeroPointer = destinationVector.dataPtrZero();
                // @ts-ignore
                wasmContext.HEAPF64.set(dataEnd, zeroPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            }
            else {
                var endPointer = destinationVector.dataPtr(0);
                // @ts-ignore
                wasmContext.HEAPF64.set(jsArray, endPointer / appendDoubleVectorFromJsArray_1.SIZEOF_NUMBER);
            }
            destinationVector.notifyAppend(arraySize);
        }
        // const newSize = destinationVector.size();
        // const newstartIndex = destinationVector.getStartIndex();
        // console.log(newSize, newstartIndex);
    };
    return FIFOVectorProvider;
}());
exports.FIFOVectorProvider = FIFOVectorProvider;
