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
exports.BaseMountainRenderableSeries = void 0;
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var DataLabelProvider_1 = require("./DataLabels/DataLabelProvider");
var MountainSeriesDrawingProvider_1 = require("./DrawingProviders/MountainSeriesDrawingProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var MountainSeriesHitTestProvider_1 = require("./HitTest/MountainSeriesHitTestProvider");
var BaseMountainRenderableSeries = /** @class */ (function (_super) {
    __extends(BaseMountainRenderableSeries, _super);
    function BaseMountainRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.zeroLineYProperty = 0;
        _this.fillProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.mountainAreaBrush;
        _this.strokeDashArrayProperty = [];
        _this.stroke = (_a = options === null || options === void 0 ? void 0 : options.stroke) !== null && _a !== void 0 ? _a : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.mountainLineColor;
        _this.strokeDashArrayProperty = (_b = options === null || options === void 0 ? void 0 : options.strokeDashArray) !== null && _b !== void 0 ? _b : _this.strokeDashArrayProperty;
        _this.fillProperty = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : _this.fillProperty;
        _this.zeroLineYProperty = (_d = options === null || options === void 0 ? void 0 : options.zeroLineY) !== null && _d !== void 0 ? _d : _this.zeroLineYProperty;
        _this.fillLinearGradientProperty = (_e = options === null || options === void 0 ? void 0 : options.fillLinearGradient) !== null && _e !== void 0 ? _e : _this.fillLinearGradientProperty;
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new DataLabelProvider_1.DataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        _this.drawingProviders.push(new MountainSeriesDrawingProvider_1.MountainSeriesDrawingProvider(webAssemblyContext, _this));
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    BaseMountainRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.fill === previousThemeProvider.mountainAreaBrush) {
            this.fill = themeProvider.mountainAreaBrush;
        }
        if (this.stroke === previousThemeProvider.mountainLineColor) {
            this.stroke = themeProvider.mountainLineColor;
        }
    };
    Object.defineProperty(BaseMountainRenderableSeries.prototype, "fill", {
        /**
         * Gets or sets the fill color as an HTML Color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.fillProperty);
        },
        /**
         * Gets or sets the fill color as an HTML Color code
         */
        set: function (htmlColorCode) {
            this.fillProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseMountainRenderableSeries.prototype, "zeroLineY", {
        /**
         * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
         */
        get: function () {
            return this.zeroLineYProperty;
        },
        /**
         * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
         */
        set: function (zeroLineY) {
            this.zeroLineYProperty = zeroLineY;
            this.notifyPropertyChanged(constants_1.PROPERTY.ZERO_LINE_Y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseMountainRenderableSeries.prototype, "fillLinearGradient", {
        /**
         * Gets or sets the fill as a gradient brush
         */
        get: function () {
            return this.fillLinearGradientProperty;
        },
        /**
         * Gets or sets the fill as a gradient brush
         */
        set: function (gradientBrushParams) {
            // We need this check, to prevent creating new Texture if we set the same value
            if (gradientBrushParams !== this.fillLinearGradientProperty) {
                this.fillLinearGradientProperty = gradientBrushParams;
                this.notifyPropertyChanged(constants_1.PROPERTY.FILL_LINEAR_GRADIENT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseMountainRenderableSeries.prototype, "strokeDashArray", {
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
    /** @inheritDoc */
    BaseMountainRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            fill: this.fill,
            fillLinearGradient: this.fillLinearGradient,
            strokeDashArray: this.strokeDashArray,
            zeroLineY: this.zeroLineY
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    BaseMountainRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fill", color);
        }
    };
    /**
     * @inheritDoc
     */
    BaseMountainRenderableSeries.prototype.newHitTestProvider = function () {
        return new MountainSeriesHitTestProvider_1.MountainSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return BaseMountainRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.BaseMountainRenderableSeries = BaseMountainRenderableSeries;
