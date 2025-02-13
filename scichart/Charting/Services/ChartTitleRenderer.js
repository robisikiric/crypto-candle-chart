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
exports.ChartTitleRenderer = void 0;
var Thickness_1 = require("../../Core/Thickness");
var TextStyle_1 = require("../../types/TextStyle");
var SciChartSurfaceBase_1 = require("../Visuals/SciChartSurfaceBase");
var TitleRenderer_1 = require("./TitleRenderer");
/**
 * Draws a chart title
 */
var ChartTitleRenderer = /** @class */ (function (_super) {
    __extends(ChartTitleRenderer, _super);
    function ChartTitleRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleOffsetProperty = Thickness_1.Thickness.fromNumber(0);
        return _this;
    }
    Object.defineProperty(ChartTitleRenderer.prototype, "titleOffset", {
        /**
         * Defines a padding reserved for space taken by a title
         */
        get: function () {
            return this.titleOffsetProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calculates {@link ChartTitleRenderer.titleOffset}
     */
    ChartTitleRenderer.prototype.measure = function (title, originalTextStyle, renderContext) {
        var _a;
        var shouldUpdateTextSize = title !== this.text ||
            !(0, TextStyle_1.areEqualTextStyles)(originalTextStyle, this.originalTextStyle) ||
            ((_a = this.originalTextStyle) === null || _a === void 0 ? void 0 : _a.position) !== originalTextStyle.position;
        if (title && title.length > 0) {
            if (!this.useCache || (!this.texture && !originalTextStyle.useNativeText) || shouldUpdateTextSize) {
                // recalculate cached text size info or texture
                this.invalidateCache();
                this.text = title;
                this.originalTextStyle = __assign({}, originalTextStyle);
                this.textStyle = (0, TextStyle_1.adjustTextStyle)(originalTextStyle);
                this.useNativeTextProperty = originalTextStyle.useNativeText;
                this.titlePosition = originalTextStyle.position;
                this.getTextSize(title, this.textStyle, renderContext);
            }
            else {
                // update text style properties that only affect placement
                this.textStyle.alignment = originalTextStyle.alignment;
                this.textStyle.placeWithinChart = originalTextStyle.placeWithinChart;
            }
        }
        this.titleOffsetProperty = this.getTitleOffset(title, this.textStyle);
    };
    /**
     * Calculates {@link ChartTitleRenderer.viewRect} of the title
     * @param chartViewRect - the container area which is used as an origin for title layout calculation
     */
    ChartTitleRenderer.prototype.layout = function (chartViewRect) {
        if (!this.text || this.text.length === 0) {
            this.viewRectProperty = undefined;
            return;
        }
        this.viewRectProperty = this.getViewRect(this.text, chartViewRect, this.textStyle.position, this.textStyle.alignment);
    };
    /**
     * Performs rendering of the title
     */
    ChartTitleRenderer.prototype.draw = function (renderContext) {
        if (!this.text || this.text.length === 0) {
            return;
        }
        if (SciChartSurfaceBase_1.DebugForDpi) {
            console.log("ChartTitleRenderer.draw fontSize: ".concat(this.textStyle.fontSize));
        }
        var _a = this.textStyle, useNativeText = _a.useNativeText, position = _a.position, lineSpacing = _a.lineSpacing;
        this.drawInternal(renderContext, useNativeText, position);
        if (this.drawDebug) {
            this.drawTitleDebugViewRect(renderContext);
        }
    };
    ChartTitleRenderer.prototype.getTitleTexture = function () {
        var position = this.textStyle.position;
        var adjRotation = (0, TitleRenderer_1.getAdjustedRotation)(this.textStyle.rotation, position);
        var titleText = Array.isArray(this.text) ? this.text : this.text.split("\n");
        var texture = this.textureManager.createTextTexture(titleText, 
        // @ts-ignore mismatch with TTextStyle
        this.textStyle, 
        // { ...this.textStyle, padding: new Thickness(0, 0, 0, 0) },
        adjRotation, this.textStyle.lineSpacing);
        return texture;
    };
    /**
     * Calculates the {@link ChartTitleRenderer.titleOffset}
     */
    ChartTitleRenderer.prototype.getTitleOffset = function (title, textStyle) {
        if (!this.text || this.text.length === 0 || textStyle.placeWithinChart) {
            return Thickness_1.Thickness.fromNumber(0);
        }
        var height = this.textHeight;
        switch (textStyle.position) {
            case TextStyle_1.ETitlePosition.Top:
                return new Thickness_1.Thickness(height, 0, 0, 0);
            case TextStyle_1.ETitlePosition.Bottom:
                return new Thickness_1.Thickness(0, 0, height, 0);
            case TextStyle_1.ETitlePosition.Left:
                return new Thickness_1.Thickness(0, 0, 0, height);
            case TextStyle_1.ETitlePosition.Right:
                return new Thickness_1.Thickness(0, height, 0, 0);
            default:
                return (0, TextStyle_1.handleInvalidChartTitlePosition)(textStyle.position);
        }
    };
    return ChartTitleRenderer;
}(TitleRenderer_1.TitleRendererBase));
exports.ChartTitleRenderer = ChartTitleRenderer;
