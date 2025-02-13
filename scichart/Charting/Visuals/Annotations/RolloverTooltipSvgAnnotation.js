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
exports.RolloverTooltipSvgAnnotation = void 0;
var MousePosition_1 = require("../../../types/MousePosition");
var IDataSeries_1 = require("../../Model/IDataSeries");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var SvgAnnotationBase_1 = require("./SvgAnnotationBase");
var parseColor_1 = require("../../../utils/parseColor");
// TODO: Rename to RolloverTooltipSvgAnnotation
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link RolloverModifier}
 */
var RolloverTooltipSvgAnnotation = /** @class */ (function (_super) {
    __extends(RolloverTooltipSvgAnnotation, _super);
    /**
     * Creates an instance of the {@link RolloverTooltipSvgAnnotation}
     * @param renderableSeriesProps The {@link RolloverModifierRenderableSeriesProps | props} pass
     * @param options
     */
    function RolloverTooltipSvgAnnotation(renderableSeriesProps, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.SVG;
        _this.width = 0;
        _this.height = 0;
        _this.tooltipProps = renderableSeriesProps;
        _this.height = (_a = options === null || options === void 0 ? void 0 : options.height) !== null && _a !== void 0 ? _a : _this.height;
        _this.xCoordinateMode = AnnotationBase_1.ECoordinateMode.DataValue;
        _this.yCoordinateMode = AnnotationBase_1.ECoordinateMode.DataValue;
        _this.isHidden = true;
        _this.updateSize = _this.updateSize.bind(_this);
        _this.placementDivIdProperty = (_b = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _b !== void 0 ? _b : _this.placementDivIdProperty;
        return _this;
    }
    Object.defineProperty(RolloverTooltipSvgAnnotation.prototype, "seriesInfo", {
        /**
         * Gets or sets seriesInfo {@link SeriesInfo} value on the tooltip
         */
        get: function () {
            return this.seriesInfoProperty;
        },
        /**
         * Gets or sets seriesInfo {@link SeriesInfo} value on the tooltip
         */
        set: function (value) {
            if ((value && !this.seriesInfoProperty) || !this.seriesInfoProperty.equals(value)) {
                this.seriesInfoProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_INFO);
            }
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    RolloverTooltipSvgAnnotation.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var currentMousePosition = this.tooltipProps.rolloverModifier.getMousePosition();
        if (this.previousMousePosition === currentMousePosition && currentMousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            return;
        }
        this.previousMousePosition = this.tooltipProps.rolloverModifier.getMousePosition();
        if (this.svg) {
            this.clear();
        }
        if (this.placementDivId) {
            this.updateExternalLegendTooltip();
        }
        else {
            _super.prototype.update.call(this, xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans);
            this.updateLegendTooltip(xCoordSvgTrans, yCoordSvgTrans);
        }
    };
    /**
     * Updates size of the tooltip
     */
    RolloverTooltipSvgAnnotation.prototype.updateSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    RolloverTooltipSvgAnnotation.prototype.clear = function () {
        var _a, _b, _c, _d;
        if (!this.parentSurface || this.parentSurface.isDeleted)
            return;
        if (this.svg) {
            if (this.placementDivId) {
                (_b = (_a = this.svg) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.svg);
                return;
            }
            (_c = this.svgRoot) === null || _c === void 0 ? void 0 : _c.removeChild(this.svg);
        }
        if (this.svgLegend) {
            (_d = this.svgLegend.parentNode) === null || _d === void 0 ? void 0 : _d.removeChild(this.svgLegend);
        }
    };
    /** @inheritDoc */
    RolloverTooltipSvgAnnotation.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var svgString;
        if (!this.seriesInfo) {
            svgString = "<svg></svg>";
        }
        else {
            svgString = this.generateSvgString();
        }
        var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
        this.setSvg(svgNode);
    };
    RolloverTooltipSvgAnnotation.prototype.generateSvgString = function () {
        var _a;
        var tooltipTitle = this.tooltipProps.tooltipTitle;
        var idTitle = ("" + tooltipTitle).replace(/\s/g, "");
        var id = "id".concat(Math.floor(this.y1), "_").concat(idTitle, "_").concat(Date.now());
        var tooltipTemplate = (_a = this.tooltipProps.tooltipTemplate) !== null && _a !== void 0 ? _a : defaultTooltipTemplate;
        return tooltipTemplate(id, this.seriesInfo, this);
    };
    RolloverTooltipSvgAnnotation.prototype.updateLegendTooltip = function (xCoordSvgTrans, yCoordSvgTrans) {
        if (this.tooltipProps.tooltipLegendTemplate) {
            var svgString = this.seriesInfo
                ? this.tooltipProps.tooltipLegendTemplate(this.tooltipProps, this.seriesInfo)
                : "<svg></svg>";
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.svgLegend = svgNode;
            this.svgLegend.setAttribute("x", this.tooltipProps.tooltipLegendOffsetX.toString() + xCoordSvgTrans);
            this.svgLegend.setAttribute("y", this.tooltipProps.tooltipLegendOffsetY.toString() + yCoordSvgTrans);
        }
    };
    RolloverTooltipSvgAnnotation.prototype.updateExternalLegendTooltip = function () {
        var svgString;
        if (!this.seriesInfo) {
            svgString = "<svg style='display: none;'></svg>";
        }
        else {
            svgString = this.generateSvgString();
        }
        this.svgDivRoot = document.querySelector("[id='".concat(this.placementDivId, "']"));
        var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgDivRoot, this.nextSibling);
        this.setSvg(svgNode);
    };
    Object.defineProperty(RolloverTooltipSvgAnnotation.prototype, "placementDivId", {
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
                this.notifyPropertyChanged(constants_1.PROPERTY.PLACEMENT_DIV_ID);
            }
        },
        enumerable: false,
        configurable: true
    });
    return RolloverTooltipSvgAnnotation;
}(SvgAnnotationBase_1.SvgAnnotationBase));
exports.RolloverTooltipSvgAnnotation = RolloverTooltipSvgAnnotation;
/** @ignore */
var defaultTooltipDataTemplate = function (seriesInfo, tooltipTitle, tooltipLabelX, tooltipLabelY) {
    var valuesWithLabels = [];
    if (tooltipTitle) {
        valuesWithLabels.push(tooltipTitle);
    }
    if (seriesInfo.dataSeriesType === IDataSeries_1.EDataSeriesType.Ohlc) {
        var ohlcSeriesInfo = seriesInfo;
        if (tooltipLabelX) {
            valuesWithLabels.push("".concat(tooltipLabelX, ": ").concat(ohlcSeriesInfo.formattedXValue));
        }
        valuesWithLabels.push("Open: ".concat(ohlcSeriesInfo.formattedOpenValue));
        valuesWithLabels.push("Highest: ".concat(ohlcSeriesInfo.formattedHighValue));
        valuesWithLabels.push("Lowest: ".concat(ohlcSeriesInfo.formattedLowValue));
        valuesWithLabels.push("Close: ".concat(ohlcSeriesInfo.formattedCloseValue));
    }
    else if (seriesInfo.dataSeriesType === IDataSeries_1.EDataSeriesType.Hlc) {
        var hlcSeriesInfo = seriesInfo;
        if (tooltipLabelX) {
            valuesWithLabels.push("".concat(tooltipLabelX, ": ").concat(hlcSeriesInfo.formattedXValue));
        }
        valuesWithLabels.push("High: ".concat(hlcSeriesInfo.formattedHighValue));
        valuesWithLabels.push("Low: ".concat(hlcSeriesInfo.formattedLowValue));
    }
    else if (seriesInfo.dataSeriesType === IDataSeries_1.EDataSeriesType.Xyy) {
        // Band Series
        var xyySeriesInfo = seriesInfo;
        if (xyySeriesInfo.isFirstSeries) {
            addValueWithLabel(valuesWithLabels, xyySeriesInfo.formattedXValue, xyySeriesInfo.formattedYValue, tooltipLabelX, tooltipLabelY);
        }
        else {
            addValueWithLabel(valuesWithLabels, xyySeriesInfo.formattedXValue, xyySeriesInfo.formattedY1Value, tooltipLabelX, tooltipLabelY);
        }
    }
    else if (seriesInfo.dataSeriesType === IDataSeries_1.EDataSeriesType.HeatmapUniform) {
        // Band Series
        var heatmapSeriesInfo = seriesInfo;
        if (tooltipLabelX) {
            valuesWithLabels.push("".concat(tooltipLabelX, ": ").concat(heatmapSeriesInfo.formattedXValue));
        }
        if (tooltipLabelY) {
            valuesWithLabels.push("".concat(tooltipLabelY, ": ").concat(heatmapSeriesInfo.formattedYValue));
        }
        valuesWithLabels.push("Z: ".concat(heatmapSeriesInfo.formattedZValue));
    }
    else if (seriesInfo.dataSeriesType === IDataSeries_1.EDataSeriesType.Xyz) {
        // Bubble Series
        var xyzSeriesInfo = seriesInfo;
        addValueWithLabel(valuesWithLabels, xyzSeriesInfo.formattedXValue, xyzSeriesInfo.formattedYValue, tooltipLabelX, tooltipLabelY);
        valuesWithLabels.push("Z: ".concat(xyzSeriesInfo.formattedZValue));
    }
    else {
        // Line Series
        var xySeriesInfo = seriesInfo;
        addValueWithLabel(valuesWithLabels, xySeriesInfo.formattedXValue, xySeriesInfo.formattedYValue, tooltipLabelX, tooltipLabelY);
    }
    return valuesWithLabels;
};
/** @ignore */
var defaultTooltipTemplate = function (id, seriesInfo, rolloverTooltip) {
    var _a, _b, _c, _d, _e;
    var valuesBlock = "";
    var tooltipProps = rolloverTooltip.tooltipProps;
    var tooltipTitle = tooltipProps.tooltipTitle, tooltipColor = tooltipProps.tooltipColor, tooltipTextColor = tooltipProps.tooltipTextColor, tooltipLabelX = tooltipProps.tooltipLabelX, tooltipLabelY = tooltipProps.tooltipLabelY, shadowColor = tooltipProps.shadowColor;
    var tooltipDataTemplate = (_c = (_a = rolloverTooltip.tooltipProps.tooltipDataTemplate) !== null && _a !== void 0 ? _a : (_b = rolloverTooltip.tooltipProps.rolloverModifier) === null || _b === void 0 ? void 0 : _b.tooltipDataTemplate) !== null && _c !== void 0 ? _c : defaultTooltipDataTemplate;
    var valuesWithLabels = tooltipDataTemplate(seriesInfo, tooltipTitle, tooltipLabelX, tooltipLabelY);
    // tooltip width
    var width = (_d = tooltipProps.width) !== null && _d !== void 0 ? _d : calcTooltipWidth(valuesWithLabels.reduce(function (prev, cur) { return (cur.length > prev ? cur.length : prev); }, 0));
    // tooltip height
    var height = (_e = tooltipProps.height) !== null && _e !== void 0 ? _e : calcTooltipHeight(valuesWithLabels.length);
    rolloverTooltip.updateSize(width, height);
    valuesWithLabels.forEach(function (val, index) {
        valuesBlock += "<tspan x=\"8\" dy=\"1.2em\">".concat(val, "</tspan>");
    });
    var blur = "<feGaussianBlur result=\"blurOut\" in=\"offOut\" stdDeviation=\"3\" />";
    if (shadowColor !== undefined) {
        var shadowRGBA = (0, parseColor_1.parseColorToTArgb)(shadowColor);
        blur = "<feColorMatrix result=\"matrixOut\" in=\"offOut\" type=\"matrix\"\n        values=\"0 0 0 0 ".concat(shadowRGBA.red / 255, "\n                0 0 0 0 ").concat(shadowRGBA.green / 255, "\n                0 0 0 0 ").concat(shadowRGBA.blue / 255, "\n                0 0 0 ").concat(shadowRGBA.opacity / 255, " 0\" />\n        <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"3\" />");
    }
    return "<svg class=\"scichart__rollover-tooltip\" width=\"".concat(width, "\" height=\"").concat(height, "\">\n        <defs>\n            <filter id=\"").concat(id, "\" x=\"0\" y=\"0\" width=\"200%\" height=\"200%\">\n                <feOffset result=\"offOut\" in=\"SourceAlpha\" dx=\"3\" dy=\"3\" />\n                ").concat(blur, "\n                <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n            </filter>\n        </defs>\n        <rect rx=\"4\" ry=\"4\" width=\"90%\" height=\"90%\" fill=\"").concat(tooltipColor, "\" filter=\"url(#").concat(id, ")\" />\n        <svg width=\"100%\">\n            <text x=\"8\" y=\"3\" font-size=\"13\" font-family=\"Verdana\" dy=\"0\" fill=\"").concat(tooltipTextColor, "\">").concat(valuesBlock, "</text>\n        </svg>\n    </svg>");
};
/** @ignore */
var calcTooltipWidth = function (textLength, fontSize) {
    if (textLength === void 0) { textLength = 20; }
    if (fontSize === void 0) { fontSize = 13; }
    return textLength * 8 + 20;
};
/** @ignore */
var calcTooltipHeight = function (lines, fontSize) {
    if (lines === void 0) { lines = 2; }
    if (fontSize === void 0) { fontSize = 13; }
    return 17 * lines + 16;
};
/** @ignore */
var addValueWithLabel = function (valuesWithLabels, xValue, yValue, xLabel, yLabel) {
    if (xLabel) {
        var yLabel2 = yLabel !== null && yLabel !== void 0 ? yLabel : "Y";
        valuesWithLabels.push("".concat(xLabel, ": ").concat(xValue, " ").concat(yLabel2, ": ").concat(yValue));
    }
    else {
        var yLabel2 = yLabel ? "".concat(yLabel, ": ") : "";
        valuesWithLabels.push("".concat(yLabel2).concat(yValue));
    }
};
