"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtremeResamplerHelper = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var hash_1 = require("../../../utils/hash");
var ResamplingMode_1 = require("./ResamplingMode");
var ResamplingParams_1 = require("./ResamplingParams");
/**
 * Helper class for functions which optimise drawing
 */
var ExtremeResamplerHelper = /** @class */ (function (_super) {
    __extends(ExtremeResamplerHelper, _super);
    function ExtremeResamplerHelper(wasmContext) {
        var _this = _super.call(this) || this;
        _this.isDeleted = false;
        _this.nativeMergeIndexParams = new wasmContext.SCRTDoubleResamplerMergeIndicesParams();
        _this.wasmContext = wasmContext;
        _this.nativeResampler = new _this.wasmContext.SCRTDoubleResampler();
        _this.xInput = new _this.wasmContext.SCRTXvaluesProvider();
        _this.nativeArgs = new _this.wasmContext.ResamplingArgs();
        _this.output = new _this.wasmContext.SCRTDoubleArraysXyResampleOutput();
        return _this;
    }
    /**
     * Used internally
     * @param xAxis
     * @param rs
     * @param seriesViewRect
     */
    ExtremeResamplerHelper.resampleSeries = function (xAxis, rs, seriesViewRect) {
        /**
         * Stacked series and Heatmap do not support resampling
         * If a series does not support resampling, the pointSeries is not used in the drawing provider.
         * For example, UniformHeatmapDrawingProvider does not use renderPassData.pointSeries,
         * but LineSeriesDrawingProvider use renderPassData.pointSeries in the draw() method!
         */
        if (!rs.supportsResampling)
            return {
                pointSeries: rs.toPointSeries(),
                renderableSeries: rs,
                indicesRange: rs.isStacked ? undefined : rs.getIndicesRange(xAxis.visibleRange, xAxis.isCategoryAxis),
                resamplingHash: undefined
            };
        var rp = rs.getResamplingParams();
        var prevRPD = rs.getCurrentRenderPassData();
        if (!rp || (rp.resampleRequired && !prevRPD)) {
            // in tests, renderPassData is not set back on the series.
            rp = new ResamplingParams_1.ResamplingParams(seriesViewRect, rs, xAxis);
            if (!rs.needsResampling(rp))
                return {
                    pointSeries: rs.toPointSeries(),
                    renderableSeries: rs,
                    indicesRange: rp.indexesRange,
                    resamplingHash: undefined
                };
            var resamplingHash = ExtremeResamplerHelper.calculateResamplingHash(rs, rp);
            var prevRPD_1 = rs.getCurrentRenderPassData();
            var useFromCache = Boolean(prevRPD_1 && prevRPD_1.resamplingHash === resamplingHash);
            // console.log("resampling ...");
            // console.log("useFromCache", useFromCache);
            var pointSeries = useFromCache ? prevRPD_1.pointSeries : rs.toPointSeries(rp);
            return {
                pointSeries: pointSeries,
                renderableSeries: rs,
                indicesRange: rp.indexesRange,
                resamplingHash: resamplingHash
            };
        }
        else if (rp.resampleRequired) {
            return {
                pointSeries: prevRPD.pointSeries,
                renderableSeries: rs,
                indicesRange: rp.indexesRange,
                resamplingHash: rp.hash
            };
        }
        else {
            return {
                pointSeries: rs.toPointSeries(),
                renderableSeries: rs,
                indicesRange: rp.indexesRange,
                resamplingHash: undefined
            };
        }
    };
    ExtremeResamplerHelper.calculateResamplingHash = function (rs, rp) {
        var hashes = [];
        var dataSeries = rs.dataSeries;
        if (dataSeries) {
            var dataSeriesHash = hash_1.hashUtils.generateHash(dataSeries.id);
            hashes.push(dataSeriesHash);
            var dataSeriesCountHash = hash_1.hashUtils.generateNumberHash(dataSeries.count());
            hashes.push(dataSeriesCountHash);
            var dataSeriesSortedHash = hash_1.hashUtils.generateBooleanHash(dataSeries.dataDistributionCalculator.isSortedAscending);
            hashes.push(dataSeriesSortedHash);
            var dataSeriesChangeCountHash = hash_1.hashUtils.generateNumberHash(dataSeries.changeCount);
            hashes.push(dataSeriesChangeCountHash);
        }
        var resamplingParamsHash = hash_1.hashUtils.generateObjectHash(rp);
        hashes.push(resamplingParamsHash);
        rp.hash = hash_1.hashUtils.generateCombinedHash(hashes);
        return rp.hash;
    };
    /**
     * Calls native RequiresReduction method to calculate if resampling is needed
     * @param rp The resampling params
     * @param xOriginalValues XValues
     * @param fillBasicNativeArgs Update nativeArgs if True
     * @param updateResamplingMode Update {@link ResamplingArgs.Resampling} property if True
     */
    ExtremeResamplerHelper.prototype.needsResampling = function (rp, xOriginalValues, fillBasicNativeArgs, updateResamplingMode) {
        if (fillBasicNativeArgs === void 0) { fillBasicNativeArgs = true; }
        if (updateResamplingMode === void 0) { updateResamplingMode = false; }
        if (fillBasicNativeArgs)
            this.resetAndFillBasicNativeArgs(rp, xOriginalValues);
        var requiresReduction = this.nativeResampler.RequiresReduction(this.nativeArgs);
        var needsResampling = rp.dataIsFifo || requiresReduction;
        if ((updateResamplingMode && !needsResampling) || (needsResampling && !requiresReduction)) {
            this.nativeArgs.Resampling = this.getNativeResamplingMode(ResamplingMode_1.EResamplingMode.None);
        }
        return needsResampling;
    };
    /**
     * This method calls does resampling by calling the native resampling methods.
     * It does similar things as WPF AvxExtremeResamplerDoubleDouble.ResampleInternal() method
     * The needsResampling() method must be called before, this is done in {@link SciChartRenderer.resampleSeries}
     * @param wasmContext The WebAssembly context
     * @param rp The resampling parameters
     * @param xOriginalValues The original not resampled X values
     * @param yOriginalValues The original not resampled Y values
     * @param indexesOut The indices output
     * @param xResampledValuesOut The resampled X values output
     * @param yResampledValuesOut The resampled Y values output
     * @param fillBasicNativeArgs If set to True resets and fill nativeArgs with basic properties,
     * you can set it to False if {@link needsResampling()} was called before this method
     * @returns indicesVector The resampled vector of indices
     */
    ExtremeResamplerHelper.prototype.resampleIntoPointSeries = function (wasmContext, rp, xOriginalValues, yOriginalValues, indexesOut, indexesResampledOut, xResampledValuesOut, yResampledValuesOut, fillBasicNativeArgs) {
        if (fillBasicNativeArgs === void 0) { fillBasicNativeArgs = true; }
        if (this.isDeleted) {
            throw new Error("should not call resampleIntoPointSeries() if deleted");
        }
        Guard_1.Guard.notNull(xOriginalValues, "xDataValues");
        Guard_1.Guard.notNull(yOriginalValues, "yDataValues");
        Guard_1.Guard.notNull(xOriginalValues, "xOriginalValues");
        Guard_1.Guard.notNull(yOriginalValues, "yOriginalValues");
        Guard_1.Guard.notNull(rp, "resamplingParams");
        if (fillBasicNativeArgs)
            this.resetAndFillBasicNativeArgs(rp, xOriginalValues);
        // Set X Values
        this.xInput.SetInput(xOriginalValues);
        this.nativeArgs.ResamplingPrecision = rp.precision;
        this.nativeArgs.ZeroLineY = rp.zeroLineY;
        this.nativeArgs.NewDataPointCount = -1;
        if (fillBasicNativeArgs === true) {
            this.needsResampling(rp, xOriginalValues, false, true);
        }
        //this.debugParameters(rp, this.nativeArgs);
        // What does this method do???
        var requestedSize = this.nativeResampler.UpdateIndices(indexesOut, this.xInput, yOriginalValues, this.nativeArgs.Resampling, this.nativeArgs);
        // SC-5145 Adds +1 to be sure that reserved Capacity is not less than the actual resampled count,
        // otherwise resampledXValues and resampledYValues will be recreated with default 0.0 values
        if (indexesResampledOut) {
            indexesResampledOut.resizeFast(requestedSize + 1);
        }
        xResampledValuesOut.resizeFast(requestedSize + 1);
        yResampledValuesOut.resizeFast(requestedSize + 1);
        if (indexesResampledOut) {
            this.output.ResetWithIndices(indexesResampledOut, xResampledValuesOut, yResampledValuesOut);
        }
        else {
            this.output.Reset(xResampledValuesOut, yResampledValuesOut);
        }
        // Execute resampling and update indexesOut vector
        this.nativeResampler.Execute(this.xInput, yOriginalValues, this.output, indexesOut, this.nativeArgs.Resampling, this.nativeArgs);
        var resultCount = indexesOut.size();
        //console.log("indexes from rs",resultCount, indexesOut.get(resultCount - 2), indexesOut.get(resultCount - 1));
        if (indexesResampledOut) {
            indexesResampledOut.resizeFast(resultCount);
        }
        xResampledValuesOut.resizeFast(resultCount);
        yResampledValuesOut.resizeFast(resultCount);
        return { OutputSplitIndex: this.output.OutputSplitIndex || this.nativeArgs.OutputSplitIndex };
    };
    ExtremeResamplerHelper.prototype.mergeIndexes = function (indices, size1, size2, mergedIndicesOut) {
        return this.nativeResampler.MergeIndices(indices, size1, size2, mergedIndicesOut);
    };
    ExtremeResamplerHelper.prototype.copyValuesByIndexes = function (indices, xValues, yValues, y1Values, count, isCategoryAxis, isFifoSweeping, indicesOut, xValuesOut, yValuesOut, y1ValuesOut, y1Offset) {
        if (y1Offset === void 0) { y1Offset = 0; }
        var mp = this.nativeMergeIndexParams;
        mp.SetIndices(indices);
        mp.SetXInput(xValues);
        mp.SetYInput(yValues);
        mp.SetY1Input(y1Values);
        mp.SetY1Offset(y1Offset);
        mp.count = count;
        mp.isCategoryData = isCategoryAxis;
        mp.isFifoSweeping = isFifoSweeping;
        mp.SetIndicesOut(indicesOut);
        mp.SetXOut(xValuesOut);
        mp.SetYOut(yValuesOut);
        mp.SetY1Out(y1ValuesOut);
        this.nativeResampler.CopyValuesByIndices(mp);
    };
    /** @inheritDoc */
    ExtremeResamplerHelper.prototype.delete = function () {
        if (!this.isDeleted) {
            (0, Deleter_1.deleteSafe)(this.nativeResampler);
            (0, Deleter_1.deleteSafe)(this.xInput);
            (0, Deleter_1.deleteSafe)(this.nativeArgs);
            (0, Deleter_1.deleteSafe)(this.output);
            (0, Deleter_1.deleteSafe)(this.nativeMergeIndexParams);
            this.isDeleted = true;
            this.wasmContext = undefined;
        }
    };
    ExtremeResamplerHelper.prototype.getNativeResamplingMode = function (resamplingMode) {
        switch (resamplingMode) {
            case ResamplingMode_1.EResamplingMode.Auto:
                return this.wasmContext.ResamplingMode.Auto;
            case ResamplingMode_1.EResamplingMode.Max:
                return this.wasmContext.ResamplingMode.Max;
            case ResamplingMode_1.EResamplingMode.Mid:
                return this.wasmContext.ResamplingMode.Mid;
            case ResamplingMode_1.EResamplingMode.Min:
                return this.wasmContext.ResamplingMode.Min;
            case ResamplingMode_1.EResamplingMode.MinMax:
                return this.wasmContext.ResamplingMode.MinMax;
            case ResamplingMode_1.EResamplingMode.MinOrMax:
                return this.wasmContext.ResamplingMode.MinOrMax;
            case ResamplingMode_1.EResamplingMode.None:
                return this.wasmContext.ResamplingMode.None;
            default:
                throw new Error("Unknown resamplingMode ".concat(resamplingMode));
        }
    };
    /**
     * Fills basic native args needed for {@link needsResampling()} and {@link resampleIntoPointSeries} methods
     */
    ExtremeResamplerHelper.prototype.resetAndFillBasicNativeArgs = function (rp, xOriginalValues) {
        this.nativeArgs.Reset();
        this.nativeArgs.Data = this.getDataDistribution(rp.dataEvenlySpaced, rp.isCategoryAxis);
        this.nativeArgs.StartIndex = rp.indexesRange.min;
        this.nativeArgs.EndIndex = rp.indexesRange.max;
        this.nativeArgs.MaxXInclusive = rp.xVisibleRange.max;
        this.nativeArgs.MinXInclusive = rp.xVisibleRange.min;
        this.nativeArgs.Resampling = this.getNativeResamplingMode(rp.resamplingMode);
        this.nativeArgs.ViewportWidth = rp.viewportSize;
        this.nativeArgs.FifoCapacity = rp.fifoCapacity || 0;
        this.nativeArgs.HasNaN = rp.dataHasNaN;
        this.nativeArgs.IsFifo = rp.dataIsFifo;
        this.nativeArgs.InputBaseIndex = rp.fifoStartIndex || 0;
        if (rp.isCategoryAxis) {
            this.nativeArgs.MinXInclusive = rp.indexesRange.min;
            this.nativeArgs.MaxXInclusive = rp.indexesRange.max;
        }
        else if (rp.fifoCapacity && !rp.dataIsFifo) {
            // Sweeping on numeric axis, which requires x values to be sorted wrt the raw data, eg x % fifoCapactiy
            var firstPoint = xOriginalValues.getRaw(rp.indexesRange.min);
            var lastPoint = xOriginalValues.getRaw(rp.indexesRange.max);
            this.nativeArgs.MinXInclusive = Math.max(firstPoint, rp.xVisibleRange.min);
            this.nativeArgs.MaxXInclusive = Math.min(lastPoint, rp.xVisibleRange.max);
        }
        else {
            var firstPoint = xOriginalValues.get(rp.indexesRange.min);
            var lastPoint = xOriginalValues.get(rp.indexesRange.max);
            this.nativeArgs.MinXInclusive = Math.max(firstPoint, rp.xVisibleRange.min);
            this.nativeArgs.MaxXInclusive = Math.min(lastPoint, rp.xVisibleRange.max);
        }
    };
    ExtremeResamplerHelper.prototype.debugParameters = function (rp, nativeArgs) {
        console.log(31415);
        console.log("ResamplingParams:");
        console.log(".. zeroLineY: ".concat(rp.zeroLineY));
        console.log(".. resamplingPrecision: ".concat(rp.precision));
        console.log(".. xVisibleRange: ".concat(rp.xVisibleRange));
        console.log(".. indicesRange: ".concat(rp.indexesRange));
        console.log(".. viewportSize: ".concat(rp.viewportSize));
        console.log(".. isCategoryAxis: ".concat(rp.isCategoryAxis));
        console.log(".. isXAxisAutoRanged: ".concat(rp.isXAxisAutoRanged));
        console.log(".. resamplingMode: ".concat(rp.resamplingMode));
        //console.log(`.. renderableSeriesHash: ${rp.renderableSeriesHash}`);
        console.log(".. enableExperimentalResampling: ".concat(rp.enableExperimentalResampling));
        console.log(".. dataHasNan: ".concat(rp.dataHasNaN));
        console.log(".. dataIsFifo: ".concat(rp.dataIsFifo));
        console.log(".. fifoCapacity: ".concat(rp.fifoCapacity));
        console.log(".. dataEvenlySpaced: ".concat(rp.dataEvenlySpaced));
        console.log("native Resampling Args:");
        console.log(".. ResamplingData: ".concat(this.debugResamplingDataEnum(nativeArgs.Data)));
        console.log(".. StartIndex: ".concat(nativeArgs.StartIndex));
        console.log(".. EndIndex: ".concat(nativeArgs.EndIndex));
        console.log(".. FifoCapacity: ".concat(nativeArgs.FifoCapacity));
        console.log(".. HasNaN: ".concat(nativeArgs.HasNaN));
        console.log(".. IsFifo: ".concat(nativeArgs.IsFifo));
        console.log(".. MaxXInclusive: ".concat(nativeArgs.MaxXInclusive));
        console.log(".. MinXInclusive: ".concat(nativeArgs.MinXInclusive));
        console.log(".. ResamplingMode: ".concat(this.debugResamplingModeEnum(nativeArgs.Resampling)));
        console.log(".. ResamplingPrecision: ".concat(nativeArgs.ResamplingPrecision));
        console.log(".. ViewportWidth: ".concat(nativeArgs.ViewportWidth));
        console.log(".. ZeroLineY: ".concat(nativeArgs.ZeroLineY));
        console.log(".. NewDataPointCount: ".concat(nativeArgs.NewDataPointCount));
        console.log(".. InputBaseIndex: ".concat(nativeArgs.InputBaseIndex));
    };
    ExtremeResamplerHelper.prototype.debugRect = function (rect) {
        return "X ".concat(rect.x, " Y ").concat(rect.y, " Width ").concat(rect.width, " Height ").concat(rect.height);
    };
    ExtremeResamplerHelper.prototype.debugResamplingDataEnum = function (resamplingData) {
        return resamplingData === this.wasmContext.ResamplingData.LinearData
            ? "LinearData"
            : resamplingData === this.wasmContext.ResamplingData.CategoryData
                ? "CategoryData"
                : resamplingData === this.wasmContext.ResamplingData.UnsortedData
                    ? "UnsortedData"
                    : resamplingData === this.wasmContext.ResamplingData.UnevenlySpacedData
                        ? "UnevenlySpacedData"
                        : "Unknown";
    };
    ExtremeResamplerHelper.prototype.debugResamplingModeEnum = function (resamplingMode) {
        return resamplingMode === this.wasmContext.ResamplingMode.MinMax
            ? "MinMax"
            : resamplingMode === this.wasmContext.ResamplingMode.Auto
                ? "Auto"
                : "Unknown";
    };
    ExtremeResamplerHelper.prototype.getDataDistribution = function (dataEvenlySpaced, isCategoryAxis) {
        if (isCategoryAxis) {
            return this.wasmContext.ResamplingData.CategoryData;
        }
        return dataEvenlySpaced
            ? this.wasmContext.ResamplingData.LinearData
            : this.wasmContext.ResamplingData.UnevenlySpacedData;
    };
    return ExtremeResamplerHelper;
}(DeletableEntity_1.DeletableEntity));
exports.ExtremeResamplerHelper = ExtremeResamplerHelper;
