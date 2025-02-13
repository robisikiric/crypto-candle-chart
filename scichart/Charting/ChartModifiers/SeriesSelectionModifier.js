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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesSelectionModifier = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var EventHandler_1 = require("../../Core/EventHandler");
var BaseType_1 = require("../../types/BaseType");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var array_1 = require("../../utils/array");
var BaseHitTestProvider_1 = require("../Visuals/RenderableSeries/HitTest/BaseHitTestProvider");
var HoveredChangedArgs_1 = require("../Visuals/RenderableSeries/HoveredChangedArgs");
var SelectionChangedArgs_1 = require("../Visuals/RenderableSeries/SelectionChangedArgs");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
var constants_1 = require("./constants");
var SeriesSelectionModifier = /** @class */ (function (_super) {
    __extends(SeriesSelectionModifier, _super);
    /**
     * Creates an instance of a SeriesSelectionModifier
     * @param options Optional parameters used to configure the modifier
     */
    function SeriesSelectionModifier(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.SeriesSelection;
        /**
         * An array of currently selected series which can be observed by subscribing to the {@link selectionChanged} {@link EventHandler | event handler}
         * @remarks See  documentation for how to subscribe to changes
         */
        _this.selectedSeries = [];
        /**
         * An array of currently hovered series which can be observed by subscribing to the {@link hoverChanged} {@link EventHandler | event handler}
         * @remarks See  documentation for how to subscribe to changes
         */
        _this.hoveredSeries = [];
        /**
         * A selection-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
         * notified when any {@link IRenderableSeries | Series} is selected or unselected
         */
        _this.selectionChanged = new EventHandler_1.EventHandler();
        /**
         * A hover-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
         * notified when any {@link IRenderableSeries | Series} is hovered or unhovered
         */
        _this.hoverChanged = new EventHandler_1.EventHandler();
        _this.hitTestRadiusProperty = (options === null || options === void 0 ? void 0 : options.hitTestRadius) || BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS;
        _this.enableSelection = (_a = options === null || options === void 0 ? void 0 : options.enableSelection) !== null && _a !== void 0 ? _a : true;
        _this.enableHover = (_b = options === null || options === void 0 ? void 0 : options.enableHover) !== null && _b !== void 0 ? _b : false;
        if (options === null || options === void 0 ? void 0 : options.onSelectionChanged) {
            if (typeof options.onSelectionChanged === "string") {
                _this.typeMap.set("onSelectionChanged", options.onSelectionChanged);
                var onSelectionChangedCallback = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onSelectionChanged);
                _this.selectionChanged.subscribe(onSelectionChangedCallback);
            }
            else {
                _this.selectionChanged.subscribe(options.onSelectionChanged);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.onHoverChanged) {
            if (typeof options.onHoverChanged === "string") {
                _this.typeMap.set("onHoverChanged", options.onHoverChanged);
                var onHoverChangedCallback = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onHoverChanged);
                _this.hoverChanged.subscribe(onHoverChangedCallback);
            }
            else {
                _this.hoverChanged.subscribe(options.onHoverChanged);
            }
        }
        _this.updateSeriesSelected = _this.updateSeriesSelected.bind(_this);
        _this.updateSeriesHovered = _this.updateSeriesHovered.bind(_this);
        _this.getAllSeries = _this.getAllSeries.bind(_this);
        return _this;
    }
    Object.defineProperty(SeriesSelectionModifier.prototype, "hitTestRadius", {
        /**
         * A hit-test radius in pixels used when selecting series. Defaults to 7
         */
        get: function () {
            return this.hitTestRadiusProperty;
        },
        /**
         * A hit-test radius in pixels used when selecting series. Defaults to 7
         */
        set: function (hitTestRadius) {
            this.hitTestRadiusProperty = hitTestRadius;
            this.notifyPropertyChanged(constants_1.PROPERTY.HIT_TEST_RADIUS);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.onAttach = function () {
        var _this = this;
        var _a;
        _super.prototype.onAttach.call(this);
        this.selectedSeries = [];
        (_a = this.getAllSeries()) === null || _a === void 0 ? void 0 : _a.forEach(function (rs) { return _this.onAttachSeries(rs); });
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.onDetach = function () {
        var _this = this;
        var _a;
        _super.prototype.onDetach.call(this);
        this.selectedSeries = [];
        (_a = this.getAllSeries()) === null || _a === void 0 ? void 0 : _a.forEach(function (rs) { return _this.onDetachSeries(rs); });
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.onAttachSeries = function (rs) {
        _super.prototype.onAttachSeries.call(this, rs);
        if (rs.isSelected) {
            this.selectedSeries.push(rs);
        }
        rs.selected.subscribe(this.updateSeriesSelected);
        if (rs.isHovered) {
            this.hoveredSeries.push(rs);
        }
        rs.hovered.subscribe(this.updateSeriesHovered);
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.onDetachSeries = function (rs) {
        _super.prototype.onDetachSeries.call(this, rs);
        this.selectedSeries = (0, array_1.arrayRemove)(this.selectedSeries, rs);
        rs.selected.unsubscribe(this.updateSeriesSelected);
        this.hoveredSeries = (0, array_1.arrayRemove)(this.hoveredSeries, rs);
        rs.hovered.unsubscribe(this.updateSeriesHovered);
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call SeriesSelectionModifier.modifierMouseDown if not attached");
        }
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.modifierMouseMove = function (args) {
        var _this = this;
        var _a;
        _super.prototype.modifierMouseMove.call(this, args);
        // Don't perform hit-test on hover if enableHover is false. Saves performance
        if (!this.enableHover) {
            return;
        }
        // Perform a hit-test on the renderable series
        var allSeries = this.getAllSeries();
        var hitTestInfos = allSeries.map(function (rs) {
            return rs.hitTestProvider.hitTest(args.mousePoint.x, args.mousePoint.y, _this.hitTestRadius);
        });
        try {
            // Set a flag to prevent re-entrancy
            this.preventReentrancy = true;
            var prevHovered = __spreadArray([], this.hoveredSeries, true);
            // Deselect all series
            this.hoveredSeries = [];
            var nearestHitTestInfo_1;
            if ((hitTestInfos === null || hitTestInfos === void 0 ? void 0 : hitTestInfos.length) > 0) {
                // Any series been hit-tested? Get the nearest
                nearestHitTestInfo_1 = hitTestInfos
                    .filter(function (ht) { return ht.isHit; })
                    .sort(function (a, b) { return a.getEuclideanDistance() - b.getEuclideanDistance(); })[0];
                // 1. Set the isHovered flag and add to hovered array for the nearest hitTestInfo
                if (nearestHitTestInfo_1) {
                    nearestHitTestInfo_1.associatedSeries.isHovered = true;
                    this.hoveredSeries.push(nearestHitTestInfo_1.associatedSeries);
                }
                else {
                    // No series hit-tested, set all as un-hovered
                    allSeries.forEach(function (s) { return (s.isHovered = false); });
                }
                // 2. Series which were not hovered, set isHovered = false;
                hitTestInfos
                    .filter(function (ht) { return ht !== nearestHitTestInfo_1; })
                    .forEach(function (unhoveredSeries) {
                    if (unhoveredSeries === null || unhoveredSeries === void 0 ? void 0 : unhoveredSeries.associatedSeries) {
                        unhoveredSeries.associatedSeries.isHovered = false;
                    }
                });
            }
            else {
                // No series hit-tested, set all as un-hovered
                allSeries.forEach(function (s) { return (s.isHovered = false); });
            }
            // Raise the hoverChanged event if something has changed
            if (prevHovered.length !== this.hoveredSeries.length ||
                prevHovered.some(function (s) { return !_this.hoveredSeries.includes(s); })) {
                (_a = this.hoverChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new HoveredChangedArgs_1.HoveredChangedArgs(this, this.hoveredSeries, allSeries, nearestHitTestInfo_1));
            }
        }
        finally {
            this.preventReentrancy = false;
        }
    };
    SeriesSelectionModifier.prototype.modifierMouseLeave = function (args) {
        var _a;
        this.preventReentrancy = true;
        // Pointer left the chart, set all as un-hovered
        var allSeries = this.getAllSeries();
        // Raise the hoverChanged event if something has changed
        var prevHovered = __spreadArray([], this.hoveredSeries, true);
        var nearestHitTestInfo = undefined;
        if (prevHovered.length > 0) {
            allSeries.forEach(function (s) { return (s.isHovered = false); });
            (_a = this.hoverChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new HoveredChangedArgs_1.HoveredChangedArgs(this, this.hoveredSeries, allSeries, nearestHitTestInfo));
        }
        this.preventReentrancy = false;
    };
    SeriesSelectionModifier.prototype.modifierPointerCancel = function (args) {
        this.modifierMouseLeave(args);
    };
    /**
     * @inheritDoc
     */
    SeriesSelectionModifier.prototype.modifierMouseUp = function (args) {
        var _this = this;
        var _a;
        _super.prototype.modifierMouseUp.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.enableSelection) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call SeriesSelectionModifier.modifierMouseUp if not attached");
        }
        // Perform a hit-test on the renderable series
        var allSeries = this.getAllSeries();
        var hitTestInfos = allSeries.map(function (rs) {
            return rs.hitTestProvider.hitTest(args.mousePoint.x, args.mousePoint.y, _this.hitTestRadius);
        });
        try {
            // Set a flag to prevent re-entrancy
            this.preventReentrancy = true;
            // Deselect all series
            this.selectedSeries = [];
            allSeries.forEach(function (rs) { return (rs.isSelected = false); });
            var nearestHitTestInfo = void 0;
            // Select the first series that has HitTestInfo.isHit = true
            if ((hitTestInfos === null || hitTestInfos === void 0 ? void 0 : hitTestInfos.length) > 0) {
                // Any series been hit-tested? Get the nearest
                nearestHitTestInfo = hitTestInfos.sort(function (a, b) { return a.getEuclideanDistance() - b.getEuclideanDistance(); })[0];
                if (nearestHitTestInfo.isHit) {
                    // Setting isSelected true will cause series to raise the selectionChanged event
                    // This then feeds back into this.select
                    nearestHitTestInfo.associatedSeries.isSelected = true;
                    this.selectedSeries.push(nearestHitTestInfo.associatedSeries);
                }
            }
            // Raise the selectionChanged event
            (_a = this.selectionChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new SelectionChangedArgs_1.SelectionChangedArgs(this, this.selectedSeries, allSeries, nearestHitTestInfo));
        }
        finally {
            this.preventReentrancy = false;
        }
    };
    SeriesSelectionModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            enableHover: this.enableHover,
            enableSelection: this.enableSelection,
            hitTestRadius: this.hitTestRadius,
            onHoverChanged: this.typeMap.get("onHoverChanged"),
            onSelectionChanged: this.typeMap.get("onSelectionChanged")
        };
        Object.assign(json.options, options);
        return json;
    };
    SeriesSelectionModifier.prototype.getAllSeries = function () {
        // Series Selection should only operate on visible series
        return _super.prototype.getAllSeries.call(this).filter(function (rs) { return rs.isVisible; });
    };
    /**
     * This function called when the user sets series.isSelected = true elsewhere in code and we want to sync the modifier
     */
    SeriesSelectionModifier.prototype.updateSeriesSelected = function (arg) {
        var _a, _b;
        // Flag to prevent re-entrancy
        if (this.preventReentrancy) {
            return;
        }
        if (arg.isSelected) {
            this.selectedSeries.push(arg.sourceSeries);
            // Raise the selectionChanged event
            (_a = this.selectionChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new SelectionChangedArgs_1.SelectionChangedArgs(this, this.selectedSeries, this.getAllSeries(), undefined));
        }
        else {
            this.selectedSeries = (0, array_1.arrayRemove)(this.selectedSeries, arg.sourceSeries);
            // Raise the selectionChanged event after series deselected
            (_b = this.selectionChanged) === null || _b === void 0 ? void 0 : _b.raiseEvent(new SelectionChangedArgs_1.SelectionChangedArgs(this, this.selectedSeries, this.getAllSeries(), undefined));
        }
    };
    SeriesSelectionModifier.prototype.updateSeriesHovered = function (arg) {
        var _a, _b;
        // Flag to prevent re-entrancy
        if (this.preventReentrancy) {
            return;
        }
        if (arg.hovered) {
            this.hoveredSeries.push(arg.sourceSeries);
            // Raise the selectionChanged event
            (_a = this.hoverChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new HoveredChangedArgs_1.HoveredChangedArgs(this, this.hoveredSeries, this.getAllSeries(), undefined));
        }
        else {
            this.hoveredSeries = (0, array_1.arrayRemove)(this.hoveredSeries, arg.sourceSeries);
            // Raise the selectionChanged event after series deselected
            (_b = this.hoverChanged) === null || _b === void 0 ? void 0 : _b.raiseEvent(new HoveredChangedArgs_1.HoveredChangedArgs(this, this.hoveredSeries, this.getAllSeries(), undefined));
        }
    };
    return SeriesSelectionModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.SeriesSelectionModifier = SeriesSelectionModifier;
