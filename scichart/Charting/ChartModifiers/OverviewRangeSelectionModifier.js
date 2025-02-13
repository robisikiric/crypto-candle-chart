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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewRangeSelectionModifier = void 0;
var NumberRangeAnimator_1 = require("../../Core/Animations/NumberRangeAnimator");
var Deleter_1 = require("../../Core/Deleter");
var NumberRange_1 = require("../../Core/NumberRange");
var Rect_1 = require("../../Core/Rect");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var translate_1 = require("../../utils/translate");
var AnnotationBase_1 = require("../Visuals/Annotations/AnnotationBase");
var OverviewCustomResizableAnnotation_1 = require("../Visuals/Annotations/OverviewCustomResizableAnnotation");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
/**
 * The OverviewRangeSelectionModifier provides drag-rectangle to zoom behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the OverviewRangeSelectionModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new OverviewRangeSelectionModifier());
 * ```
 */
var OverviewRangeSelectionModifier = /** @class */ (function (_super) {
    __extends(OverviewRangeSelectionModifier, _super);
    /**
     * Creates an instance of a OverviewRangeSelectionModifier
     * @param options Optional parameters used to configure the modifier
     */
    function OverviewRangeSelectionModifier(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.OverviewRangeSelection;
        _this.animationDuration = 1000;
        _this.animate = true;
        _this.isClicked = false;
        _this.onSelectedAreaChanged = options === null || options === void 0 ? void 0 : options.onSelectedAreaChanged;
        _this.xAxisId = (_a = options === null || options === void 0 ? void 0 : options.xAxisId) !== null && _a !== void 0 ? _a : _this.xAxisId;
        _this.yAxisId = (_b = options === null || options === void 0 ? void 0 : options.yAxisId) !== null && _b !== void 0 ? _b : _this.yAxisId;
        return _this;
    }
    /**
     * @inheritDoc
     */
    OverviewRangeSelectionModifier.prototype.onAttach = function () {
        _super.prototype.onAttach.call(this);
        this.updateSelectionAnnotation();
    };
    /**
     * @inheritDoc
     */
    OverviewRangeSelectionModifier.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call OverviewRangeSelectionModifier.modifierMouseDown if not attached");
        }
        var pointFromTrans = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (pointFromTrans) {
            this.isClicked = true;
        }
    };
    /**
     * @inheritDoc
     */
    OverviewRangeSelectionModifier.prototype.modifierMouseUp = function (args) {
        var _this = this;
        var _a;
        _super.prototype.modifierMouseUp.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call OverviewRangeSelectionModifier.modifierMouseUp if not attached");
        }
        if (this.isClicked) {
            args.handled = true;
            (_a = this.overviewPositionAnimation) === null || _a === void 0 ? void 0 : _a.cancel();
            var seriesViewRect = this.parentSurface.seriesViewRect;
            this.pointTo = (0, translate_1.translateFromCanvasToSeriesViewRect)(Rect_1.Rect.clipPointToRect(args.mousePoint, seriesViewRect), seriesViewRect);
            this.isClicked = false;
            var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
            var xCalc = xAxis.getCurrentCoordinateCalculator();
            var clickedXDataValue = xCalc.getDataValue(xAxis.isHorizontalAxis ? this.pointTo.x : this.pointTo.y);
            var delta = clickedXDataValue - (this.rangeSelectionAnnotation.x1 + this.rangeSelectionAnnotation.x2) / 2;
            var initialCoordinatesRange = new NumberRange_1.NumberRange(this.rangeSelectionAnnotation.x1, this.rangeSelectionAnnotation.x2);
            var finalCoordinatesRange = new NumberRange_1.NumberRange(this.rangeSelectionAnnotation.x1 + delta, this.rangeSelectionAnnotation.x2 + delta);
            var updateAnnotationCoordinates = function (currentRange) {
                var _a, _b, _c;
                (_a = _this.rangeSelectionAnnotation) === null || _a === void 0 ? void 0 : _a.setCoordinates({ x1: currentRange.min, x2: currentRange.max });
                _this.annotationBeforeSelectedAreaProperty.x2 = (_b = _this.rangeSelectionAnnotation) === null || _b === void 0 ? void 0 : _b.x1;
                _this.annotationAfterSelectedAreaProperty.x1 = (_c = _this.rangeSelectionAnnotation) === null || _c === void 0 ? void 0 : _c.x2;
                _this.onSelectedAreaChanged(new NumberRange_1.NumberRange(_this.rangeSelectionAnnotation.x1, _this.rangeSelectionAnnotation.x2));
            };
            if (this.animate) {
                this.overviewPositionAnimation = NumberRangeAnimator_1.NumberRangeAnimator.animate(initialCoordinatesRange, finalCoordinatesRange, this.animationDuration, updateAnnotationCoordinates, null);
                this.parentSurface.addAnimation(this.overviewPositionAnimation);
            }
            else {
                updateAnnotationCoordinates(finalCoordinatesRange);
            }
        }
    };
    Object.defineProperty(OverviewRangeSelectionModifier.prototype, "rangeSelectionAnnotation", {
        // PROPERTIES
        /**
         * Gets the annotation used for range selection
         */
        get: function () {
            return this.rangeSelectionAnnotationProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverviewRangeSelectionModifier.prototype, "unselectedsvgString", {
        /**
         * Gets the svg string for the unselected part of the range
         */
        get: function () {
            return this.annotationBeforeSelectedAreaProperty.svgString;
        },
        /**
         * Sets the svg string for the unselected part of the range
         */
        set: function (svgString) {
            this.annotationBeforeSelectedAreaProperty.svgString = svgString;
            this.annotationAfterSelectedAreaProperty.svgString = svgString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverviewRangeSelectionModifier.prototype, "selectedArea", {
        /**
         * Gets or sets the selected area ranges of the modifier
         */
        get: function () {
            return this.selectedAreaProperty;
        },
        /**
         * Gets or sets the selected area ranges of the modifier
         */
        set: function (value) {
            var _a, _b, _c, _d, _e, _f;
            this.selectedAreaProperty = value;
            var xAxis = (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.getXAxisById(this.xAxisId);
            if (!xAxis) {
                return;
            }
            (_b = this.rangeSelectionAnnotation) === null || _b === void 0 ? void 0 : _b.setCoordinates({ x1: value.min, x2: value.max });
            (_c = this.annotationBeforeSelectedAreaProperty) === null || _c === void 0 ? void 0 : _c.setCoordinates({
                x1: xAxis.visibleRange.min,
                x2: (_d = this.rangeSelectionAnnotation) === null || _d === void 0 ? void 0 : _d.x1
            });
            (_e = this.annotationAfterSelectedAreaProperty) === null || _e === void 0 ? void 0 : _e.setCoordinates({
                x1: (_f = this.rangeSelectionAnnotation) === null || _f === void 0 ? void 0 : _f.x2,
                x2: xAxis.visibleRange.max
            });
        },
        enumerable: false,
        configurable: true
    });
    OverviewRangeSelectionModifier.prototype.createAnnotation = function (options) {
        return new OverviewCustomResizableAnnotation_1.OverviewCustomResizableAnnotation(options);
    };
    OverviewRangeSelectionModifier.prototype.updateSelectionAnnotation = function () {
        var _this = this;
        var _a;
        if (this.parentSurface) {
            var onDrag = function () {
                var _a;
                (_a = _this.overviewPositionAnimation) === null || _a === void 0 ? void 0 : _a.cancel();
                var selectedArea = new NumberRange_1.NumberRange(_this.rangeSelectionAnnotation.x1, _this.rangeSelectionAnnotation.x2);
                _this.selectedAreaProperty = selectedArea;
                _this.annotationBeforeSelectedAreaProperty.x2 = _this.rangeSelectionAnnotation.x1;
                _this.annotationAfterSelectedAreaProperty.x1 = _this.rangeSelectionAnnotation.x2;
                _this.onSelectedAreaChanged(selectedArea);
            };
            var xAxis = (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.getXAxisById(this.xAxisId);
            var commonAnnotationProperties = {
                xAxisId: this.xAxisId,
                yAxisId: this.yAxisId,
                opacity: 0.5,
                y1: 0,
                y2: 1,
                xCoordinateMode: AnnotationBase_1.ECoordinateMode.DataValue,
                yCoordinateMode: AnnotationBase_1.ECoordinateMode.Relative,
                resizeDirections: XyDirection_1.EXyDirection.XDirection
            };
            var dragBox = this.createAnnotation(__assign(__assign({}, commonAnnotationProperties), { x1: this.selectedArea.min, x2: this.selectedArea.max, isEditable: true, svgString: defaultSelectionAnnotationSvgString, onDrag: onDrag }));
            var annotationBeforeSelectedArea = this.createAnnotation(__assign(__assign({}, commonAnnotationProperties), { x1: xAxis.visibleRange.min, x2: this.selectedArea.min, svgString: defaultUnSelectedAnnotationSvgString }));
            var annotationAfterSelectedArea = this.createAnnotation(__assign(__assign({}, commonAnnotationProperties), { x1: this.selectedArea.max, x2: xAxis.visibleRange.max, svgString: defaultUnSelectedAnnotationSvgString }));
            if (xAxis.isHorizontalAxis) {
                dragBox.adornerSvgStringTemplate = horizontalAdornerSvgTemplate;
                annotationBeforeSelectedArea.minWidth = 0;
                annotationAfterSelectedArea.minWidth = 0;
            }
            else {
                dragBox.adornerSvgStringTemplate = verticalAdornerSvgTemplate;
                annotationBeforeSelectedArea.minHeight = 0;
                annotationAfterSelectedArea.minHeight = 0;
            }
            this.rangeSelectionAnnotationProperty = (0, Deleter_1.deleteSafe)(this.rangeSelectionAnnotation);
            this.annotationBeforeSelectedAreaProperty = (0, Deleter_1.deleteSafe)(this.annotationBeforeSelectedAreaProperty);
            this.annotationAfterSelectedAreaProperty = (0, Deleter_1.deleteSafe)(this.annotationAfterSelectedAreaProperty);
            this.parentSurface.modifierAnnotations.remove(this.rangeSelectionAnnotation);
            this.parentSurface.modifierAnnotations.remove(this.annotationBeforeSelectedAreaProperty);
            this.parentSurface.modifierAnnotations.remove(this.annotationAfterSelectedAreaProperty);
            this.parentSurface.modifierAnnotations.add(dragBox);
            this.parentSurface.modifierAnnotations.add(annotationBeforeSelectedArea);
            this.parentSurface.modifierAnnotations.add(annotationAfterSelectedArea);
            this.rangeSelectionAnnotationProperty = dragBox;
            this.annotationBeforeSelectedAreaProperty = annotationBeforeSelectedArea;
            this.annotationAfterSelectedAreaProperty = annotationAfterSelectedArea;
        }
    };
    return OverviewRangeSelectionModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.OverviewRangeSelectionModifier = OverviewRangeSelectionModifier;
/** @ignore */
var horizontalAdornerSvgTemplate = function (x1, y1, x2, y2) {
    var colorLine = "black";
    var gridpHandleFill = "#2e2e2e";
    var gripHandleHalfWidth = 3;
    var gripHandleHeight = "40%";
    var gripHandleYCoord = "30%";
    var width = x2 - x1;
    var height = y2 - y1;
    return "<svg x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "px\" height=\"").concat(height, "px\" viewBox=\"0 0 ").concat(width, " ").concat(height, "\" overflow=\"visible\" xmlns=\"http://www.w3.org/2000/svg\">\n        <line x1=\"0\" y1=\"0\" x2=\"").concat(width, "\" y2=\"0\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"0\" y1=\"").concat(height, "\" x2=\"").concat(width, "\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"").concat(width, "\" y1=\"0\" x2=\"").concat(width, "\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <rect x=\"").concat(0 - gripHandleHalfWidth, "\" y=\"").concat(gripHandleYCoord, "\" width=\"7\" height=\"").concat(gripHandleHeight, "\" fill=\"").concat(gridpHandleFill, "\" rx=\"5\" stroke=\"").concat(colorLine, "\" />\n        <rect x=\"").concat(width - gripHandleHalfWidth, "\" y=\"").concat(gripHandleYCoord, "\" width=\"7\" height=\"").concat(gripHandleHeight, "\" fill=\"").concat(gridpHandleFill, "\" rx=\"5\" stroke=\"").concat(colorLine, "\" />\n        </svg>");
};
/** @ignore */
var verticalAdornerSvgTemplate = function (x1, y1, x2, y2) {
    var colorLine = "black";
    var gridpHandleFill = "#2e2e2e";
    var gripHandleWidth = "40%";
    var gripHandleHalfHeight = 3;
    var gripHandleXCoord = "30%";
    var width = x2 - x1;
    var height = y2 - y1;
    return "<svg x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "px\" height=\"").concat(height, "px\" viewBox=\"0 0 ").concat(width, " ").concat(height, "\" overflow=\"visible\" xmlns=\"http://www.w3.org/2000/svg\">\n        <line x1=\"0\" y1=\"0\" x2=\"").concat(width, "\" y2=\"0\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"0\" y1=\"").concat(height, "\" x2=\"").concat(width, "\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <line x1=\"").concat(width, "\" y1=\"0\" x2=\"").concat(width, "\" y2=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"1\" />\n        <rect x=\"").concat(gripHandleXCoord, "\" y=\"").concat(0 - gripHandleHalfHeight, "\" width=\"").concat(gripHandleWidth, "\" height=\"7\" fill=\"").concat(gridpHandleFill, "\" rx=\"5\" stroke=\"").concat(colorLine, "\" />\n        <rect x=\"").concat(gripHandleXCoord, "\" y=\"").concat(height - gripHandleHalfHeight, "\" width=\"").concat(gripHandleWidth, "\" height=\"7\" fill=\"").concat(gridpHandleFill, "\" rx=\"5\" stroke=\"").concat(colorLine, "\" />\n        </svg>");
};
var defaultSelectionAnnotationSvgString = "<svg width=\"50\" height=\"50\" preserveAspectRatio=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"100%\" height=\"100%\" style=\"fill:transparent\">\n    </rect>\n</svg>";
var defaultUnSelectedAnnotationSvgString = "<svg width=\"50\" height=\"50\" preserveAspectRatio=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" style=\"fill:black\">\n        </rect>\n    </svg>";
