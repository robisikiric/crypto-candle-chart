"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResamplingParams = void 0;
var AutoRange_1 = require("../../../types/AutoRange");
var ResamplingParams = /** @class */ (function () {
    function ResamplingParams(seriesViewRect, rs, xAxis) {
        this.zeroLineY = 0;
        this.precision = 0;
        this.enableExperimentalResampling = false;
        this.fifoCapacity = 0;
        this.fifoStartIndex = 0;
        if (rs) {
            var dataSeries = rs.dataSeries;
            this.resamplingMode = rs.resamplingMode;
            this.precision = rs.resamplingPrecision;
            if (xAxis) {
                this.indexesRange = rs.getIndicesRange(xAxis.visibleRange, xAxis.isCategoryAxis);
                //console.log("visible range", xAxis.visibleRange.min, xAxis.visibleRange.max);
                //console.log("indexes range", this.indexesRange.min, this.indexesRange.max);
                this.isCategoryAxis = xAxis.isCategoryAxis;
                this.isXAxisAutoRanged = xAxis.autoRange === AutoRange_1.EAutoRange.Always;
                this.xVisibleRange = xAxis.visibleRange;
                this.viewportSize = xAxis.isVerticalChart ? seriesViewRect.height : seriesViewRect.width;
            }
            if (dataSeries) {
                this.dataHasNaN = dataSeries === null || dataSeries === void 0 ? void 0 : dataSeries.dataDistributionCalculator.containsNaN;
                this.dataEvenlySpaced = dataSeries === null || dataSeries === void 0 ? void 0 : dataSeries.isEvenlySpaced;
                this.fifoCapacity = dataSeries.fifoCapacity;
                this.fifoStartIndex = dataSeries.fifoStartIndex;
                // Disabling fifo for sweeping nearly works, but is very unreliable.
                this.dataIsFifo = dataSeries.fifoCapacity > 0 && !dataSeries.fifoSweeping;
            }
        }
    }
    ResamplingParams.prototype.clone = function (options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var rp = new ResamplingParams(undefined, undefined, undefined);
        rp.zeroLineY = (_a = options === null || options === void 0 ? void 0 : options.zeroLineY) !== null && _a !== void 0 ? _a : this.zeroLineY;
        rp.precision = (_b = options === null || options === void 0 ? void 0 : options.precision) !== null && _b !== void 0 ? _b : this.precision;
        rp.xVisibleRange = (_c = options === null || options === void 0 ? void 0 : options.xVisibleRange) !== null && _c !== void 0 ? _c : this.xVisibleRange;
        rp.indexesRange = (_d = options === null || options === void 0 ? void 0 : options.indicesRange) !== null && _d !== void 0 ? _d : this.indexesRange;
        rp.viewportSize = (_e = options === null || options === void 0 ? void 0 : options.viewportSize) !== null && _e !== void 0 ? _e : this.viewportSize;
        rp.isCategoryAxis = (_f = options === null || options === void 0 ? void 0 : options.isCategoryAxis) !== null && _f !== void 0 ? _f : this.isCategoryAxis;
        rp.isXAxisAutoRanged = (_g = options === null || options === void 0 ? void 0 : options.isXAxisAutoRanged) !== null && _g !== void 0 ? _g : this.isXAxisAutoRanged;
        rp.resamplingMode = (_h = options === null || options === void 0 ? void 0 : options.resamplingMode) !== null && _h !== void 0 ? _h : this.resamplingMode;
        rp.enableExperimentalResampling = (_j = options === null || options === void 0 ? void 0 : options.enableExperimentalResampling) !== null && _j !== void 0 ? _j : this.enableExperimentalResampling;
        rp.dataHasNaN = (_k = options === null || options === void 0 ? void 0 : options.dataHasNaN) !== null && _k !== void 0 ? _k : this.dataHasNaN;
        rp.dataEvenlySpaced = (_l = options === null || options === void 0 ? void 0 : options.dataEvenlySpaced) !== null && _l !== void 0 ? _l : this.dataEvenlySpaced;
        rp.fifoCapacity = (_m = options.fifoCapacity) !== null && _m !== void 0 ? _m : this.fifoCapacity;
        rp.fifoStartIndex = (_o = options.fifoStartIndex) !== null && _o !== void 0 ? _o : this.fifoStartIndex;
        rp.dataIsFifo = (_p = options.dataIsFifo) !== null && _p !== void 0 ? _p : this.dataIsFifo;
        return rp;
    };
    return ResamplingParams;
}());
exports.ResamplingParams = ResamplingParams;
