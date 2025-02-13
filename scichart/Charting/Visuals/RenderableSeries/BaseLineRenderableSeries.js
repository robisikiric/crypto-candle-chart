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
exports.BaseLineRenderableSeries = exports.ELineType = void 0;
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var LineSeriesDataLabelProvider_1 = require("./DataLabels/LineSeriesDataLabelProvider");
var LineSeriesDrawingProvider_1 = require("./DrawingProviders/LineSeriesDrawingProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var LineSeriesHitTestProvider_1 = require("./HitTest/LineSeriesHitTestProvider");
var ELineType;
(function (ELineType) {
    ELineType["Normal"] = "Normal";
    ELineType["Digital"] = "Digital";
    /** Horizontal line from the point to the x value of the next point */
    ELineType["DigitalNoEdge"] = "DigitalNoEdge";
    /** Digital Line that goes Up then across, instead of Across then Up */
    ELineType["DigitalYX"] = "DigitalYX";
})(ELineType = exports.ELineType || (exports.ELineType = {}));
var BaseLineRenderableSeries = /** @class */ (function (_super) {
    __extends(BaseLineRenderableSeries, _super);
    function BaseLineRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.strokeDashArrayProperty = [];
        _this.lineTypeProperty = ELineType.Normal;
        _this.strokeDashArrayProperty = options === null || options === void 0 ? void 0 : options.strokeDashArray;
        _this.lineTypeProperty = (_a = options === null || options === void 0 ? void 0 : options.lineType) !== null && _a !== void 0 ? _a : _this.lineTypeProperty;
        _this.drawingProviders = [];
        _this.drawingProviders.push(new LineSeriesDrawingProvider_1.LineSeriesDrawingProvider(webAssemblyContext, _this));
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new LineSeriesDataLabelProvider_1.LineSeriesDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    /** @inheritDoc */
    BaseLineRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.stroke === previousThemeProvider.lineSeriesColor) {
            this.stroke = themeProvider.lineSeriesColor;
        }
    };
    Object.defineProperty(BaseLineRenderableSeries.prototype, "strokeDashArray", {
        /**
         * The StrokeDashArray defines the stroke or dash pattern for the line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        get: function () {
            return this.strokeDashArrayProperty;
        },
        /**
         * The StrokeDashArray defines the stroke or dash pattern for the line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        set: function (strokeDashArray) {
            this.strokeDashArrayProperty = strokeDashArray;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_DASH_ARRAY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLineRenderableSeries.prototype, "lineType", {
        /**
         * The type of line to draw.  One of {@link ELineType}. Replaces isDigitalLine
         */
        get: function () {
            return this.lineTypeProperty;
        },
        /**
         * The type of line to draw.  One of {@link ELineType}. Replaces isDigitalLine
         */
        set: function (lineType) {
            this.lineTypeProperty = lineType;
            this.notifyPropertyChanged(constants_1.PROPERTY.LINE_TYPE);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseLineRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            strokeDashArray: this.strokeDashArray,
            lineType: this.lineTypeProperty
        };
        Object.assign(json.options, options);
        return json;
    };
    /**
     * @inheritDoc
     */
    BaseLineRenderableSeries.prototype.newHitTestProvider = function () {
        return new LineSeriesHitTestProvider_1.LineSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return BaseLineRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.BaseLineRenderableSeries = BaseLineRenderableSeries;
