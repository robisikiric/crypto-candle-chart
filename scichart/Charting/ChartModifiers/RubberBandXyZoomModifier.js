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
exports.getRubberBandRect = exports.RubberBandXyZoomModifier = void 0;
var EasingFunctions_1 = require("../../Core/Animations/EasingFunctions");
var Deleter_1 = require("../../Core/Deleter");
var Point_1 = require("../../Core/Point");
var Rect_1 = require("../../Core/Rect");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var ZoomState_1 = require("../../types/ZoomState");
var translate_1 = require("../../utils/translate");
var RubberBandSvgRect_1 = require("../Visuals/RubberBandSvgRect/RubberBandSvgRect");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
var constants_1 = require("./constants");
/**
 * The RubberBandXyZoomModifier provides drag-rectangle to zoom behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the RubberBandXyZoomModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new RubberBandXyZoomModifier());
 * ```
 *
 * Animation of the zoom may be controlled via the {@link RubberBandXyZoomModifier.isAnimated},
 * {@link RubberBandXyZoomModifier.animationDuration} and {@link RubberBandXyZoomModifier.easingFunction} properties.
 */
var RubberBandXyZoomModifier = /** @class */ (function (_super) {
    __extends(RubberBandXyZoomModifier, _super);
    /**
     * Creates an instance of a RubberBandXyZoomModifier
     * @param options Optional parameters used to configure the modifier
     */
    function RubberBandXyZoomModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.RubberBandXYZoom;
        /**
         * When true, the Zoom operations are animated. See also {@link animationDuration} and {@link easingFunction}
         */
        _this.isAnimated = true;
        /**
         * Defines the duration of animations when zooming in milliseconds
         */
        _this.animationDuration = 400;
        /**
         * Defines the easing function for animation. See {@link TEasingFn} for a range of functions
         */
        _this.easingFunction = EasingFunctions_1.easing.outExpo;
        _this.isClicked = false;
        _this.fillProperty = "#42b64933";
        _this.strokeProperty = "#42b64977";
        _this.strokeThicknessProperty = 2;
        _this.fill = (_a = options === null || options === void 0 ? void 0 : options.fill) !== null && _a !== void 0 ? _a : _this.fillProperty;
        _this.stroke = (_b = options === null || options === void 0 ? void 0 : options.stroke) !== null && _b !== void 0 ? _b : _this.strokeProperty;
        _this.strokeThickness = (_c = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _c !== void 0 ? _c : _this.strokeThicknessProperty;
        _this.isAnimated = (_d = options === null || options === void 0 ? void 0 : options.isAnimated) !== null && _d !== void 0 ? _d : true;
        _this.animationDuration = (_e = options === null || options === void 0 ? void 0 : options.animationDuration) !== null && _e !== void 0 ? _e : 400;
        if ((options === null || options === void 0 ? void 0 : options.easingFunction) && typeof options.easingFunction === "string") {
            options.easingFunction = EasingFunctions_1.easing[options.easingFunction];
        }
        _this.easingFunction = (_f = options === null || options === void 0 ? void 0 : options.easingFunction) !== null && _f !== void 0 ? _f : EasingFunctions_1.easing.outExpo;
        return _this;
    }
    /**
     * @inheritDoc
     */
    RubberBandXyZoomModifier.prototype.applyTheme = function (themeProvider) {
        if (!this.testPropertyChanged(constants_1.PROPERTY.FILL)) {
            this.fill = themeProvider.rubberBandFillBrush;
        }
        if (!this.testPropertyChanged(constants_1.PROPERTY.STROKE)) {
            this.stroke = themeProvider.rubberBandStrokeBrush;
        }
    };
    /**
     * @inheritDoc
     */
    RubberBandXyZoomModifier.prototype.onDetach = function () {
        _super.prototype.onDetach.call(this);
        this.rubberBandRect = (0, Deleter_1.deleteSafe)(this.rubberBandRect);
    };
    /**
     * @inheritDoc
     */
    RubberBandXyZoomModifier.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call RubberBandXyZoomModifier.modifierMouseDown if not attached");
        }
        this.parentSurface.setZoomState(ZoomState_1.EZoomState.UserZooming);
        var pointFromTrans = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (pointFromTrans) {
            this.pointFrom = pointFromTrans;
            this.isClicked = true;
        }
    };
    /**
     * @inheritDoc
     */
    RubberBandXyZoomModifier.prototype.modifierMouseMove = function (args) {
        _super.prototype.modifierMouseMove.call(this, args);
        var seriesViewRect = this.parentSurface.seriesViewRect;
        if (this.isClicked) {
            this.pointTo = (0, translate_1.translateFromCanvasToSeriesViewRect)(Rect_1.Rect.clipPointToRect(args.mousePoint, seriesViewRect), seriesViewRect);
            var coordSvgTranslation = this.parentSurface.getCoordSvgTranslation();
            var _a = getRubberBandRect(this.pointFrom, this.pointTo, this.xyDirection, this.parentSurface.seriesViewRect), x = _a.x, right = _a.right, y = _a.y, bottom = _a.bottom;
            this.rubberBandRect.isHidden = false;
            this.rubberBandRect.x1 = (0, translate_1.translateToNotScaled)(x + coordSvgTranslation.x);
            this.rubberBandRect.x2 = (0, translate_1.translateToNotScaled)(right + coordSvgTranslation.x);
            this.rubberBandRect.y1 = (0, translate_1.translateToNotScaled)(y + coordSvgTranslation.y);
            this.rubberBandRect.y2 = (0, translate_1.translateToNotScaled)(bottom + coordSvgTranslation.y);
        }
    };
    /**
     * @inheritDoc
     */
    RubberBandXyZoomModifier.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (this.isClicked) {
            var seriesViewRect = this.parentSurface.seriesViewRect;
            this.pointTo = (0, translate_1.translateFromCanvasToSeriesViewRect)(Rect_1.Rect.clipPointToRect(args.mousePoint, seriesViewRect), seriesViewRect);
            var _a = getRubberBandRect(this.pointFrom, this.pointTo, this.xyDirection, this.parentSurface.seriesViewRect), x = _a.x, right = _a.right, y = _a.y, bottom = _a.bottom;
            this.isClicked = false;
            this.rubberBandRect.isHidden = true;
            if (this.calculateDraggedDistance() > RubberBandXyZoomModifier.MIN_DRAG_SENSITIVITY) {
                this.performZoom(new Point_1.Point(x, y), new Point_1.Point(right, bottom));
            }
        }
    };
    Object.defineProperty(RubberBandXyZoomModifier.prototype, "strokeThickness", {
        // PROPERTIES
        /**
         * Get the stroke thickness for {@link RubberBandSvgRect}
         */
        get: function () {
            return this.strokeThicknessProperty;
        },
        /**
         * Set the stroke thickness for {@link RubberBandSvgRect}
         */
        set: function (value) {
            this.strokeThicknessProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandXyZoomModifier.prototype, "stroke", {
        /**
         * Get the stroke for {@link RubberBandSvgRect}
         */
        get: function () {
            return this.strokeProperty;
        },
        /**
         * Set the stroke for {@link RubberBandSvgRect}
         */
        set: function (value) {
            this.strokeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandXyZoomModifier.prototype, "fill", {
        /**
         * Get the fill color for {@link RubberBandSvgRect}
         */
        get: function () {
            return this.fillProperty;
        },
        /**
         * Set the fill color for {@link RubberBandSvgRect}
         */
        set: function (value) {
            this.fillProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    RubberBandXyZoomModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            animationDuration: this.animationDuration,
            easingFunction: this.easingFunction.name,
            fill: this.fill,
            isAnimated: this.isAnimated,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness
        };
        Object.assign(json.options, options);
        return json;
    };
    RubberBandXyZoomModifier.prototype.delete = function () {
        this.parentSurfaceProperty = undefined;
        this.rubberBandRect = (0, Deleter_1.deleteSafe)(this.rubberBandRect);
        _super.prototype.delete.call(this);
    };
    /**
     * Performs the zoom operation on the parent Surface, using the mouse points from & to, which
     * define the corners of the rectangle to zoom
     * @param pointFrom the first corner of the rectangle to zoom
     * @param pointTo the second corner of the rectangle to zoom
     */
    RubberBandXyZoomModifier.prototype.performZoom = function (pointFrom, pointTo) {
        var _this = this;
        var zoomXDirection = [XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection);
        var zoomYDirection = [XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection);
        this.parentSurface.xAxes.asArray().forEach(function (axis) {
            if ((!axis.isVerticalChart && zoomXDirection) || (axis.isVerticalChart && zoomYDirection)) {
                _this.performZoomOnAxis(axis, axis.isVerticalChart ? pointFrom.y : pointFrom.x, axis.isVerticalChart ? pointTo.y : pointTo.x);
            }
        });
        this.parentSurface.yAxes.asArray().forEach(function (axis) {
            if ((!axis.isVerticalChart && zoomYDirection) || (axis.isVerticalChart && zoomXDirection)) {
                _this.performZoomOnAxis(axis, axis.isVerticalChart ? pointFrom.x : pointFrom.y, axis.isVerticalChart ? pointTo.x : pointTo.y);
            }
        });
    };
    /**
     * Performs a Zoom on a specific axis
     * @param axis the Axis to zoom
     * @param fromCoord the coordinate to zoom from
     * @param toCoord the coordinate to zoom to
     */
    RubberBandXyZoomModifier.prototype.performZoomOnAxis = function (axis, fromCoord, toCoord) {
        axis.zoom(fromCoord, toCoord, this.isAnimated ? this.animationDuration : 0, this.easingFunction);
    };
    RubberBandXyZoomModifier.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        this.updateRubberBandRect();
    };
    RubberBandXyZoomModifier.prototype.calculateDraggedDistance = function () {
        var diffX = Math.pow((this.pointFrom.x - this.pointTo.x), 2);
        var diffY = Math.pow((this.pointFrom.y - this.pointTo.y), 2);
        return Math.sqrt(diffX + diffY);
    };
    RubberBandXyZoomModifier.prototype.updateRubberBandRect = function () {
        if (this.parentSurface) {
            this.rubberBandRect = (0, Deleter_1.deleteSafe)(this.rubberBandRect);
            this.rubberBandRect = new RubberBandSvgRect_1.RubberBandSvgRect(this.parentSurface.domSvgContainer, this.fill, this.stroke, this.strokeThickness);
        }
    };
    RubberBandXyZoomModifier.MIN_DRAG_SENSITIVITY = 5;
    return RubberBandXyZoomModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.RubberBandXyZoomModifier = RubberBandXyZoomModifier;
/**
 * Given the starting and end mouse-point, computes a rectangle to perform zoom over. Takes into account the xyDirection
 * @param pointFrom the starting point of the mouse
 * @param pointTo the end point of the mouse
 * @param xyDirection the XyDirection
 * @param viewportRect
 */
function getRubberBandRect(pointFrom, pointTo, xyDirection, viewportRect) {
    var x1 = pointTo.x <= pointFrom.x ? pointTo.x : pointFrom.x;
    var x2 = pointTo.x <= pointFrom.x ? pointFrom.x : pointTo.x;
    var y1 = pointTo.y <= pointFrom.y ? pointTo.y : pointFrom.y;
    var y2 = pointTo.y <= pointFrom.y ? pointFrom.y : pointTo.y;
    if (xyDirection === XyDirection_1.EXyDirection.XDirection) {
        y1 = 0;
        y2 = viewportRect.height;
    }
    if (xyDirection === XyDirection_1.EXyDirection.YDirection) {
        x1 = 0;
        x2 = viewportRect.width;
    }
    return Rect_1.Rect.createWithPoints(new Point_1.Point(x1, y1), new Point_1.Point(x2, y2));
}
exports.getRubberBandRect = getRubberBandRect;
