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
exports.ColumnRenderableSeries3D = void 0;
var DefaultPointMarkers_1 = require("../PointMarkers/DefaultPointMarkers");
var ColumnSceneEntity_1 = require("../Primitives/ColumnSceneEntity");
var BaseRenderableSeries3D_1 = require("./BaseRenderableSeries3D");
var Constants_1 = require("./Constants");
var ESeriesType_1 = require("./ESeriesType");
/**
 * Defines a 3D column-series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * To add a column 3D series to a {@link SciChart3DSurface} you need to declare both the {@link ColumnRenderableSeries3D}
 * and a {@link XyzDataSeries3D}. Simplified code sample below:
 *
 * ```ts
 * const sciChart3DSurface: SciChart3DSurface;
 * const wasmContext: TSciChart3D;
 * // Create and fill the dataseries
 * const dataSeries = new XyzDataSeries3D(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(3,4,5);
 * // Create the renderableSeries
 * const columnSeries = new ColumnRenderableSeries3D(wasmContext);
 * columnSeries .dataSeries = dataSeries;
 * columnSeries .pointMarker = new SpherePointMarker3D(wasmContext, {
 *     size: 3,
 *     fill: "#FF0000"
 * });
 * // append to the SciChartSurface
 * sciChart3DSurface.renderableSeries.add(columnSeries );
 * ```
 */
var ColumnRenderableSeries3D = /** @class */ (function (_super) {
    __extends(ColumnRenderableSeries3D, _super);
    /**
     * Creates an instance of a {@link ColumnRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link ColumnRenderableSeries3DOptions} to configure the series
     */
    function ColumnRenderableSeries3D(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = ESeriesType_1.ESeriesType3D.ColumnRenderableSeries3D;
        _this.dataPointWidthXProperty = 1;
        _this.dataPointWidthZProperty = 1;
        _this.useMetadataColorsProperty = false;
        _this.fillProperty = "#FF3333";
        _this.dataPointWidthXProperty = (_a = options === null || options === void 0 ? void 0 : options.dataPointWidthX) !== null && _a !== void 0 ? _a : _this.dataPointWidthXProperty;
        _this.dataPointWidthZProperty = (_b = options === null || options === void 0 ? void 0 : options.dataPointWidthZ) !== null && _b !== void 0 ? _b : _this.dataPointWidthZProperty;
        _this.useMetadataColors = (_c = options === null || options === void 0 ? void 0 : options.useMetadataColors) !== null && _c !== void 0 ? _c : _this.useMetadataColors;
        _this.fillProperty = (_d = options === null || options === void 0 ? void 0 : options.fill) !== null && _d !== void 0 ? _d : _this.fill;
        if (!(options === null || options === void 0 ? void 0 : options.pointMarker)) {
            _this.pointMarkerProperty = new DefaultPointMarkers_1.CubePointMarker3D(webAssemblyContext, { fill: _this.fill });
        }
        _this.setSceneEntity(new ColumnSceneEntity_1.ColumnSceneEntity(webAssemblyContext, _this));
        return _this;
    }
    Object.defineProperty(ColumnRenderableSeries3D.prototype, "pointMarker", {
        /** @inheritDoc */
        get: function () {
            return this.pointMarkerProperty;
        },
        /** @inheritDoc */
        set: function (pointMarker) {
            this.detachPointMarker(this.pointMarkerProperty);
            this.pointMarkerProperty = pointMarker;
            this.attachPointMarker(this.pointMarkerProperty);
            this.notifyPropertyChanged(Constants_1.PROPERTY.POINT_MARKER3D);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnRenderableSeries3D.prototype, "fill", {
        /**
         * Gets or sets the column fill as an HTML Color Code.  This will override the pointMarker fill if set.
         */
        get: function () {
            return this.fillProperty;
        },
        /**
         * Gets or sets the column fill as an HTML Color Code.  This will override the pointMarker fill if set.
         */
        set: function (fill) {
            this.fillProperty = fill;
            this.notifyPropertyChanged(Constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnRenderableSeries3D.prototype, "dataPointWidthX", {
        /**
         * Gets or sets the data point width in X direction in Data Space
         */
        get: function () {
            return this.dataPointWidthXProperty;
        },
        set: function (value) {
            this.dataPointWidthXProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.DATA_POINT_WIDTH_X);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnRenderableSeries3D.prototype, "dataPointWidthZ", {
        /**
         * Gets or sets the data point width in Z direction in Data Space
         */
        get: function () {
            return this.dataPointWidthZProperty;
        },
        set: function (value) {
            this.dataPointWidthZProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.DATA_POINT_WIDTH_Z);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnRenderableSeries3D.prototype, "useMetadataColors", {
        /**
         * Gets or sets flag to do coloring per data-point using metadata vertexColor
         */
        get: function () {
            return this.useMetadataColorsProperty;
        },
        set: function (value) {
            this.useMetadataColorsProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.USE_METADATA_COLORS);
        },
        enumerable: false,
        configurable: true
    });
    /** Calculate the dataPointWidth in pixels. */
    ColumnRenderableSeries3D.prototype.getDataPointWidth = function (rpd, dataPointWidthX, dataPointWidthZ) {
        if (!rpd) {
            return 0;
        }
        var xCoordWidth = Math.abs(rpd.xCalc.getCoordinate(0) - rpd.xCalc.getCoordinate(dataPointWidthX));
        var yCoordWidth = Math.abs(rpd.zCalc.getCoordinate(0) - rpd.zCalc.getCoordinate(dataPointWidthZ));
        return Math.min(xCoordWidth, yCoordWidth);
    };
    return ColumnRenderableSeries3D;
}(BaseRenderableSeries3D_1.BaseRenderableSeries3D));
exports.ColumnRenderableSeries3D = ColumnRenderableSeries3D;
