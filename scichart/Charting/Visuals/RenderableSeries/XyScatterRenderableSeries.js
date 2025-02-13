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
exports.XyScatterRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var ResamplingMode_1 = require("../../Numerics/Resamplers/ResamplingMode");
var EllipsePointMarker_1 = require("../PointMarkers/EllipsePointMarker");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var DataLabelProvider_1 = require("./DataLabels/DataLabelProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var ScatterSeriesHitTestProvider_1 = require("./HitTest/ScatterSeriesHitTestProvider");
/**
 * Defines a scatter-series or scatter chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a scatter series to a {@link SciChartSurface} you need to declare both the {@link XyScatterRenderableSeries | RenderableSeries}
 * and a {@link XyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyDataSeries(wasmContext);
 * dataSeries.append(1,2);
 * dataSeries.append(1,2);
 * // Create the renderableSeries
 * const scatterSeries = new XyScatterRenderableSeries(wasmContext);
 * scatterSeries.dataSeries = dataSeries;
 * scatterSeries.pointMarker = new EllipsePointMarker(wasmContext, {
 *     width: 9,
 *     height: 9,
 *     fill: "#FF0000",
 *     stroke: "#0000FF",
 *     strokeThickness: 1
 * });
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(scatterSeries);
 * ```
 */
var XyScatterRenderableSeries = /** @class */ (function (_super) {
    __extends(XyScatterRenderableSeries, _super);
    /**
     * Creates an instance of the {@link XyScatterRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeriesOptions} to configure the series
     */
    function XyScatterRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.ScatterSeries;
        _this.scatterOpacityProperty = 1;
        if (!_this.pointMarker) {
            _this.pointMarker = new EllipsePointMarker_1.EllipsePointMarker(webAssemblyContext, { width: 10, height: 10 });
        }
        _this.drawingProviders = [];
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new DataLabelProvider_1.DataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        // Must be called here for the series type to be available
        if ((_a = _this.paletteProvider) === null || _a === void 0 ? void 0 : _a.onAttached) {
            (_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached(_this);
        }
        _this.scatterOpacityProperty = (_c = options === null || options === void 0 ? void 0 : options.opacity) !== null && _c !== void 0 ? _c : _this.scatterOpacityProperty;
        return _this;
    }
    /** @inheritDoc */
    XyScatterRenderableSeries.prototype.needsResampling = function (rp) {
        if (this.dataSeries.fifoCapacity) {
            rp.resamplingMode = ResamplingMode_1.EResamplingMode.None;
            this.resamplerHelper.resetAndFillBasicNativeArgs(rp, this.getNativeXValues());
            return true;
        }
        return false;
    };
    /** @inheritDoc */
    XyScatterRenderableSeries.prototype.newHitTestProvider = function () {
        return new ScatterSeriesHitTestProvider_1.ScatterSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    Object.defineProperty(XyScatterRenderableSeries.prototype, "opacity", {
        /** @inheritDoc */
        get: function () {
            return this.scatterOpacityProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            this.scatterOpacityProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.OPACITY);
            if (this.pointMarker) {
                this.pointMarker.opacity = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.POINT_MARKER);
            }
        },
        enumerable: false,
        configurable: true
    });
    return XyScatterRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.XyScatterRenderableSeries = XyScatterRenderableSeries;
