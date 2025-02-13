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
exports.RolloverLegendSvgAnnotation = void 0;
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var SvgAnnotationBase_1 = require("./SvgAnnotationBase");
/**
 * A Rollover Legend Annotation which provides an SVG tooltip over the chart. Used by the {@link RolloverModifier}
 */
var RolloverLegendSvgAnnotation = /** @class */ (function (_super) {
    __extends(RolloverLegendSvgAnnotation, _super);
    /**
     * Creates an instance of the {@link RolloverLegendSvgAnnotation}
     * @param options
     */
    function RolloverLegendSvgAnnotation(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.SVG;
        _this.seriesInfosProperty = [];
        _this.isHidden = true;
        _this.tooltipLegendTemplateProperty = (_a = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _a !== void 0 ? _a : _this.tooltipLegendTemplateProperty;
        _this.tooltipLegendOffsetXProperty = (_b = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _b !== void 0 ? _b : _this.tooltipLegendOffsetXProperty;
        _this.tooltipLegendOffsetYProperty = (_c = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _c !== void 0 ? _c : _this.tooltipLegendOffsetYProperty;
        return _this;
    }
    Object.defineProperty(RolloverLegendSvgAnnotation.prototype, "seriesInfos", {
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
                // Compare infos against the ones for the matching series.  See if any are different
                if (newSeriesInfos.length !== this.seriesInfosProperty.length ||
                    this.seriesInfosProperty
                        .map(function (seriesInfo) {
                        return seriesInfo.equals(newSeriesInfos.find(function (newSeriesInfo) { return newSeriesInfo.renderableSeries.id === seriesInfo.renderableSeries.id; }));
                    })
                        .some(function (sameSeriesInfo) { return sameSeriesInfo === false; })) {
                    this.seriesInfosProperty = newSeriesInfos;
                    this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_INFOS);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverLegendSvgAnnotation.prototype, "tooltipLegendTemplate", {
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
    Object.defineProperty(RolloverLegendSvgAnnotation.prototype, "tooltipLegendOffsetX", {
        get: function () {
            return this.tooltipLegendOffsetXProperty;
        },
        set: function (value) {
            this.tooltipLegendOffsetXProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_LEGEND_OFFSET_X);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverLegendSvgAnnotation.prototype, "tooltipLegendOffsetY", {
        get: function () {
            return this.tooltipLegendOffsetYProperty;
        },
        set: function (value) {
            this.tooltipLegendOffsetYProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_LEGEND_OFFSET_Y);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    RolloverLegendSvgAnnotation.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        if (!this.tooltipLegendTemplate) {
            return;
        }
        if (this.svg) {
            this.delete();
        }
        this.create(xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans);
    };
    /**
     * @inheritDoc
     */
    RolloverLegendSvgAnnotation.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var svgString = this.tooltipLegendTemplate(this.seriesInfos, this);
        var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
        this.setSvg(svgNode);
        this.setSvgAttribute("x", this.tooltipLegendOffsetX + xCoordSvgTrans);
        this.setSvgAttribute("y", this.tooltipLegendOffsetY + yCoordSvgTrans);
    };
    return RolloverLegendSvgAnnotation;
}(SvgAnnotationBase_1.SvgAnnotationBase));
exports.RolloverLegendSvgAnnotation = RolloverLegendSvgAnnotation;
