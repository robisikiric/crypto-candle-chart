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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapLegend = void 0;
var Guard_1 = require("../../Core/Guard");
var NumberRange_1 = require("../../Core/NumberRange");
var zeroArray2D_1 = require("../../utils/zeroArray2D");
var UniformHeatmapDataSeries_1 = require("../Model/UniformHeatmapDataSeries");
var NumericAxis_1 = require("./Axis/NumericAxis");
var HeatmapColorMap_1 = require("./RenderableSeries/HeatmapColorMap");
var UniformHeatmapRenderableSeries_1 = require("./RenderableSeries/UniformHeatmapRenderableSeries");
var SciChartSurface_1 = require("./SciChartSurface");
var Deleter_1 = require("../../Core/Deleter");
var DeletableEntity_1 = require("../../Core/DeletableEntity");
/**
 * @summary The HeatmapLegend displays a control which hosts a {@link SciChartSurface} in a specific Div on the chart.
 * The legend contains a gradient fill and can be used in conjunction with {@link UniformHeatmapRenderableSeries},
 * {@link NonUniformHeatmapRenderableSeries} or {@link SurfaceMeshRenderableSeries3D} to allow the user to see what colors map
 * to what values on the heatmap or surface.
 * @remarks This control will expand to fit its parent Div. Suggest placing the div to the right and floating 100px wide to
 * create a good effect.
 */
var HeatmapLegend = /** @class */ (function (_super) {
    __extends(HeatmapLegend, _super);
    /**
     * Creates a new HeatmapLegend wrapping a SciChartSurface. Use the {@link HeatmapLegend.create()} function to create this asynchronously
     * @param sciChartSurface
     * @param options
     */
    function HeatmapLegend(sciChartSurface, options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        _this = _super.call(this) || this;
        _this.SIZE = 100;
        Guard_1.Guard.notNull(sciChartSurface, "sciChartSurface");
        _this.sciChartSurface = sciChartSurface;
        _this.wasmContext = sciChartSurface.webAssemblyContext2D;
        var minimum = (_b = (_a = options === null || options === void 0 ? void 0 : options.colorMap) === null || _a === void 0 ? void 0 : _a.minimum) !== null && _b !== void 0 ? _b : 0;
        var maximum = (_d = (_c = options === null || options === void 0 ? void 0 : options.colorMap) === null || _c === void 0 ? void 0 : _c.maximum) !== null && _d !== void 0 ? _d : 100;
        var gradientStops = (_f = (_e = options === null || options === void 0 ? void 0 : options.colorMap) === null || _e === void 0 ? void 0 : _e.gradientStops) !== null && _f !== void 0 ? _f : _this.getDefaultGradientStops();
        // Add an XAxis and YAxis. Ensure properties are set via options
        sciChartSurface.xAxes.add(new NumericAxis_1.NumericAxis(_this.wasmContext, __assign({}, _this.getDefaultXAxisOptions())));
        sciChartSurface.yAxes.add(new NumericAxis_1.NumericAxis(_this.wasmContext, __assign(__assign(__assign({}, _this.getDefaultYAxisOptions()), options === null || options === void 0 ? void 0 : options.yAxisOptions), { visibleRange: new NumberRange_1.NumberRange(minimum, maximum) })));
        // Create a 1D array of size 100, 1. This will be filled with values from 0...99 which will
        // be mapped to colours according to the colorMap below.
        var zValues = _this.getZValues(minimum, maximum);
        // Add a heatmap with 1D data. This contains a 1x100 array of values equal to 0...99.
        // the values are mapped ot a colormap with the same gradient stops as the 3d chart. result is a 3d chart heat legend
        sciChartSurface.renderableSeries.add(new UniformHeatmapRenderableSeries_1.UniformHeatmapRenderableSeries(_this.wasmContext, {
            dataSeries: new UniformHeatmapDataSeries_1.UniformHeatmapDataSeries(_this.wasmContext, {
                xStart: 0,
                xStep: 1,
                yStart: minimum,
                yStep: (maximum - minimum) / _this.SIZE,
                zValues: zValues
            }),
            useLinearTextureFiltering: true,
            colorMap: (_g = options === null || options === void 0 ? void 0 : options.colorMap) !== null && _g !== void 0 ? _g : new HeatmapColorMap_1.HeatmapColorMap({
                minimum: minimum,
                maximum: maximum,
                gradientStops: gradientStops
            })
        }));
        return _this;
    }
    /**
     * Asynchronously creates a {@link HeatmapLegend} and @link TSciChart | WebAssembly Context} to occupy the div by element ID in your DOM.
     * @remarks This method is async and must be awaited
     * @param divElement The Div Element ID or reference where the {@link HeatmapLegend} will reside
     * @param options Optional - Optional parameters for chart creation. See {@link IHeatmapLegendOptions} for more details
     */
    HeatmapLegend.create = function (divElement, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sciChartSurface, wasmContext, heatmapLegend;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, SciChartSurface_1.SciChartSurface.create(divElement, {
                            theme: options === null || options === void 0 ? void 0 : options.theme
                        })];
                    case 1:
                        _a = _b.sent(), sciChartSurface = _a.sciChartSurface, wasmContext = _a.wasmContext;
                        heatmapLegend = new HeatmapLegend(sciChartSurface, options);
                        return [2 /*return*/, { wasmContext: wasmContext, heatmapLegend: heatmapLegend }];
                }
            });
        });
    };
    /**
     * Deletes the {@link HeatmapLegend} control, its {@link innerSciChartSurface} and all associated webassembly memory
     */
    HeatmapLegend.prototype.delete = function () {
        this.sciChartSurface = (0, Deleter_1.deleteSafe)(this.sciChartSurface);
        this.wasmContext = undefined;
    };
    Object.defineProperty(HeatmapLegend.prototype, "innerSciChartSurface", {
        /**
         * Returns the inner {@link SciChartSurface} which renders the heatmap legend
         */
        get: function () {
            return { sciChartSurface: this.sciChartSurface, wasmContext: this.wasmContext };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the default {@link TGradientStop | GradientStops} to apply to the inner {@link SciChartSurface}
     * @protected
     */
    HeatmapLegend.prototype.getDefaultGradientStops = function () {
        return [
            { offset: 1, color: "Red" },
            { offset: 0, color: "Blue" }
        ];
    };
    /**
     * Gets the default options to apply to the inner {@link SciChartSurface} xAxis. Must conform to {@link IAxisBase2dOptions} interface
     * @protected
     */
    HeatmapLegend.prototype.getDefaultXAxisOptions = function () {
        return {
            drawMajorGridLines: false,
            drawMinorGridLines: false,
            drawMajorTickLines: false,
            drawMinorTickLines: false,
            drawLabels: false
        };
    };
    /**
     * Gets the default options to apply to the inner {@link SciChartSurface} yAxis. Must conform to {@link IAxisBase2dOptions} interface
     * @protected
     */
    HeatmapLegend.prototype.getDefaultYAxisOptions = function () {
        return {
            maxAutoTicks: 5,
            drawMajorGridLines: false,
            drawMinorGridLines: false,
            drawLabels: true,
            drawMajorTickLines: true,
            drawMinorTickLines: true
        };
    };
    HeatmapLegend.prototype.getZValues = function (minimum, maximum) {
        var legendHeatmapData = (0, zeroArray2D_1.zeroArray2D)([this.SIZE, 1]);
        var step = (maximum - minimum) / (this.SIZE - 1);
        for (var i = 0, j = minimum; i < this.SIZE; i++, j += step) {
            legendHeatmapData[i][0] = j;
        }
        return legendHeatmapData;
    };
    return HeatmapLegend;
}(DeletableEntity_1.DeletableEntity));
exports.HeatmapLegend = HeatmapLegend;
