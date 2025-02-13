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
exports.FastTextRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var ResamplingMode_1 = require("../../Numerics/Resamplers/ResamplingMode");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var TextDataLabelProvider_1 = require("./DataLabels/TextDataLabelProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var TextSeriesHitTestProvider_1 = require("./HitTest/TextSeriesHitTestProvider");
var FastTextRenderableSeries = /** @class */ (function (_super) {
    __extends(FastTextRenderableSeries, _super);
    function FastTextRenderableSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.TextSeries;
        _this.drawingProviders = [];
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new TextDataLabelProvider_1.TextDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    /** @inheritDoc */
    FastTextRenderableSeries.prototype.needsResampling = function (rp) {
        if (this.dataSeries.fifoCapacity) {
            rp.resamplingMode = ResamplingMode_1.EResamplingMode.None;
            this.resamplerHelper.resetAndFillBasicNativeArgs(rp, this.getNativeXValues());
            return true;
        }
        return false;
    };
    FastTextRenderableSeries.prototype.newHitTestProvider = function () {
        return new TextSeriesHitTestProvider_1.TextSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return FastTextRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.FastTextRenderableSeries = FastTextRenderableSeries;
