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
exports.TooltipSvgAnnotation3D = void 0;
var annotationHelpers_1 = require("../../../Charting/Visuals/Annotations/annotationHelpers");
var IAnnotation_1 = require("../../../Charting/Visuals/Annotations/IAnnotation");
var SvgAnnotationBase_1 = require("../../../Charting/Visuals/Annotations/SvgAnnotationBase");
var constants_1 = require("../../../Charting/Visuals/Annotations/constants");
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link TooltipModifier3D}
 */
var TooltipSvgAnnotation3D = /** @class */ (function (_super) {
    __extends(TooltipSvgAnnotation3D, _super);
    /**
     * Creates an instance of the {@link CursorTooltipSvgAnnotation}
     * @param options
     */
    function TooltipSvgAnnotation3D(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.SVG;
        _this.tooltipLegendOffsetXProperty = 10;
        _this.tooltipLegendOffsetYProperty = 10;
        _this.isDirty = true;
        _this.isHidden = true;
        _this.titleProperty = (_a = options === null || options === void 0 ? void 0 : options.title) !== null && _a !== void 0 ? _a : _this.titleProperty;
        _this.tooltipSvgTemplateProperty = (_b = options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) !== null && _b !== void 0 ? _b : _this.tooltipSvgTemplateProperty;
        _this.containerBackgroundProperty = (_c = options === null || options === void 0 ? void 0 : options.containerBackground) !== null && _c !== void 0 ? _c : _this.containerBackgroundProperty;
        _this.textStrokeProperty = (_d = options === null || options === void 0 ? void 0 : options.textStroke) !== null && _d !== void 0 ? _d : _this.textStrokeProperty;
        _this.tooltipLegendTemplateProperty = (_e = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _e !== void 0 ? _e : _this.tooltipLegendTemplateProperty;
        _this.tooltipLegendOffsetXProperty = (_f = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _f !== void 0 ? _f : _this.tooltipLegendOffsetXProperty;
        _this.tooltipLegendOffsetYProperty = (_g = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _g !== void 0 ? _g : _this.tooltipLegendOffsetYProperty;
        _this.placementDivIdProperty = (_h = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _h !== void 0 ? _h : _this.placementDivId;
        _this.tooltipDataTemplateProperty = options === null || options === void 0 ? void 0 : options.tooltipDataTemplate;
        if (_this.placementDivId) {
            var svgRoot = document.querySelector("[id='".concat(_this.placementDivId, "']"));
            _this.svgDivRoot = svgRoot;
        }
        return _this;
    }
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "seriesInfo", {
        /**
         * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
         */
        get: function () {
            return this.seriesInfoProperty;
        },
        /**
         * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
         */
        set: function (newSeriesInfo) {
            if (this.seriesInfoProperty !== newSeriesInfo) {
                this.seriesInfoProperty = newSeriesInfo;
                this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_INFOS);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "title", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "tooltipSvgTemplate", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "tooltipLegendTemplate", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "tooltipDataTemplate", {
        get: function () {
            return this.tooltipDataTemplateProperty;
        },
        set: function (value) {
            this.tooltipDataTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_DATA_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "containerBackground", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "tooltipLegendOffsetX", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "tooltipLegendOffsetY", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "textStroke", {
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
    Object.defineProperty(TooltipSvgAnnotation3D.prototype, "placementDivId", {
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        get: function () {
            return this.placementDivIdProperty;
        },
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        set: function (value) {
            if (this.placementDivIdProperty !== value) {
                this.placementDivIdProperty = value;
                this.notifyPropertyChanged("PLACEMENT_DIV_ID");
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    TooltipSvgAnnotation3D.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        if (!this.isDirty)
            return;
        this.isDirty = false;
        if (this.svg) {
            this.delete();
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
    /** @inheritDoc */
    TooltipSvgAnnotation3D.prototype.delete = function () {
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
    TooltipSvgAnnotation3D.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        this.isDirty = true;
    };
    /**
     * @inheritDoc
     */
    TooltipSvgAnnotation3D.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        if (!this.tooltipSvgTemplate)
            throw Error("Please provide a tooltipSvgTemplate for CursorTooltipSvgAnnotation");
        var svgString = this.tooltipSvgTemplate(this.seriesInfo, this);
        if (this.placementDivId) {
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgDivRoot, this.nextSibling);
            this.setSvg(svgNode);
        }
        else {
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.setSvg(svgNode);
        }
    };
    TooltipSvgAnnotation3D.prototype.updateTooltip = function (xCoordSvgTrans, yCoordSvgTrans) {
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
    TooltipSvgAnnotation3D.prototype.updateLegendTooltip = function () {
        if (this.tooltipLegendTemplate) {
            var svgString = this.seriesInfo ? this.tooltipLegendTemplate(this.seriesInfo, this) : "<svg></svg>";
            if (this.svgLegend) {
                this.svgRoot.removeChild(this.svgLegend);
            }
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.svgLegend = svgNode;
            this.svgLegend.setAttribute("x", this.tooltipLegendOffsetX.toString());
            this.svgLegend.setAttribute("y", this.tooltipLegendOffsetY.toString());
        }
    };
    TooltipSvgAnnotation3D.prototype.updateExternalLegendTooltip = function () {
        if (this.tooltipLegendTemplate) {
            var svgString = this.seriesInfo
                ? this.tooltipLegendTemplate(this.seriesInfo, this)
                : "<svg style='display: none'></svg>";
            if (this.svgLegend) {
                this.svgLegend.removeChild(this.svgLegend);
            }
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.svgLegend = svgNode;
        }
    };
    return TooltipSvgAnnotation3D;
}(SvgAnnotationBase_1.SvgAnnotationBase));
exports.TooltipSvgAnnotation3D = TooltipSvgAnnotation3D;
