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
exports.PointLineRenderableSeries3D = void 0;
var PointLine3DSceneEntity_1 = require("../Primitives/PointLine3DSceneEntity");
var BaseRenderableSeries3D_1 = require("./BaseRenderableSeries3D");
var Constants_1 = require("./Constants");
var ESeriesType_1 = require("./ESeriesType");
/**
 * Defines a 3D poine-line series or 3D line chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * To add a 3D line series to a {@link SciChart3DSurface} you need to declare both the {@link PointLineRenderableSeries3D}
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
 * const lineSeries3D = new PointLineRenderableSeries3D(wasmContext);
 * lineSeries3D.dataSeries = dataSeries;
 * lineSeries3D.pointMarker = new SpherePointMarker3D(wasmContext, {
 *     size: 3,
 *     fill: "#FF0000"
 * });
 * // append to the SciChartSurface
 * sciChart3DSurface.renderableSeries.add(lineSeries3D);
 * ```
 */
var PointLineRenderableSeries3D = /** @class */ (function (_super) {
    __extends(PointLineRenderableSeries3D, _super);
    /**
     * Creates an instance of a {@link PointLineRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeries3DOptions} to configure the series
     */
    function PointLineRenderableSeries3D(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ESeriesType_1.ESeriesType3D.PointLineRenderableSeries3D;
        _this.strokeThicknessProperty = (_a = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _a !== void 0 ? _a : 2;
        _this.isLineStripProperty = (_b = options === null || options === void 0 ? void 0 : options.isLineStrip) !== null && _b !== void 0 ? _b : true;
        _this.isAntiAliasedProperty = (_c = options === null || options === void 0 ? void 0 : options.isAntiAliased) !== null && _c !== void 0 ? _c : true;
        _this.setSceneEntity(new PointLine3DSceneEntity_1.PointLine3DSceneEntity(webAssemblyContext, _this));
        return _this;
    }
    Object.defineProperty(PointLineRenderableSeries3D.prototype, "strokeThickness", {
        get: function () {
            return this.strokeThicknessProperty;
        },
        set: function (value) {
            this.strokeThicknessProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointLineRenderableSeries3D.prototype, "isLineStrip", {
        get: function () {
            return this.isLineStripProperty;
        },
        set: function (value) {
            this.isLineStripProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.IS_LINE_STRIP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointLineRenderableSeries3D.prototype, "isAntiAliased", {
        get: function () {
            return this.isAntiAliasedProperty;
        },
        set: function (value) {
            this.isAntiAliasedProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.IS_ANTIALIASED);
        },
        enumerable: false,
        configurable: true
    });
    return PointLineRenderableSeries3D;
}(BaseRenderableSeries3D_1.BaseRenderableSeries3D));
exports.PointLineRenderableSeries3D = PointLineRenderableSeries3D;
