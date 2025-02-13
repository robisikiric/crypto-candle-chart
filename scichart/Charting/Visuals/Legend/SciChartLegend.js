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
exports.SciChartLegend = void 0;
var Thickness_1 = require("../../../Core/Thickness");
var SciChartLegendBase_1 = require("./SciChartLegendBase");
/**
 * The SciChartLegend displays a legend on the chart at top,left,bottom,right location and with customisable legend rows
 */
var SciChartLegend = /** @class */ (function (_super) {
    __extends(SciChartLegend, _super);
    function SciChartLegend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = SciChartLegendBase_1.ELegendType.SciChartLegend;
        _this.showCheckboxesProperty = false;
        _this.showSeriesMarkersProperty = true;
        return _this;
    }
    /** @inheritDoc */
    SciChartLegend.prototype.applyTheme = function () {
        // TODO: add light theme
    };
    Object.defineProperty(SciChartLegend.prototype, "showCheckboxes", {
        /**
         * Gets or sets whether series visibility checkboxes should be shown
         */
        get: function () {
            return this.showCheckboxesProperty;
        },
        /**
         * Gets or sets whether series visibility checkboxes should be shown
         */
        set: function (value) {
            this.showCheckboxesProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegend.prototype, "showSeriesMarkers", {
        /**
         * Gets or sets whether series markers should be shown
         */
        get: function () {
            return this.showSeriesMarkersProperty;
        },
        /**
         * Gets or sets whether series markers should be shown
         */
        set: function (value) {
            this.showSeriesMarkersProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the array of RenderableSeries to display in the legend
     * @param renderableSeriesArray The array of series
     * @remarks see {@link SciChartSurface.renderableSeries} which is the source for this array
     */
    SciChartLegend.prototype.setRenderableSeriesArray = function (renderableSeriesArray) {
        this.renderableSeriesArray = renderableSeriesArray;
        this.invalidateLegend();
    };
    /** @inheritDoc */
    SciChartLegend.prototype.addEventListeners = function () {
        var _this = this;
        this.renderableSeriesArray.forEach(function (rs) { return _this.addEventListenerToSeries(rs); });
    };
    /** @inheritDoc */
    SciChartLegend.prototype.removeEventListeners = function () {
        var _this = this;
        this.renderableSeriesArray.forEach(function (rs) { return _this.removeEventListenerFromSeries(rs.id); });
    };
    /**
     * adds event listeners to a specific {@link IRenderableSeries} series
     */
    SciChartLegend.prototype.addEventListenerToSeries = function (rs) {
        var _this = this;
        var el = this.parentDiv.querySelector("[id='".concat(rs.id, "']"));
        if (el) {
            var onChangeEventListener_1 = function (e) {
                rs.isVisible = e.target.checked;
                if (_this.legendItemCheckedChangedCallback) {
                    _this.legendItemCheckedChangedCallback(rs, rs.isVisible);
                }
            };
            el.addEventListener("change", onChangeEventListener_1);
            var visibilityChangeEventHandler_1 = function (data) {
                _this.invalidateLegend();
            };
            rs.isVisibleChanged.subscribe(visibilityChangeEventHandler_1);
            var eventSubscriptionItem = {
                element: el,
                eventType: "change",
                eventListener: onChangeEventListener_1,
                delete: function () {
                    el.removeEventListener("change", onChangeEventListener_1);
                    rs.isVisibleChanged.unsubscribe(visibilityChangeEventHandler_1);
                }
            };
            var eventListenersForRenderableSeries = this.eventListenersCollection.get(rs.id);
            if (eventListenersForRenderableSeries) {
                eventListenersForRenderableSeries.push(eventSubscriptionItem);
            }
            else {
                this.eventListenersCollection.set(rs.id, [eventSubscriptionItem]);
            }
        }
    };
    /** @inheritDoc */
    SciChartLegend.prototype.getInnerHTML = function () {
        var _a, _b, _c, _d, _e, _f;
        var backgroundColor = (_a = this.backgroundColor) !== null && _a !== void 0 ? _a : (_c = (_b = this.parentSurfaceProperty) === null || _b === void 0 ? void 0 : _b.themeProvider) === null || _c === void 0 ? void 0 : _c.legendBackgroundBrush;
        var color = (_d = this.textColor) !== null && _d !== void 0 ? _d : (_f = (_e = this.parentSurfaceProperty) === null || _e === void 0 ? void 0 : _e.themeProvider) === null || _f === void 0 ? void 0 : _f.labelForegroundBrush;
        var legendItems = this.renderableSeriesArray.map(function (rs, index) {
            var _a;
            return ({
                id: rs.id,
                name: (_a = rs.getDataSeriesName()) !== null && _a !== void 0 ? _a : "Series ".concat(index + 1),
                color: rs.isStacked ? rs.fill : rs.stroke,
                checked: rs.isVisible,
                gradient: undefined
            });
        });
        var _g = this.parentSurfaceProperty.getSeriesViewRectPadding(false), left = _g.left, top = _g.top, right = _g.right, bottom = _g.bottom;
        var margin = this.isExternal()
            ? new Thickness_1.Thickness(this.margin, this.margin, this.margin, this.margin)
            : new Thickness_1.Thickness(top + this.margin, right + this.margin, bottom + this.margin, left + this.margin);
        return this.getLegendHTML(this.placement, color, backgroundColor, margin, this.orientation, this.showCheckboxes, this.showSeriesMarkers, legendItems);
    };
    return SciChartLegend;
}(SciChartLegendBase_1.SciChartLegendBase));
exports.SciChartLegend = SciChartLegend;
