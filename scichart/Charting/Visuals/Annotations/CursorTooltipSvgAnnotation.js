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
exports.CursorTooltipSvgAnnotation = void 0;
var MousePosition_1 = require("../../../types/MousePosition");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var SvgAnnotationBase_1 = require("./SvgAnnotationBase");
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link CursorModifier}
 */
var CursorTooltipSvgAnnotation = /** @class */ (function (_super) {
    __extends(CursorTooltipSvgAnnotation, _super);
    /**
     * Creates an instance of the {@link CursorTooltipSvgAnnotation}
     * @param options
     */
    function CursorTooltipSvgAnnotation(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.SVG;
        _this.seriesInfosProperty = [];
        _this.isHidden = true;
        _this.titleProperty = (_a = options === null || options === void 0 ? void 0 : options.title) !== null && _a !== void 0 ? _a : _this.titleProperty;
        _this.tooltipSvgTemplateProperty = (_b = options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) !== null && _b !== void 0 ? _b : _this.tooltipSvgTemplateProperty;
        _this.tooltipLegendTemplateProperty = (_c = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _c !== void 0 ? _c : _this.tooltipLegendTemplateProperty;
        _this.seriesInfosProperty = (_d = options === null || options === void 0 ? void 0 : options.seriesInfos) !== null && _d !== void 0 ? _d : _this.seriesInfosProperty;
        _this.containerBackgroundProperty = (_e = options === null || options === void 0 ? void 0 : options.containerBackground) !== null && _e !== void 0 ? _e : _this.containerBackgroundProperty;
        _this.textStrokeProperty = (_f = options === null || options === void 0 ? void 0 : options.textStroke) !== null && _f !== void 0 ? _f : _this.textStrokeProperty;
        _this.tooltipLegendOffsetXProperty = (_g = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _g !== void 0 ? _g : _this.tooltipLegendOffsetXProperty;
        _this.tooltipLegendOffsetYProperty = (_h = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _h !== void 0 ? _h : _this.tooltipLegendOffsetYProperty;
        _this.cursorModifier = options.cursorModifier;
        _this.placementDivId = (_j = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _j !== void 0 ? _j : _this.placementDivId;
        if (_this.placementDivId) {
            var svgRoot = document.querySelector("[id='".concat(_this.placementDivId, "']"));
            _this.svgDivRoot = svgRoot;
        }
        return _this;
    }
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "seriesInfos", {
        /**
         * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
         */
        get: function () {
            return this.seriesInfosProperty;
        },
        /**
         * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
         */
        set: function (newSeriesInfos) {
            if (this.seriesInfosProperty && newSeriesInfos) {
                this.seriesInfosProperty = newSeriesInfos;
                // Compare infos against the ones for the matching series.  See if any are different
                // This logic is needed to prevent infinite rerendering
                if (newSeriesInfos.length !== this.seriesInfosProperty.length ||
                    this.seriesInfosProperty
                        .map(function (seriesInfo) {
                        return seriesInfo.equals(newSeriesInfos.find(function (newSeriesInfo) { return newSeriesInfo.renderableSeries.id === seriesInfo.renderableSeries.id; }));
                    })
                        .some(function (sameSeriesInfo) { return sameSeriesInfo === false; })) {
                    this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_INFOS);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "title", {
        get: function () {
            return this.titleProperty;
        },
        set: function (value) {
            if (this.titleProperty !== value) {
                this.titleProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.TITLE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "tooltipSvgTemplate", {
        get: function () {
            return this.tooltipSvgTemplateProperty;
        },
        set: function (value) {
            this.tooltipSvgTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_SVG_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "tooltipLegendTemplate", {
        get: function () {
            return this.tooltipLegendTemplateProperty;
        },
        set: function (value) {
            this.tooltipLegendTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_LEGEND_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "containerBackground", {
        get: function () {
            return this.containerBackgroundProperty;
        },
        set: function (value) {
            if (this.containerBackgroundProperty !== value) {
                this.containerBackgroundProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.CONTAINER_BACKGROUND);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "tooltipLegendOffsetX", {
        get: function () {
            return this.tooltipLegendOffsetXProperty;
        },
        set: function (value) {
            if (this.tooltipLegendOffsetXProperty !== value) {
                this.tooltipLegendOffsetXProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_LEGEND_OFFSET_X);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "tooltipLegendOffsetY", {
        get: function () {
            return this.tooltipLegendOffsetYProperty;
        },
        set: function (value) {
            if (this.tooltipLegendOffsetYProperty !== value) {
                this.tooltipLegendOffsetYProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_LEGEND_OFFSET_Y);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorTooltipSvgAnnotation.prototype, "textStroke", {
        get: function () {
            return this.textStrokeProperty;
        },
        set: function (value) {
            if (this.textStrokeProperty !== value) {
                this.textStrokeProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.TEXT_STROKE);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    CursorTooltipSvgAnnotation.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var currentMousePosition = this.cursorModifier.getMousePosition();
        if (this.previousMousePosition === currentMousePosition && currentMousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            return;
        }
        this.previousMousePosition = this.cursorModifier.getMousePosition();
        if (this.svg) {
            this.clear();
        }
        this.create(xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans);
        if (this.placementDivId) {
            this.updateExternalLegendTooltip();
        }
        else {
            this.updateTooltip(xCoordSvgTrans, yCoordSvgTrans);
            this.updateLegendTooltip();
        }
    };
    CursorTooltipSvgAnnotation.prototype.clear = function () {
        if (!this.parentSurface || this.parentSurface.isDeleted || !this.svg)
            return;
        if (this.placementDivId) {
            this.svgDivRoot.removeChild(this.svg);
        }
        else {
            this.svgRoot.removeChild(this.svg);
        }
        this.setSvg(undefined);
        if (this.svgLegend) {
            this.svgRoot.removeChild(this.svgLegend);
            this.svgLegend = undefined;
        }
    };
    /**
     * @inheritDoc
     */
    CursorTooltipSvgAnnotation.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        if (!this.tooltipSvgTemplate)
            throw Error("Please provide a tooltipSvgTemplate for CursorTooltipSvgAnnotation");
        var svgString = this.tooltipSvgTemplate(this.seriesInfos, this);
        if (this.placementDivId) {
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgDivRoot);
            this.setSvg(svgNode);
        }
        else {
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.setSvg(svgNode);
        }
    };
    CursorTooltipSvgAnnotation.prototype.updateTooltip = function (xCoordSvgTrans, yCoordSvgTrans) {
        var _a, _b, _c, _d;
        var shiftX = (_a = this.xCoordShift) !== null && _a !== void 0 ? _a : 0;
        var shiftY = (_b = this.yCoordShift) !== null && _b !== void 0 ? _b : 0;
        this.svg.style.display = this.isHidden ? "none" : "block";
        var mousePointX = (_c = this.x1) !== null && _c !== void 0 ? _c : 0;
        var mousePointY = (_d = this.y1) !== null && _d !== void 0 ? _d : 0;
        var x1Coord = shiftX + mousePointX + xCoordSvgTrans;
        var y1Coord = shiftY + mousePointY + yCoordSvgTrans;
        if (isNaN(x1Coord) || isNaN(y1Coord)) {
            this.svg.style.display = "none";
        }
        else {
            this.setSvgAttribute("x", x1Coord);
            this.setSvgAttribute("y", y1Coord);
        }
    };
    CursorTooltipSvgAnnotation.prototype.updateLegendTooltip = function () {
        if (this.tooltipLegendTemplate) {
            var svgString = this.seriesInfos ? this.tooltipLegendTemplate(this.seriesInfos, this) : "<svg></svg>";
            if (this.svgLegend) {
                this.svgRoot.removeChild(this.svgLegend);
            }
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot);
            this.svgLegend = svgNode;
            this.svgLegend.setAttribute("x", this.tooltipLegendOffsetX.toString());
            this.svgLegend.setAttribute("y", this.tooltipLegendOffsetY.toString());
        }
    };
    CursorTooltipSvgAnnotation.prototype.updateExternalLegendTooltip = function () {
        if (this.tooltipLegendTemplate) {
            var svgString = this.seriesInfos
                ? this.tooltipLegendTemplate(this.seriesInfos, this)
                : "<svg style='display: none'></svg>";
            if (this.svgLegend) {
                this.svgLegend.removeChild(this.svgLegend);
            }
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot);
            this.svgLegend = svgNode;
        }
    };
    return CursorTooltipSvgAnnotation;
}(SvgAnnotationBase_1.SvgAnnotationBase));
exports.CursorTooltipSvgAnnotation = CursorTooltipSvgAnnotation;
