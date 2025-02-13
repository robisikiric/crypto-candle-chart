"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolloverModifierRenderableSeriesProps = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var SciChartSurfaceBase_1 = require("../../SciChartSurfaceBase");
var constants_1 = require("./constants");
var RolloverModifierRenderableSeriesProps = /** @class */ (function () {
    function RolloverModifierRenderableSeriesProps(renderableSeries, isY1) {
        if (isY1 === void 0) { isY1 = false; }
        this.tooltipLegendOffsetX = 20;
        this.tooltipLegendOffsetY = 20;
        this.showsRolloverProperty = true;
        this.tooltipTextColorProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.textAnnotationForeground;
        this.renderableSeries = renderableSeries;
        this.isY1 = isY1;
    }
    RolloverModifierRenderableSeriesProps.copy = function (from, to) {
        to.markerColorProperty = from.markerColor;
        to.showsRolloverProperty = from.showRollover;
        to.tooltipColorProperty = from.tooltipColor;
        to.tooltipDataTemplateProperty = from.tooltipDataTemplate;
        to.tooltipLabelX = from.tooltipLabelX;
        to.tooltipLabelY = from.tooltipLabelY;
        to.tooltipLegendOffsetX = from.tooltipLegendOffsetX;
        to.tooltipLegendOffsetY = from.tooltipLegendOffsetY;
        to.tooltipTemplate = from.tooltipTemplate;
        to.tooltipTextColorProperty = from.tooltipTextColorProperty;
        to.tooltipTitleProperty = from.tooltipTitle;
        to.shadowColorProperty = from.shadowColorProperty;
        to.invalidateParentCallback = from.invalidateParentCallback;
    };
    RolloverModifierRenderableSeriesProps.prototype.setInvalidateParentCallback = function (callback) {
        this.invalidateParentCallback = callback;
    };
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "showRollover", {
        get: function () {
            return this.showsRolloverProperty;
        },
        set: function (value) {
            this.showsRolloverProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.SHOWS_ROLLOVER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "tooltipColor", {
        get: function () {
            if (this.tooltipColorProperty) {
                return this.tooltipColorProperty;
            }
            else if (this.getRenderableSeriesStroke()) {
                return this.getRenderableSeriesStroke();
            }
            else {
                return SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.textAnnotationBackground;
            }
        },
        set: function (value) {
            this.tooltipColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "tooltipTextColor", {
        get: function () {
            return this.tooltipTextColorProperty;
        },
        set: function (value) {
            this.tooltipTextColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_TEXT_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "tooltipTitle", {
        get: function () {
            return this.tooltipTitleProperty;
        },
        set: function (value) {
            this.tooltipTitleProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_TITLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "markerColor", {
        get: function () {
            if (this.markerColorProperty) {
                return this.markerColorProperty;
            }
            else if (this.getRenderableSeriesStroke()) {
                return this.getRenderableSeriesStroke();
            }
            else {
                return SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.textAnnotationBackground;
            }
        },
        set: function (value) {
            this.markerColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.MARKER_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "shadowColor", {
        get: function () {
            return this.shadowColorProperty;
        },
        set: function (value) {
            this.shadowColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_SHADOW_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "tooltipDataTemplate", {
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
    Object.defineProperty(RolloverModifierRenderableSeriesProps.prototype, "tooltipLegendTemplate", {
        get: function () {
            return this.tooltipLegendTemplateProperty;
        },
        // TODO: remove in version 2.0
        set: function (value) {
            console.warn("tooltipLegendTemplate property on the RolloverModifierRenderableSeriesProps will be removed in version 2.0, please set tooltipLegendTemplate on the RolloverModifier instead");
            this.tooltipLegendTemplateProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    RolloverModifierRenderableSeriesProps.prototype.delete = function () {
        var _a, _b;
        this.rolloverModifier = undefined;
        if (!((_a = this.marker) === null || _a === void 0 ? void 0 : _a.isDeleted)) {
            this.marker = (0, Deleter_1.deleteSafe)(this.marker);
        }
        this.marker = undefined;
        if (!((_b = this.tooltip) === null || _b === void 0 ? void 0 : _b.isDeleted)) {
            this.tooltip = (0, Deleter_1.deleteSafe)(this.tooltip);
        }
        this.tooltip = undefined;
    };
    RolloverModifierRenderableSeriesProps.prototype.notifyPropertyChanged = function (propertyName) {
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    RolloverModifierRenderableSeriesProps.prototype.getRenderableSeriesStroke = function () {
        if (this.isY1) {
            var bandRS = this.renderableSeries;
            // @ts-ignore
            return bandRS.strokeY1Property;
        }
        // Get property here to retain Auto_Color prefix
        // @ts-ignore
        return this.renderableSeries.strokeProperty;
    };
    return RolloverModifierRenderableSeriesProps;
}());
exports.RolloverModifierRenderableSeriesProps = RolloverModifierRenderableSeriesProps;
