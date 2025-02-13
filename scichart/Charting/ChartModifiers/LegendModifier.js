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
exports.LegendModifier = void 0;
var EventHandler_1 = require("../../Core/EventHandler");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var SciChartLegend_1 = require("../Visuals/Legend/SciChartLegend");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
/**
 * The LegendModifier provides interactive legend behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the LegendModifier to a {@link SciChartSurface} and add tooltip behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new LegendModifier());
 * ```
 */
var LegendModifier = /** @class */ (function (_super) {
    __extends(LegendModifier, _super);
    /**
     * Creates an instance of the LegendModifier
     * @param options Optional parameters {@link ILegendModifierOptions} used to configure the modifier
     */
    function LegendModifier(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.Legend;
        /**
         * An event handler raised when a {@link SciChartLegend} row checkbox is checked or unchecked
         */
        _this.isCheckedChanged = new EventHandler_1.EventHandler();
        _this.includedSeriesMap = new Map();
        _this.legendItemCheckedChanged = _this.legendItemCheckedChanged.bind(_this);
        _this.sciChartLegend = (_a = options === null || options === void 0 ? void 0 : options.legend) !== null && _a !== void 0 ? _a : new SciChartLegend_1.SciChartLegend(options);
        _this.sciChartLegend.showCheckboxes = (_b = options === null || options === void 0 ? void 0 : options.showCheckboxes) !== null && _b !== void 0 ? _b : _this.sciChartLegend.showCheckboxes;
        _this.sciChartLegend.showSeriesMarkers = (_c = options === null || options === void 0 ? void 0 : options.showSeriesMarkers) !== null && _c !== void 0 ? _c : _this.sciChartLegend.showSeriesMarkers;
        _this.sciChartLegend.legendItemCheckedChangedCallback = _this.legendItemCheckedChanged;
        if (options === null || options === void 0 ? void 0 : options.isCheckedChangedCallback) {
            _this.isCheckedChanged.subscribe(function (arg) {
                return options.isCheckedChangedCallback(arg.series, arg.isChecked);
            });
        }
        return _this;
    }
    /** @inheritDoc */
    LegendModifier.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        this.sciChartLegend.applyTheme();
    };
    /** @inheritDoc */
    LegendModifier.prototype.onAttachSeries = function (rs) {
        _super.prototype.onAttachSeries.call(this, rs);
        this.sciChartLegend.setRenderableSeriesArray(this.getIncludedRenderableSeries());
        this.sciChartLegend.setInvalidateParentSurface(this.parentSurface.invalidateElement);
    };
    /** @inheritDoc */
    LegendModifier.prototype.onDetachSeries = function (rs) {
        _super.prototype.onDetachSeries.call(this, rs);
        this.sciChartLegend.setRenderableSeriesArray(this.getIncludedRenderableSeries());
    };
    /** @inheritDoc */
    LegendModifier.prototype.onParentSurfaceRendered = function () {
        _super.prototype.onParentSurfaceRendered.call(this);
    };
    /** @inheritDoc */
    LegendModifier.prototype.onAttach = function () {
        _super.prototype.onAttach.call(this);
        this.sciChartLegend.attachTo(this.parentSurface);
        this.sciChartLegend.setRenderableSeriesArray(this.getIncludedRenderableSeries());
    };
    /** @inheritDoc */
    LegendModifier.prototype.onDetach = function () {
        var _a, _b;
        _super.prototype.onDetach.call(this);
        (_a = this.sciChartLegend) === null || _a === void 0 ? void 0 : _a.setRenderableSeriesArray([]);
        (_b = this.sciChartLegend) === null || _b === void 0 ? void 0 : _b.detach();
        this.sciChartLegend = undefined;
    };
    /** @inheritDoc */
    LegendModifier.prototype.includeSeries = function (series, isIncluded) {
        var _a;
        var valueChanged = (this.includedSeriesMap.get(series) === undefined && !isIncluded) ||
            (this.includedSeriesMap.get(series) === true && !isIncluded) ||
            (this.includedSeriesMap.get(series) === false && isIncluded);
        if (valueChanged) {
            this.includedSeriesMap.set(series, isIncluded);
            if (this.isAttached) {
                this.sciChartLegend.setRenderableSeriesArray(this.getIncludedRenderableSeries());
            }
            (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
        }
    };
    /** @inheritDoc */
    LegendModifier.prototype.getIncludedRenderableSeries = function () {
        var _this = this;
        // For the legend we need to show also not visible series and series with out data
        var regularSeries = this.parentSurface.renderableSeries
            .asArray()
            .filter(function (rs) { return !rs.isStacked && _this.testIsIncludedSeries(rs); });
        var stackedSeries = this.parentSurface.renderableSeries.asArray().filter(function (rs) { return rs.isStacked; });
        var result = regularSeries;
        stackedSeries.forEach(function (rs) {
            rs.asArray().forEach(function (childRs) {
                if (_this.testIsIncludedSeries(childRs)) {
                    result.push(childRs);
                }
            });
        });
        return result;
    };
    /** @inheritDoc */
    LegendModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            margin: this.sciChartLegend.margin,
            orientation: this.sciChartLegend.orientation,
            placement: this.sciChartLegend.placement,
            showCheckboxes: this.sciChartLegend.showCheckboxes,
            showLegend: this.sciChartLegend.showLegend,
            showSeriesMarkers: this.sciChartLegend.showSeriesMarkers
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    LegendModifier.prototype.delete = function () {
        _super.prototype.delete.call(this);
        this.onDetach();
    };
    /**
     * Callback called from inner {@link SciChartLegend} when a checkbox is checked or unchecked
     * @param series
     * @param isChecked
     * @protected
     */
    LegendModifier.prototype.legendItemCheckedChanged = function (series, isChecked) {
        var _a;
        (_a = this.isCheckedChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent({ series: series, isChecked: isChecked });
    };
    /**
     * Test if the series is included or excluded, by default it is included
     * @param series
     * @private
     */
    LegendModifier.prototype.testIsIncludedSeries = function (series) {
        return this.includedSeriesMap.get(series) !== false;
    };
    return LegendModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.LegendModifier = LegendModifier;
