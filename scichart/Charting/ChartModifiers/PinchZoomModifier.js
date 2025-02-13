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
exports.PinchZoomModifier = void 0;
var Point_1 = require("../../Core/Point");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var ZoomState_1 = require("../../types/ZoomState");
var includedAxis_1 = require("../../utils/includedAxis");
var translate_1 = require("../../utils/translate");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
/**
 * The PinchZoomModifier provides ability to zoom by pinch gesture on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the PinchZoomModifier to a {@link SciChartSurface} and add pinch zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new PinchZoomModifier());
 * ```
 *
 * It is also necessary to set “touch-action: none” on the chart div element.
 */
var PinchZoomModifier = /** @class */ (function (_super) {
    __extends(PinchZoomModifier, _super);
    /**
     * Creates an instance of a PinchZoomModifier
     * @param options Optional parameters used to configure the modifier
     */
    function PinchZoomModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        _this = _super.call(this, options) || this;
        /**
         * Defines the sensitivity of zooming in horizontal direction
         */
        _this.horizontalGrowFactor = 0.005;
        /**
         * Defines the sensitivity of zooming in vertical direction
         */
        _this.verticalGrowFactor = 0.005;
        _this.includedXAxisMap = new Map();
        _this.includedYAxisMap = new Map();
        /**
         * returns a point equidistant to the provided ones
         * @param firstPoint the X,Y location of the first active pointer
         * @param secondPoint the X,Y location of the second active pointer
         */
        _this.getMiddlePoint = function (firstPoint, secondPoint) {
            return new Point_1.Point((firstPoint.x + secondPoint.x) / 2, (firstPoint.y + secondPoint.y) / 2);
        };
        _this.type = ChartModifierType_1.EChart2DModifierType.PinchZoom;
        if (((_a = options === null || options === void 0 ? void 0 : options.includedXAxisIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = options === null || options === void 0 ? void 0 : options.excludedXAxisIds) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            throw new Error("You either should use includedXAxisIds or excludedXAxisIds");
        }
        if (((_c = options === null || options === void 0 ? void 0 : options.includedYAxisIds) === null || _c === void 0 ? void 0 : _c.length) > 0 && ((_d = options === null || options === void 0 ? void 0 : options.excludedYAxisIds) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            throw new Error("You either should use includedYAxisIds or excludedYAxisIds");
        }
        (_e = options === null || options === void 0 ? void 0 : options.includedXAxisIds) === null || _e === void 0 ? void 0 : _e.forEach(function (id) {
            _this.includedXAxisMap.set(id, true);
        });
        (_f = options === null || options === void 0 ? void 0 : options.includedYAxisIds) === null || _f === void 0 ? void 0 : _f.forEach(function (id) {
            _this.includedYAxisMap.set(id, true);
        });
        (_g = options === null || options === void 0 ? void 0 : options.excludedXAxisIds) === null || _g === void 0 ? void 0 : _g.forEach(function (id) {
            _this.includedXAxisMap.set(id, false);
        });
        (_h = options === null || options === void 0 ? void 0 : options.excludedYAxisIds) === null || _h === void 0 ? void 0 : _h.forEach(function (id) {
            _this.includedYAxisMap.set(id, false);
        });
        _this.horizontalGrowFactor = (_j = options === null || options === void 0 ? void 0 : options.horizontalGrowFactor) !== null && _j !== void 0 ? _j : _this.horizontalGrowFactor;
        _this.verticalGrowFactor = (_k = options === null || options === void 0 ? void 0 : options.verticalGrowFactor) !== null && _k !== void 0 ? _k : _this.verticalGrowFactor;
        return _this;
    }
    /**
     * @inheritDoc
     */
    PinchZoomModifier.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (!this.isAttached) {
            throw new Error("Should not call PinchZoomModifier.modifierMouseDown if not attached");
        }
        var translatedPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (!translatedPoint) {
            return;
        }
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        if (isTouchEvent) {
            this.activePointerEvents.set(args.pointerId, args);
        }
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier.prototype.modifierMouseMove = function (args) {
        _super.prototype.modifierMouseMove.call(this, args);
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            this.parentSurface.setZoomState(ZoomState_1.EZoomState.UserZooming);
            this.performModifierAction(args);
        }
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        this.removeFromActiveTouchEvents(args);
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier.prototype.modifierPointerCancel = function (args) {
        _super.prototype.modifierPointerCancel.call(this, args);
        this.removeFromActiveTouchEvents(args);
    };
    PinchZoomModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            horizontalGrowFactor: this.horizontalGrowFactor,
            verticalGrowFactor: this.verticalGrowFactor,
            includedXAxisIds: Array.from(this.includedXAxisMap.entries())
                .filter(function (a) { return a[1]; })
                .map(function (a) { return a[0]; }),
            includedYAxisIds: Array.from(this.includedYAxisMap.entries())
                .filter(function (a) { return a[1]; })
                .map(function (a) { return a[0]; }),
            excludedXAxisIds: Array.from(this.includedXAxisMap.entries())
                .filter(function (a) { return !a[1]; })
                .map(function (a) { return a[0]; }),
            excludedYAxisIds: Array.from(this.includedYAxisMap.entries())
                .filter(function (a) { return !a[1]; })
                .map(function (a) { return a[0]; })
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    PinchZoomModifier.prototype.includeXAxis = function (axis, isIncluded) {
        this.includedXAxisMap.set(axis.id, isIncluded);
    };
    /** @inheritDoc */
    PinchZoomModifier.prototype.includeYAxis = function (axis, isIncluded) {
        this.includedYAxisMap.set(axis.id, isIncluded);
    };
    /** @inheritDoc */
    PinchZoomModifier.prototype.includeAllAxes = function () {
        this.includedXAxisMap.clear();
    };
    /** @inheritDoc */
    PinchZoomModifier.prototype.getIncludedXAxis = function () {
        return (0, includedAxis_1.getIncludedAxis)(this.parentSurface.xAxes.asArray(), this.includedXAxisMap);
    };
    /** @inheritDoc */
    PinchZoomModifier.prototype.getIncludedYAxis = function () {
        return (0, includedAxis_1.getIncludedAxis)(this.parentSurface.yAxes.asArray(), this.includedYAxisMap);
    };
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param horizontalPinchDelta horizontal pinch delta
     * @param verticalPinchDelta vertical pinch delta
     */
    PinchZoomModifier.prototype.performZoom = function (mousePoint, horizontalPinchDelta, verticalPinchDelta, horizontalGrowFactor, verticalGrowFactor) {
        var _this = this;
        var horizontalFraction = horizontalGrowFactor * horizontalPinchDelta;
        var verticalFraction = verticalGrowFactor * verticalPinchDelta;
        if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedXAxis().forEach(function (axis) {
                _this.growBy(mousePoint, axis, horizontalFraction);
            });
        }
        if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedYAxis().forEach(function (axis) {
                _this.growBy(mousePoint, axis, verticalFraction);
            });
        }
    };
    /**
     * Handles pointer event becoming inactive
     * @param args pointer event properties
     */
    PinchZoomModifier.prototype.removeFromActiveTouchEvents = function (args) {
        // Remove this event from the target's cache
        this.activePointerEvents.delete(args.pointerId);
        // reset distance values
        if (this.activePointerEvents.size < 2) {
            this.previousHorizontalTouchPointsDistance = undefined;
            this.previousVerticalTouchPointsDistance = undefined;
        }
    };
    PinchZoomModifier.prototype.performModifierAction = function (args) {
        var _a = Array.from(this.activePointerEvents.values()), firstTouchPoint = _a[0].mousePoint, secondTouchPoint = _a[1].mousePoint;
        // Calculate projections of distance between the touch points
        var currentHorizontalTouchPointsDistance = Math.abs(firstTouchPoint.x - secondTouchPoint.x);
        var currentVerticalTouchPointsDistance = Math.abs(firstTouchPoint.y - secondTouchPoint.y);
        var zoomCenterMousePoint = this.getMiddlePoint(firstTouchPoint, secondTouchPoint);
        var zoomPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(zoomCenterMousePoint, this.parentSurface.seriesViewRect);
        if (zoomPoint &&
            this.previousHorizontalTouchPointsDistance !== undefined &&
            this.previousVerticalTouchPointsDistance !== undefined) {
            var horizontalDistanceDiff = this.previousHorizontalTouchPointsDistance - currentHorizontalTouchPointsDistance;
            var verticalDistanceDiff = this.previousVerticalTouchPointsDistance - currentVerticalTouchPointsDistance;
            // TODO add limits in distance between pointers
            // const minHorizontalDiff = 10;
            // if (horizontalDistanceDiff > minHorizontalDiff && verticalDistanceDiff > minHorizontalDiff) {
            // }
            this.performZoom(zoomPoint, horizontalDistanceDiff, verticalDistanceDiff, this.horizontalGrowFactor, this.verticalGrowFactor);
        }
        // Cache the distance for the next move event
        this.previousHorizontalTouchPointsDistance = currentHorizontalTouchPointsDistance;
        this.previousVerticalTouchPointsDistance = currentVerticalTouchPointsDistance;
    };
    PinchZoomModifier.prototype.getIsActionAllowed = function (args) {
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        // check for pinch gestures if there are multiple active touches
        return isTouchEvent && this.activePointerEvents.size >= 2;
    };
    return PinchZoomModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.PinchZoomModifier = PinchZoomModifier;
