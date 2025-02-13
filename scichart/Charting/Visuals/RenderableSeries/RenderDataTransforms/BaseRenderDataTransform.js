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
exports.OhlcBaseRenderDataTransform = exports.XyyBaseRenderDataTransform = exports.XyBaseRenderDataTransform = exports.BaseRenderDataTransform = void 0;
var DeletableEntity_1 = require("../../../../Core/DeletableEntity");
var Deleter_1 = require("../../../../Core/Deleter");
var Guard_1 = require("../../../../Core/Guard");
var NumberRange_1 = require("../../../../Core/NumberRange");
var OhlcPointSeriesResampled_1 = require("../../../Model/PointSeries/OhlcPointSeriesResampled");
var XyPointSeriesResampled_1 = require("../../../Model/PointSeries/XyPointSeriesResampled");
var XyyPointSeriesResampled_1 = require("../../../Model/PointSeries/XyyPointSeriesResampled");
var RenderPassData_1 = require("../../../Services/RenderPassData");
/**
 * An abstract base class for RenderDataTransforms.  Use these to convert data immediately before drawing.
 */
var BaseRenderDataTransform = /** @class */ (function (_super) {
    __extends(BaseRenderDataTransform, _super);
    function BaseRenderDataTransform(parentSeries, wasmContext, drawingProviders) {
        var _this = _super.call(this) || this;
        /** @inheritDoc */
        _this.requiresTransform = true;
        /** @inheritDoc */
        _this.useForYRange = false;
        _this.parentSeries = parentSeries;
        _this.wasmContext = wasmContext;
        _this.parentSeries.dataSeries;
        _this.pointSeries = _this.createPointSeries();
        _this.drawingProviders = drawingProviders !== null && drawingProviders !== void 0 ? drawingProviders : [];
        return _this;
    }
    /** @inheritDoc */
    BaseRenderDataTransform.prototype.runTransform = function (renderPassData) {
        if (this.requiresTransform ||
            (renderPassData.indexRange && !renderPassData.indexRange.equals(this.lastIndexRange)) ||
            (renderPassData.resamplingHash && renderPassData.resamplingHash !== this.lastResamplingHash)) {
            Guard_1.Guard.notNull(renderPassData, "renderPassData");
            Guard_1.Guard.notNull(renderPassData.pointSeries, "renderPassData.pointSeries");
            var ps = this.runTransformInternal(renderPassData);
            if (ps === this.pointSeries) {
                this.requiresTransform = false;
            }
            this.lastIndexRange = renderPassData.indexRange;
            this.lastResamplingHash = renderPassData.resamplingHash;
            return this.makeRenderPassData(renderPassData, ps);
        }
        return this.makeRenderPassData(renderPassData, this.pointSeries);
    };
    /** @inheritDoc */
    BaseRenderDataTransform.prototype.onDataChange = function (args) {
        this.requiresTransform = true;
    };
    BaseRenderDataTransform.prototype.delete = function () {
        this.pointSeries = (0, Deleter_1.deleteSafe)(this.pointSeries);
        this.wasmContext = undefined;
    };
    BaseRenderDataTransform.prototype.makeRenderPassData = function (originalRPD, pointSeries) {
        var indexRange = new NumberRange_1.NumberRange(0, pointSeries.xValues.size() - 1);
        pointSeries.xRange = originalRPD.pointSeries.xRange;
        pointSeries.fifoStartIndex = originalRPD.pointSeries.fifoStartIndex;
        return new RenderPassData_1.RenderPassData(indexRange, originalRPD.getxCoordinateCalculator, originalRPD.getyCoordinateCalculator, originalRPD.isVerticalChart, pointSeries, originalRPD.resamplingHash);
    };
    return BaseRenderDataTransform;
}(DeletableEntity_1.DeletableEntity));
exports.BaseRenderDataTransform = BaseRenderDataTransform;
/**
 * A base class for a {@link IRenderDataTransform} that returns XyPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
var XyBaseRenderDataTransform = /** @class */ (function (_super) {
    __extends(XyBaseRenderDataTransform, _super);
    function XyBaseRenderDataTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XyBaseRenderDataTransform.prototype.createPointSeries = function () {
        return new XyPointSeriesResampled_1.XyPointSeriesResampled(this.wasmContext, new NumberRange_1.NumberRange(0, 0));
    };
    XyBaseRenderDataTransform.prototype.runTransformInternal = function (renderPassData) {
        throw new Error("runTransformInternal not implemented.");
    };
    return XyBaseRenderDataTransform;
}(BaseRenderDataTransform));
exports.XyBaseRenderDataTransform = XyBaseRenderDataTransform;
/**
 * A base class for a {@link IRenderDataTransform} that returns XyyPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
var XyyBaseRenderDataTransform = /** @class */ (function (_super) {
    __extends(XyyBaseRenderDataTransform, _super);
    function XyyBaseRenderDataTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XyyBaseRenderDataTransform.prototype.createPointSeries = function () {
        return new XyyPointSeriesResampled_1.XyyPointSeriesResampled(this.wasmContext, new NumberRange_1.NumberRange(0, 0));
    };
    XyyBaseRenderDataTransform.prototype.runTransformInternal = function (renderPassData) {
        throw new Error("runTransformInternal not implemented.");
    };
    return XyyBaseRenderDataTransform;
}(BaseRenderDataTransform));
exports.XyyBaseRenderDataTransform = XyyBaseRenderDataTransform;
/**
 * A base class for a {@link IRenderDataTransform} that returns OhlcPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
var OhlcBaseRenderDataTransform = /** @class */ (function (_super) {
    __extends(OhlcBaseRenderDataTransform, _super);
    function OhlcBaseRenderDataTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OhlcBaseRenderDataTransform.prototype.createPointSeries = function () {
        return new OhlcPointSeriesResampled_1.OhlcPointSeriesResampled(this.wasmContext, new NumberRange_1.NumberRange(0, 0));
    };
    OhlcBaseRenderDataTransform.prototype.runTransformInternal = function (renderPassData) {
        throw new Error("runTransformInternal not implemented.");
    };
    return OhlcBaseRenderDataTransform;
}(BaseRenderDataTransform));
exports.OhlcBaseRenderDataTransform = OhlcBaseRenderDataTransform;
