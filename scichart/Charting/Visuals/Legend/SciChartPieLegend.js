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
exports.SciChartPieLegend = void 0;
var Thickness_1 = require("../../../Core/Thickness");
var SciChartPieSurface_1 = require("../SciChartPieSurface/SciChartPieSurface");
var SciChartLegendBase_1 = require("./SciChartLegendBase");
/**
 * A legend specific to pie and donut chart types. Inherits {@link SciChartLegendBase}
 */
var SciChartPieLegend = /** @class */ (function (_super) {
    __extends(SciChartPieLegend, _super);
    function SciChartPieLegend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = SciChartLegendBase_1.ELegendType.SciChartPieLegend;
        _this.animate = true;
        _this.showCheckboxesProperty = false;
        _this.showSeriesMarkersProperty = true;
        return _this;
    }
    Object.defineProperty(SciChartPieLegend.prototype, "showCheckboxes", {
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
    Object.defineProperty(SciChartPieLegend.prototype, "showSeriesMarkers", {
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
     * @inheritDoc
     */
    SciChartPieLegend.prototype.applyTheme = function () {
        // TODO: add light theme
    };
    /**
     * Sets the array of pie segments to display in the legend
     * @param pieSegmentArray The Pie segment array
     * @remarks See {@link SciChartPieSurface.pieSegments} which is the source for this array
     */
    SciChartPieLegend.prototype.setPieSegmentArray = function (pieSegmentArray) {
        this.pieSegmentArray = pieSegmentArray;
    };
    /**
     * @inheritDoc
     */
    SciChartPieLegend.prototype.update = function () {
        this.clear();
        if (this.showLegend) {
            this.create();
        }
    };
    /**
     * @inheritDoc
     */
    SciChartPieLegend.prototype.addEventListeners = function () {
        var _this = this;
        this.pieSegmentArray.forEach(function (ps) {
            var el = _this.parentDiv.querySelector("#".concat(getCheckboxId(ps.id)));
            if (!el) {
                return;
            }
            var eventSubscriptionItem = (0, SciChartPieSurface_1.addEventListenerToPieSegment)(ps, el, _this.animate);
            var eventListenersForRenderableSeries = _this.eventListenersCollection.get(ps.id);
            if (eventListenersForRenderableSeries) {
                eventListenersForRenderableSeries.push(eventSubscriptionItem);
            }
            else {
                _this.eventListenersCollection.set(ps.id, [eventSubscriptionItem]);
            }
        });
    };
    /** @inheritDoc */
    SciChartPieLegend.prototype.removeEventListeners = function () {
        var _this = this;
        this.pieSegmentArray.forEach(function (ps) { return _this.removeEventListenerFromSeries(ps.id); });
    };
    /**
     * @inheritDoc
     */
    SciChartPieLegend.prototype.getInnerHTML = function () {
        var backgroundColor = this.parentSurfaceProperty.themeProvider.legendBackgroundBrush;
        var color = this.parentSurfaceProperty.themeProvider.labelForegroundBrush;
        var legendItems = this.pieSegmentArray.map(function (ps, index) {
            var _a;
            return ({
                id: getCheckboxId(ps.id),
                name: (_a = ps.text) !== null && _a !== void 0 ? _a : "Segment ".concat(index + 1),
                color: ps.color,
                checked: ps.isSelected,
                gradient: ps.colorLinearGradient
            });
        });
        var margin = new Thickness_1.Thickness(this.margin, this.margin, this.margin, this.margin);
        return this.getLegendHTML(this.placement, color, backgroundColor, margin, this.orientation, this.showCheckboxes, this.showSeriesMarkers, legendItems);
    };
    return SciChartPieLegend;
}(SciChartLegendBase_1.SciChartLegendBase));
exports.SciChartPieLegend = SciChartPieLegend;
/** @ignore */
var getCheckboxId = function (pieSegmentId) { return "check".concat(pieSegmentId); };
