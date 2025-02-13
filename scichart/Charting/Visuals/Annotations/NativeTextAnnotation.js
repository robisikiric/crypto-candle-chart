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
exports.NativeTextAnnotation = exports.EWrapTo = void 0;
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var AnchorPoint_1 = require("../../../types/AnchorPoint");
var TextPosition_1 = require("../../../types/TextPosition");
var XyDirection_1 = require("../../../types/XyDirection");
var colorUtil_1 = require("../../../utils/colorUtil");
var parseColor_1 = require("../../../utils/parseColor");
var pointUtil_1 = require("../../../utils/pointUtil");
var text_1 = require("../../../utils/text");
var translate_1 = require("../../../utils/translate");
var NativeObject_1 = require("../Helpers/NativeObject");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var RenderContextAnnotationBase_1 = require("./RenderContextAnnotationBase");
var EWrapTo;
(function (EWrapTo) {
    EWrapTo["ViewRect"] = "ViewRect";
    EWrapTo["Annotation"] = "Annotation";
})(EWrapTo = exports.EWrapTo || (exports.EWrapTo = {}));
/**
 * @summary The {@link NativeTextAnnotation} provides an {@link AnnotationBase | Annotation} which draws a text at
 * specific x1 y1 over the {@link SciChartSurface}
 * @description
 * To add a {@link NativeTextAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const textAnnotation = new NativeTextAnnotation( { x1: 1, y1: 3, color: "#FF000077", text: "Hello SciChart"});
 * sciChartSurface.annotations.add(textAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
var NativeTextAnnotation = /** @class */ (function (_super) {
    __extends(NativeTextAnnotation, _super);
    /**
     * Create an instance of a NativeTextAnnotation
     * @param options Optional parameters of type {@link INativeTextAnnotationOptions} which configure the annotation upon construction
     */
    function NativeTextAnnotation(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.RenderContextNativeTextAnnotation;
        /** Set true to make the font scale when the annotation is resized.  Must set x2 as well.  Cannot be used with wrapTo */
        _this.scaleOnResize = false;
        _this.fontSizeProperty = 14;
        _this.fontFamilyProperty = "Arial";
        _this.textColorProperty = "#ffffff";
        _this.rotationProperty = 0;
        _this.textProperty = "";
        _this.verticalAnchorPointProperty = AnchorPoint_1.EVerticalAnchorPoint.Top;
        _this.horizontalAnchorPointProperty = AnchorPoint_1.EHorizontalAnchorPoint.Left;
        _this.multiLineAlignmentProperty = TextPosition_1.EMultiLineAlignment.Center;
        _this.lineSpacingProperty = 3;
        _this.scaleProperty = 1;
        _this.textColorProperty = (_a = options === null || options === void 0 ? void 0 : options.textColor) !== null && _a !== void 0 ? _a : _this.textColorProperty;
        _this.fontSizeProperty = (_b = options === null || options === void 0 ? void 0 : options.fontSize) !== null && _b !== void 0 ? _b : _this.fontSizeProperty;
        _this.fontFamilyProperty = (_c = options === null || options === void 0 ? void 0 : options.fontFamily) !== null && _c !== void 0 ? _c : _this.fontFamilyProperty;
        _this.rotationProperty = (_d = options === null || options === void 0 ? void 0 : options.rotation) !== null && _d !== void 0 ? _d : _this.rotationProperty;
        _this.textProperty = (_e = options === null || options === void 0 ? void 0 : options.text) !== null && _e !== void 0 ? _e : _this.textProperty;
        _this.verticalAnchorPointProperty = (_f = options === null || options === void 0 ? void 0 : options.verticalAnchorPoint) !== null && _f !== void 0 ? _f : _this.verticalAnchorPointProperty;
        _this.horizontalAnchorPointProperty = (_g = options === null || options === void 0 ? void 0 : options.horizontalAnchorPoint) !== null && _g !== void 0 ? _g : _this.horizontalAnchorPointProperty;
        _this.multiLineAlignmentProperty = (_h = options === null || options === void 0 ? void 0 : options.multiLineAlignment) !== null && _h !== void 0 ? _h : _this.multiLineAlignmentProperty;
        _this.wrapToProperty = (_j = options === null || options === void 0 ? void 0 : options.wrapTo) !== null && _j !== void 0 ? _j : _this.wrapToProperty;
        _this.lineSpacingProperty = (_k = options === null || options === void 0 ? void 0 : options.lineSpacing) !== null && _k !== void 0 ? _k : _this.lineSpacingProperty;
        _this.scaleProperty = (_l = options === null || options === void 0 ? void 0 : options.scale) !== null && _l !== void 0 ? _l : _this.scaleProperty;
        _this.initialWidth = Math.abs(_this.x2 - _this.x1);
        _this.scaleOnResize = (_m = options === null || options === void 0 ? void 0 : options.scaleOnResize) !== null && _m !== void 0 ? _m : _this.scaleOnResize;
        return _this;
        // this.fill = options?.fill ?? this.fillProperty;
    }
    Object.defineProperty(NativeTextAnnotation.prototype, "textColor", {
        /**
         * Gets the color for the {@link NativeTextAnnotation}
         */
        get: function () {
            return this.textColorProperty;
        },
        /**
         * Sets the color for the {@link NativeTextAnnotation}
         */
        set: function (value) {
            this.textColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "fontSize", {
        // /**
        //  * Gets the fill for the {@link NativeTextAnnotation}
        //  * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
        //  */
        // public get fill(): string {
        //     return this.fillProperty;
        // }
        // /**
        //  * Sets the fill for the {@link NativeTextAnnotation}
        //  * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
        //  */
        // public set fill(htmlColorCode: string) {
        //     this.fillProperty = htmlColorCode;
        //     this.notifyPropertyChanged(PROPERTY.FILL);
        // }
        /**
         * Gets the fontSize for the {@link NativeTextAnnotation}
         */
        get: function () {
            return this.fontSizeProperty;
        },
        /**
         * Sets the fontSize for the {@link NativeTextAnnotation}
         */
        set: function (value) {
            this.fontSizeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_FONT_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "fontFamily", {
        /**
         * Gets the fontSize for the {@link NativeTextAnnotation}
         */
        get: function () {
            return this.fontFamilyProperty;
        },
        /**
         * Sets the fontSize for the {@link NativeTextAnnotation}
         */
        set: function (value) {
            this.fontFamilyProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_FONT_FAMILY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "rotation", {
        /**
         * Gets the rotation for the {@link NativeTextAnnotation}
         */
        get: function () {
            return this.rotationProperty;
        },
        /**
         * Sets the labelPlacement for the {@link NativeTextAnnotation}
         */
        set: function (value) {
            this.rotationProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.ROTATION);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "text", {
        /**
         * Gets the text for the {@link NativeTextAnnotation}
         */
        get: function () {
            return this.textProperty;
        },
        /**
         * Sets the text for the {@link NativeTextAnnotation}
         */
        set: function (value) {
            this.textProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TEXT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "verticalAnchorPoint", {
        /**
         * Gets or sets vertical anchor point
         */
        get: function () {
            return this.verticalAnchorPointProperty;
        },
        /**
         * Gets or sets vertical anchor point
         */
        set: function (value) {
            if (this.verticalAnchorPointProperty !== value) {
                this.verticalAnchorPointProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.VERTICAL_ANCHOR_POINT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "horizontalAnchorPoint", {
        /**
         * Gets or sets horizontal anchor point
         */
        get: function () {
            return this.horizontalAnchorPointProperty;
        },
        /**
         * Gets or sets horizontal anchor point
         */
        set: function (value) {
            if (this.horizontalAnchorPointProperty !== value) {
                this.horizontalAnchorPointProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.HORIZONTAL_ANCHOR_POINT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "multiLineAlignment", {
        /**
         * Gets or sets the horizontal alignment mode for multiline text
         */
        get: function () {
            return this.multiLineAlignmentProperty;
        },
        /**
         * Gets or sets the horizontal alignment mode for multiline text
         */
        set: function (value) {
            if (this.multiLineAlignmentProperty !== value) {
                this.multiLineAlignmentProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.MULTILINE_ALIGNMENT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "wrapTo", {
        /**
         * Gets or sets the text wrapping mode.  A pure number will be treated as a pixel width.  Default is undefined meaning no wrap
         */
        get: function () {
            return this.wrapToProperty;
        },
        /**
         * Gets or sets the text wrapping mode.  A pure number will be treated as a pixel width.  Default is undefined meaning no wrap
         */
        set: function (value) {
            if (this.wrapToProperty !== value) {
                this.wrapToProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.WRAP_TO);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "lineSpacing", {
        /**
         * The spacing between lines.  Default 3
         * If a whole number then treated as pixels.  If between 0 and 1 then treated as a fraction of line height
         */
        get: function () {
            return this.lineSpacingProperty;
        },
        /**
         * The spacing between lines.  Default 3
         * If a whole number then treated as pixels.  If between 0 and 1 then treated as a fraction of line height
         */
        set: function (value) {
            this.lineSpacingProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.LINE_SPACING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeTextAnnotation.prototype, "scale", {
        /**
         * The scale factor for the font.  Default 1
         * This changes the size of the text without needing to create a new font with a different size
         */
        get: function () {
            return this.scaleProperty;
        },
        /**
         * The scale factor for the font.  Default 1
         * This changes the size of the text without needing to create a new font with a different size
         */
        set: function (value) {
            if (value !== this.scaleProperty) {
                this.scaleProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.SCALE);
            }
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    NativeTextAnnotation.prototype.delete = function () {
        // this.fillBrushCache = deleteSafe(this.fillBrushCache);
    };
    /** @inheritDoc */
    NativeTextAnnotation.prototype.onAttach = function (scs) {
        _super.prototype.onAttach.call(this, scs);
        // if (!this.fillBrushCache) {
        //     this.fillBrushCache = new BrushCache(scs.webAssemblyContext2D);
        // }
        // createBrushInCache(this.fillBrushCache, this.fill, this.opacity);
    };
    /** Calculate the center point for a rotation */
    NativeTextAnnotation.prototype.getRotationCenter = function (x, y, bounds) {
        return new Point_1.Point(x, y);
    };
    /** @inheritDoc */
    NativeTextAnnotation.prototype.drawWithContext = function (renderContext, xCalc, yCalc, viewRect) {
        Guard_1.Guard.notNull(renderContext, "renderContext");
        Guard_1.Guard.notNull(xCalc, "xCalc");
        Guard_1.Guard.notNull(yCalc, "yCalc");
        var x1 = this.getX1Coordinate(xCalc, yCalc);
        var y1 = this.getY1Coordinate(xCalc, yCalc);
        var style = {
            fontFamily: this.fontFamily,
            fontSize: Math.round(this.fontSize * DpiHelper_1.DpiHelper.PIXEL_RATIO)
        };
        var colorNum = (0, parseColor_1.parseColorToUIntArgb)(this.textColor);
        colorNum = (0, colorUtil_1.uintArgbColorOverrideOpacity)(colorNum, this.opacity);
        var font;
        var rotationVector;
        var rotationRads = -(this.rotation * Math.PI) / 180;
        var isAdvanced = this.rotation !== 0 || this.scale !== 1;
        font = renderContext.getFont(style, isAdvanced, false);
        var textBounds = (0, NativeObject_1.getTextBounds)(this.parentSurface.webAssemblyContext2D);
        var text = this.text;
        if (this.wrapTo) {
            var wrapWidth = Infinity;
            if (typeof this.wrapTo === "number") {
                wrapWidth = this.wrapTo;
            }
            else if (this.wrapTo === EWrapTo.ViewRect) {
                if (this.horizontalAnchorPoint === AnchorPoint_1.EHorizontalAnchorPoint.Left) {
                    wrapWidth = this.parentSurface.seriesViewRect.width - x1;
                }
                else if (this.horizontalAnchorPoint === AnchorPoint_1.EHorizontalAnchorPoint.Center) {
                    wrapWidth = 2 * Math.min(x1, this.parentSurface.seriesViewRect.width - x1);
                }
                else if (this.horizontalAnchorPoint === AnchorPoint_1.EHorizontalAnchorPoint.Right) {
                    wrapWidth = x1;
                }
            }
            else if (this.wrapTo === EWrapTo.Annotation) {
                var x2 = this.getX2Coordinate(xCalc, yCalc);
                if (x2 > x1) {
                    wrapWidth = x2 - x1;
                }
            }
            text = (0, text_1.wrapNativeText)(this.text, wrapWidth, font, textBounds);
        }
        var spacing = this.lineSpacing;
        font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", textBounds, spacing);
        if (spacing < 1) {
            spacing =
                this.lineSpacing * (textBounds.GetLineBounds(0).m_fHeight - textBounds.GetLineBounds(0).m_fOffsetY);
            font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", textBounds, spacing);
        }
        var rotationCenter = this.getRotationCenter(x1 + viewRect.x, y1 + viewRect.y, textBounds);
        rotationVector = (0, NativeObject_1.getVector4)(this.parentSurface.webAssemblyContext2D, rotationCenter.x, rotationCenter.y, rotationRads, 0);
        if (this.horizontalAnchorPointProperty === AnchorPoint_1.EHorizontalAnchorPoint.Center) {
            x1 -= textBounds.m_fWidth / 2;
        }
        else if (this.horizontalAnchorPointProperty === AnchorPoint_1.EHorizontalAnchorPoint.Right) {
            x1 -= textBounds.m_fWidth;
        }
        if (this.verticalAnchorPointProperty === AnchorPoint_1.EVerticalAnchorPoint.Center) {
            y1 -= textBounds.m_fHeight / 2 - textBounds.GetLineBounds(0).m_fHeight;
        }
        else if (this.verticalAnchorPointProperty === AnchorPoint_1.EVerticalAnchorPoint.Top) {
            y1 += textBounds.GetLineBounds(0).m_fHeight;
        }
        else if (textBounds.GetLinesCount() > 1) {
            y1 += textBounds.GetLineBounds(0).m_fOffsetY;
            y1 -=
                (textBounds.GetLineBounds(0).m_fHeight - textBounds.GetLineBounds(0).m_fOffsetY) *
                    (textBounds.GetLinesCount() - 1);
        }
        // TODO use for text background when rect rotation is implemented
        // const padding = Thickness.fromNumber(0);
        // const x = x1 + viewRect.x + padding.left;
        // const y = y1 + viewRect.y + padding.top;
        // let borderX1 = x1;
        // let borderY1 = y1 - textBounds.GetLineBounds(0).m_fHeight - padding.top - padding.bottom;
        // let borderX2 = x1 + textBounds.m_fWidth + padding.left + padding.right;
        // let borderY2 = borderY1 + textBounds.m_fHeight + padding.top;
        var x = x1 + viewRect.x;
        var y = y1 + viewRect.y;
        var borderX1 = x1;
        var borderY1 = y1 - textBounds.GetLineBounds(0).m_fHeight;
        var borderX2 = x1 + textBounds.m_fWidth;
        var borderY2 = borderY1 + textBounds.m_fHeight;
        if (this.rotation !== 0) {
            var sin_1 = Math.sin(rotationRads);
            var cos_1 = Math.cos(rotationRads);
            var rc_1 = this.getRotationCenter(x1, y1, textBounds);
            var transform = function (a, b) {
                var ta = (a - rc_1.x) * cos_1 + (b - rc_1.y) * sin_1;
                var tb = (b - rc_1.y) * cos_1 - (a - rc_1.x) * sin_1;
                return { x: ta, y: tb };
            };
            var x1y1 = transform(borderX1, borderY1);
            var x2y1 = transform(borderX2, borderY1);
            var x1y2 = transform(borderX1, borderY2);
            var x2y2 = transform(borderX2, borderY2);
            borderX1 = Math.min(x1y1.x, x2y1.x, x1y2.x, x2y2.x) + rc_1.x;
            borderX2 = Math.max(x1y1.x, x2y1.x, x1y2.x, x2y2.x) + rc_1.x;
            borderY1 = Math.min(x1y1.y, x2y1.y, x1y2.y, x2y2.y) + rc_1.y;
            borderY2 = Math.max(x1y1.y, x2y1.y, x1y2.y, x2y2.y) + rc_1.y;
        }
        var alignMode = (0, TextPosition_1.convertMultiLineAlignment)(this.multiLineAlignment, this.parentSurface.webAssemblyContext2D);
        var oldScale = font.GetScale();
        var scaleChanged = false;
        if (oldScale !== this.scale) {
            font.SetScale(this.scale);
            scaleChanged = true;
        }
        this.setAnnotationBorders(borderX1, borderX1 + (borderX2 - borderX1) * this.scale, borderY1, borderY1 + (borderY2 - borderY1) * this.scale);
        // const strokePen: WebGlPen = undefined;
        // const fillBrush = this.fill ? getWebGlBrushFromCache(this.fillBrushCache) : undefined;
        // fillBrush?.setOpacity(this.opacity);
        // const rect = Rect.createWithPoints(new Point(borderX1, borderY1), new Point(borderX2, borderY2));
        // // Temporary HAX! drawRect is rubbish with large strokeThickness, whereas the columnDrawingProvider does a nice
        // // outlined rectangle, but the code is ugly.  In 2.3 we will improve the native drawRect to do the outline properly.
        // if (!IS_TEST_ENV) {
        //     renderContext.drawRect(rect, viewRect, strokePen, fillBrush);
        // }
        font.DrawStringAdvanced(text, colorNum, Math.round(x), Math.round(y), rotationVector, alignMode, spacing);
        if (scaleChanged) {
            font.SetScale(oldScale);
        }
        if (this.annotationLayer !== IAnnotation_1.EAnnotationLayer.AboveChart) {
            // If the annotation needs to be drawn below anything, draw it now, as by default fonts are all ended at the end of the render cycle
            font.End();
        }
        this.updateAdornerInner();
    };
    NativeTextAnnotation.prototype.onDragStarted = function (args) {
        _super.prototype.onDragStarted.call(this, args);
        var _a = this.getAnnotationBorders(false, true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var _b = annotationHelpers_1.annotationHelpers.calcNewApex(x1, y1, x2, y2, this.isVerticalChart), x1y1 = _b.x1y1, x2y1 = _b.x2y1, x1y2 = _b.x1y2, x2y2 = _b.x2y2;
        var xyMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(args.mousePoint.x, args.mousePoint.y), this.parentSurface.seriesViewRect, true);
        if (x1y1 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1)) {
            var dist = (0, pointUtil_1.calcDistance)(x1y1.x, x1y1.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y1;
                return true;
            }
        }
        if (x2y1 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y1)) {
            var dist = (0, pointUtil_1.calcDistance)(x2y1.x, x2y1.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y1;
                return true;
            }
        }
        if (x1y2 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y2)) {
            var dist = (0, pointUtil_1.calcDistance)(x1y2.x, x1y2.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y2;
                return true;
            }
        }
        if (x2y2 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2)) {
            var dist = (0, pointUtil_1.calcDistance)(x2y2.x, x2y2.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y2;
                return true;
            }
        }
        if (xyMousePoint && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.Body)) {
            if (this.clickToSelect(args)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.Body;
                return true;
            }
        }
        return false;
    };
    NativeTextAnnotation.prototype.calcDragDistance = function (xyValues) {
        if (!this.prevValue) {
            this.prevValue = xyValues;
            return;
        }
        if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.Body) {
            this.x1 = this.x1 - (this.prevValue.x - xyValues.x);
            this.x2 = this.x2 - (this.prevValue.x - xyValues.x);
            this.y1 = this.y1 - (this.prevValue.y - xyValues.y);
            this.y2 = this.y2 - (this.prevValue.y - xyValues.y);
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x1y1) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x1 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y1 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x1 -= this.prevValue.x - xyValues.x;
                this.y1 -= this.prevValue.y - xyValues.y;
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x2y2) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x2 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y2 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x2 -= this.prevValue.x - xyValues.x;
                this.y2 -= this.prevValue.y - xyValues.y;
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x2y1) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x2 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y1 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x2 -= this.prevValue.x - xyValues.x;
                this.y1 -= this.prevValue.y - xyValues.y;
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x1y2) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x1 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y2 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x1 -= this.prevValue.x - xyValues.x;
                this.y2 -= this.prevValue.y - xyValues.y;
            }
        }
        var newScale = Math.abs(this.x2 - this.x1) / this.initialWidth;
        if (this.scaleOnResize && newScale) {
            this.scale = newScale;
        }
        this.prevValue = xyValues;
    };
    /**
     * @instance
     */
    NativeTextAnnotation.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
    };
    NativeTextAnnotation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            textColor: this.textColor,
            // fill: this.fill,
            rotation: this.rotation,
            text: this.text
        };
        Object.assign(json.options, options);
        return json;
    };
    NativeTextAnnotation.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        var _a = this.getAnnotationBorders(true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        return (0, pointUtil_1.testIsInBounds)(x, y, x1, y2, x2, y1);
    };
    // protected notifyPropertyChanged(propertyName: string): void {
    //     super.notifyPropertyChanged(propertyName);
    //     const fillBrushRelatedProperties = [PROPERTY.FILL, PROPERTY.OPACITY];
    //     if (this.fillBrushCache && fillBrushRelatedProperties.includes(propertyName as PROPERTY)) {
    //         createBrushInCache(this.fillBrushCache, this.fill, this.opacity);
    //     }
    // }
    NativeTextAnnotation.prototype.updateAdornerInner = function () {
        this.deleteAdorner();
        if (this.isSelected) {
            var _a = this.getAdornerAnnotationBorders(), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var svgString = this.svgStringAdornerTemplate(x1, y1, x2, y2);
            this.svgAdorner = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgAdornerRoot);
        }
    };
    NativeTextAnnotation.prototype.svgStringAdornerTemplate = function (x1, y1, x2, y2) {
        var colorLine = this.selectionBoxStroke;
        var width = x2 - x1;
        var height = y2 - y1;
        var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"").concat(this.selectionBoxThickness, "px\" fill=\"none\" />\n        ");
        var grips = this.getAdornerAnnotationBorders(false, true);
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1)) {
            svg += this.getAnnotationGripSvg(grips.x1, grips.y1);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2)) {
            svg += this.getAnnotationGripSvg(grips.x2, grips.y2);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y1)) {
            svg += this.getAnnotationGripSvg(grips.x2, grips.y1);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y2)) {
            svg += this.getAnnotationGripSvg(grips.x1, grips.y2);
        }
        svg += "</svg>";
        return svg;
    };
    return NativeTextAnnotation;
}(RenderContextAnnotationBase_1.RenderContextAnnotationBase));
exports.NativeTextAnnotation = NativeTextAnnotation;
