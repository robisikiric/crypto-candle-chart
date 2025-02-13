"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToBase = exports.fillNoisySinewave = exports.getNoisySinewave = void 0;
var getNoisySinewave = function (pointCount, xMax, frequency, amplitude, noiseAmplitude) {
    // TODO: add noise
    var xValues = [];
    var yValues = [];
    var phase = frequency / xMax;
    var freq = 2 * Math.PI * phase;
    for (var i = 0; i < pointCount; i++) {
        var x = (i * xMax) / (pointCount - 1);
        xValues.push(x);
        var y = amplitude * Math.sin(x * freq);
        var yNoise = (Math.random() - 0.5) * noiseAmplitude;
        yValues.push(y + yNoise);
    }
    return [xValues, yValues];
};
exports.getNoisySinewave = getNoisySinewave;
var fillNoisySinewave = function (pointCount, xMax, frequency, amplitude, noiseAmplitude, dataSeries) {
    var phase = frequency / xMax;
    var freq = 2 * Math.PI * phase;
    var xValues = dataSeries.getNativeXValues();
    var yValues = dataSeries.getNativeYValues();
    xValues.reserve(pointCount);
    yValues.reserve(pointCount);
    for (var i = 0; i < pointCount; i++) {
        var x = (i * xMax) / (pointCount - 1);
        var y = amplitude * Math.sin(x * freq);
        var yNoise = (Math.random() - 0.5) * noiseAmplitude;
        xValues.push_back(x);
        yValues.push_back(y + yNoise);
    }
};
exports.fillNoisySinewave = fillNoisySinewave;
var logToBase = function (n, base) {
    if (base === 10) {
        return Math.log10(n);
    }
    return Math.log(n) / (base ? Math.log(base) : 1);
};
exports.logToBase = logToBase;
