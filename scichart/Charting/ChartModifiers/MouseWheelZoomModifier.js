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
exports.MouseWheelZoomModifier = exports.EActionType = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var ZoomState_1 = require("../../types/ZoomState");
var includedAxis_1 = require("../../utils/includedAxis");
var translate_1 = require("../../utils/translate");
var AxisBase2D_1 = require("../Visuals/Axis/AxisBase2D");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
/**
 * Defines enumeration constants for the zoom or pan action on {@link MouseWheelZoomModifier}
 */
var EActionType;
(function (EActionType) {
    /**
     * Zooms in and out when the Mouse Wheel event occurs
     */
    EActionType[EActionType["Zoom"] = 0] = "Zoom";
    /**
     * Pans when the Mouse Wheel event occurs
     */
    EActionType[EActionType["Pan"] = 1] = "Pan";
})(EActionType = exports.EActionType || (exports.EActionType = {}));
/**
 * The MouseWheelZoomModifier provides Mouse wheel zooming behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the MouseWheelZoomModifier to a {@link SciChartSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());
 * ```
 *
 * The speed of mouse-wheel zoom can be modified via the {@link MouseWheelZoomModifier.growFactor} property.
 */
var MouseWheelZoomModifier = /** @class */ (function (_super) {
    __extends(MouseWheelZoomModifier, _super);
    /**
     * Creates an instance of MouseWheelZoomModifier
     * @param options Optional parameters to configure the modifier via {@link IMouseWheelZoomModifierOptions}
     */
    function MouseWheelZoomModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.MouseWheelZoom;
        /**
         * Modifies the speed of mousewheel zoom, for example growFactor = 0.001 means each mousewheel 'click'
         * zooms the chart 0.1%
         */
        _this.growFactor = 0.001;
        /**
         * Defines whether the Mouse Wheel zooms or pans. See {@link EActionType} for options
         */
        _this.actionType = EActionType.Zoom;
        /**
         * Whether the modifier applies when the mouse is over the area where series are drawn (ie not over the axes).  Default true.
         */
        _this.applyToSeriesViewRect = true;
        /**
         * Whether the modifier applies when the mouse is over the axes. Default true.
         */
        _this.applyToAxes = true;
        _this.includedXAxisMap = new Map();
        _this.includedYAxisMap = new Map();
        _this.growFactor = (_a = options === null || options === void 0 ? void 0 : options.growFactor) !== null && _a !== void 0 ? _a : _this.growFactor;
        _this.actionType = (_b = options === null || options === void 0 ? void 0 : options.actionType) !== null && _b !== void 0 ? _b : _this.actionType;
        _this.applyToSeriesViewRect = (_c = options === null || options === void 0 ? void 0 : options.applyToSeriesViewRect) !== null && _c !== void 0 ? _c : _this.applyToSeriesViewRect;
        _this.applyToAxes = (_d = options === null || options === void 0 ? void 0 : options.applyToAxes) !== null && _d !== void 0 ? _d : _this.applyToAxes;
        if (_this.actionType === EActionType.Pan && _this.xyDirection === XyDirection_1.EXyDirection.XyDirection) {
            console.warn("SciChart MouseWheelZoomModifier: actionType=Pan and xyDirection=Xy conflict. Auto setting XyDirection to X");
            _this.xyDirection = XyDirection_1.EXyDirection.XDirection;
        }
        if (((_e = options === null || options === void 0 ? void 0 : options.includedXAxisIds) === null || _e === void 0 ? void 0 : _e.length) > 0 && ((_f = options === null || options === void 0 ? void 0 : options.excludedXAxisIds) === null || _f === void 0 ? void 0 : _f.length) > 0) {
            throw new Error("You either should use includedXAxisIds or excludedXAxisIds");
        }
        if (((_g = options === null || options === void 0 ? void 0 : options.includedYAxisIds) === null || _g === void 0 ? void 0 : _g.length) > 0 && ((_h = options === null || options === void 0 ? void 0 : options.excludedYAxisIds) === null || _h === void 0 ? void 0 : _h.length) > 0) {
            throw new Error("You either should use includedYAxisIds or excludedYAxisIds");
        }
        (_j = options === null || options === void 0 ? void 0 : options.includedXAxisIds) === null || _j === void 0 ? void 0 : _j.forEach(function (id) {
            _this.includedXAxisMap.set(id, true);
        });
        (_k = options === null || options === void 0 ? void 0 : options.includedYAxisIds) === null || _k === void 0 ? void 0 : _k.forEach(function (id) {
            _this.includedYAxisMap.set(id, true);
        });
        (_l = options === null || options === void 0 ? void 0 : options.excludedXAxisIds) === null || _l === void 0 ? void 0 : _l.forEach(function (id) {
            _this.includedXAxisMap.set(id, false);
        });
        (_m = options === null || options === void 0 ? void 0 : options.excludedYAxisIds) === null || _m === void 0 ? void 0 : _m.forEach(function (id) {
            _this.includedYAxisMap.set(id, false);
        });
        return _this;
    }
    /**
     * @inheritDoc
     */
    MouseWheelZoomModifier.prototype.modifierMouseWheel = function (args) {
        var _this = this;
        _super.prototype.modifierMouseWheel.call(this, args);
        var zoomPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (zoomPoint && this.applyToSeriesViewRect) {
            if (this.actionType === EActionType.Zoom) {
                args.handled = this.performZoom(zoomPoint, args.mouseWheelDelta);
            }
            else if (this.actionType === EActionType.Pan) {
                args.handled = this.performPan(args.mouseWheelDelta);
            }
        }
        else if (this.applyToAxes) {
            var targetAxes = [];
            if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
                targetAxes.push.apply(targetAxes, this.getIncludedXAxis());
            }
            if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
                targetAxes.push.apply(targetAxes, this.getIncludedYAxis());
            }
            var activeAxes = (0, ChartModifierBase2D_1.getActiveAxes)(targetAxes, args.mousePoint);
            if (activeAxes.length > 0) {
                args.handled = true;
                if (this.actionType === EActionType.Zoom) {
                    var fraction_1 = this.growFactor * args.mouseWheelDelta;
                    var mousePoint_1 = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect, true);
                    activeAxes.forEach(function (axis) {
                        _this.growBy(mousePoint_1, axis, fraction_1);
                    });
                }
                else if (this.actionType === EActionType.Pan) {
                    activeAxes.forEach(function (axis) {
                        var size = _this.getAxisSize(axis);
                        var pixels = args.mouseWheelDelta * _this.growFactor * size;
                        axis.scroll(pixels, AxisBase2D_1.EClipMode.None);
                    });
                }
            }
        }
        if (args.handled) {
            this.parentSurface.setZoomState(ZoomState_1.EZoomState.UserZooming);
        }
    };
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param wheelDelta the MouseWheel delta
     */
    MouseWheelZoomModifier.prototype.performZoom = function (mousePoint, wheelDelta) {
        var _this = this;
        var fraction = this.growFactor * wheelDelta;
        var anyUpdated = false;
        if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedXAxis().forEach(function (axis) {
                _this.growBy(mousePoint, axis, fraction);
                anyUpdated = true;
            });
        }
        if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedYAxis().forEach(function (axis) {
                _this.growBy(mousePoint, axis, fraction);
                anyUpdated = true;
            });
        }
        return anyUpdated;
    };
    /**
     * Performs a pan operation
     * @param wheelDelta the MouseWheel delta
     */
    MouseWheelZoomModifier.prototype.performPan = function (wheelDelta) {
        var _this = this;
        var anyUpdated = false;
        if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedXAxis().forEach(function (axis) {
                var size = _this.getAxisSize(axis);
                var pixels = wheelDelta * _this.growFactor * size;
                axis.scroll(pixels, AxisBase2D_1.EClipMode.None);
                anyUpdated = true;
            });
        }
        if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedYAxis().forEach(function (axis) {
                var size = _this.getAxisSize(axis);
                var pixels = wheelDelta * _this.growFactor * size;
                axis.scroll(pixels, AxisBase2D_1.EClipMode.None);
                anyUpdated = true;
            });
        }
        return anyUpdated;
    };
    /** @inheritDoc */
    MouseWheelZoomModifier.prototype.includeXAxis = function (axis, isIncluded) {
        this.includedXAxisMap.set(axis.id, isIncluded);
    };
    /** @inheritDoc */
    MouseWheelZoomModifier.prototype.includeYAxis = function (axis, isIncluded) {
        this.includedYAxisMap.set(axis.id, isIncluded);
    };
    /** @inheritDoc */
    MouseWheelZoomModifier.prototype.includeAllAxes = function () {
        this.includedXAxisMap.clear();
    };
    /** @inheritDoc */
    MouseWheelZoomModifier.prototype.getIncludedXAxis = function () {
        return (0, includedAxis_1.getIncludedAxis)(this.parentSurface.xAxes.asArray(), this.includedXAxisMap);
    };
    /** @inheritDoc */
    MouseWheelZoomModifier.prototype.getIncludedYAxis = function () {
        return (0, includedAxis_1.getIncludedAxis)(this.parentSurface.yAxes.asArray(), this.includedYAxisMap);
    };
    MouseWheelZoomModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            actionType: this.actionType,
            growFactor: this.growFactor,
            applyToSeriesViewRect: this.applyToSeriesViewRect,
            applyToAxes: this.applyToAxes,
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
    /**
     * Gets the axis size for scroll calculations
     * @param axis
     * @protected
     */
    MouseWheelZoomModifier.prototype.getAxisSize = function (axis) {
        var size = axis.isHorizontalAxis ? axis.viewRect.width : axis.viewRect.height;
        if (Math.abs(size) < 0.00000001 && this.parentSurface) {
            size = axis.isHorizontalAxis
                ? this.parentSurface.seriesViewRect.width
                : this.parentSurface.seriesViewRect.height;
        }
        return size;
    };
    return MouseWheelZoomModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.MouseWheelZoomModifier = MouseWheelZoomModifier;
