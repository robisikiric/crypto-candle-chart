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
exports.ManualLegend = void 0;
var Thickness_1 = require("../../../Core/Thickness");
var SciChartLegendBase_1 = require("./SciChartLegendBase");
var ManualLegend = /** @class */ (function (_super) {
    __extends(ManualLegend, _super);
    function ManualLegend(options, sciChartSurface) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.type = SciChartLegendBase_1.ELegendType.ManualLegend;
        _this.itemsProperty = [];
        _this.showCheckboxesProperty = false;
        _this.showSeriesMarkersProperty = true;
        _this.showCheckboxesProperty = (_a = options === null || options === void 0 ? void 0 : options.showCheckboxes) !== null && _a !== void 0 ? _a : _this.showCheckboxes;
        _this.showSeriesMarkersProperty = (_b = options === null || options === void 0 ? void 0 : options.showSeriesMarkers) !== null && _b !== void 0 ? _b : _this.showSeriesMarkers;
        _this.itemsProperty = (_c = options === null || options === void 0 ? void 0 : options.items) !== null && _c !== void 0 ? _c : _this.items;
        _this.legendItemCheckedChangedCallback = options === null || options === void 0 ? void 0 : options.isCheckedChangedCallback;
        if (sciChartSurface) {
            _this.attachTo(sciChartSurface);
        }
        return _this;
    }
    Object.defineProperty(ManualLegend.prototype, "showCheckboxes", {
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
    Object.defineProperty(ManualLegend.prototype, "showSeriesMarkers", {
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
    Object.defineProperty(ManualLegend.prototype, "items", {
        /**
         * Gets or sets the items to be displayed in the legend
         */
        get: function () {
            return this.itemsProperty;
        },
        /**
         * Gets or sets the items to be displayed in the legend
         */
        set: function (value) {
            this.itemsProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    ManualLegend.prototype.attachTo = function (sciChartSurface) {
        var _this = this;
        _super.prototype.attachTo.call(this, sciChartSurface);
        sciChartSurface.addDeletable({
            delete: function () {
                _this.delete();
                _this.setRootDiv(undefined);
                _this.setInvalidateParentSurface(undefined);
                _this.setParentSurface(undefined);
            }
        });
    };
    ManualLegend.prototype.applyTheme = function () { };
    ManualLegend.prototype.getInnerHTML = function () {
        var _a, _b;
        var backgroundColor = (_a = this.backgroundColor) !== null && _a !== void 0 ? _a : this.parentSurfaceProperty.themeProvider.legendBackgroundBrush;
        var color = (_b = this.textColor) !== null && _b !== void 0 ? _b : this.parentSurfaceProperty.themeProvider.labelForegroundBrush;
        var _c = this.parentSurfaceProperty.getSeriesViewRectPadding(false), left = _c.left, top = _c.top, right = _c.right, bottom = _c.bottom;
        var margin = this.isExternal()
            ? new Thickness_1.Thickness(this.margin, this.margin, this.margin, this.margin)
            : new Thickness_1.Thickness(top + this.margin, right + this.margin, bottom + this.margin, left + this.margin);
        return this.getLegendHTML(this.placement, color, backgroundColor, margin, this.orientation, this.showCheckboxes, this.showSeriesMarkers, this.items);
    };
    ManualLegend.prototype.addEventListeners = function () {
        var _this = this;
        this.items.forEach(function (item) { return _this.addEventListenerToItem(item); });
    };
    ManualLegend.prototype.addEventListenerToItem = function (item) {
        var _this = this;
        var el = this.parentDiv.querySelector("[id='".concat(item.id, "']"));
        if (el) {
            var onChangeEventListener_1 = function (e) {
                item.checked = el.checked;
                if (_this.legendItemCheckedChangedCallback) {
                    _this.legendItemCheckedChangedCallback(item, item.checked);
                }
            };
            el.addEventListener("change", onChangeEventListener_1);
            var eventSubscriptionItem = {
                element: el,
                eventType: "change",
                eventListener: onChangeEventListener_1,
                delete: function () { return el.removeEventListener("change", onChangeEventListener_1); }
            };
            var eventListenersForRenderableSeries = this.eventListenersCollection.get(item.id);
            if (eventListenersForRenderableSeries) {
                eventListenersForRenderableSeries.push(eventSubscriptionItem);
            }
            else {
                this.eventListenersCollection.set(item.id, [eventSubscriptionItem]);
            }
        }
    };
    ManualLegend.prototype.removeEventListeners = function () {
        var _this = this;
        this.items.forEach(function (item) { return _this.removeEventListenerFromSeries(item.id); });
    };
    return ManualLegend;
}(SciChartLegendBase_1.SciChartLegendBase));
exports.ManualLegend = ManualLegend;
