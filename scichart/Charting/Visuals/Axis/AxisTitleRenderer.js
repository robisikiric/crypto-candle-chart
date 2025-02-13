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
exports.AxisTitleRenderer = void 0;
var Thickness_1 = require("../../../Core/Thickness");
var LabelAlignment_1 = require("../../../types/LabelAlignment");
var TextStyle_1 = require("../../../types/TextStyle");
var TitleRenderer_1 = require("../../Services/TitleRenderer");
/**
 * Draws an axis title using our WebGL Rendering engine
 */
var AxisTitleRenderer = /** @class */ (function (_super) {
    __extends(AxisTitleRenderer, _super);
    function AxisTitleRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lineSpacing = 1.1;
        return _this;
    }
    AxisTitleRenderer.prototype.measure = function (text, textStyle, axisAlignment) {
        if (text === void 0) { text = ""; }
        this.text = text;
        var shouldUpdateTextSize = !this.useCache ||
            (!this.texture && !this.useNativeText) ||
            this.text !== this.previousText ||
            this.lineSpacing !== this.previousLineSpacing ||
            axisAlignment !== this.previousAxisAlignment ||
            this.previousNativeTextMode !== this.useNativeText ||
            !checkAreEqualTextStyles(textStyle, this.textStyle);
        if (shouldUpdateTextSize) {
            this.invalidateCache();
            this.previousLineSpacing = this.lineSpacing;
            this.previousNativeTextMode = this.useNativeText;
            this.previousAxisAlignment = axisAlignment;
            this.previousText = text;
            this.textStyle = textStyle;
            this.titlePosition = TextStyle_1.ETitlePosition[axisAlignment];
            this.textStyle = textStyle;
            // @ts-ignore mismatch with TTextStyle
            this.textStyle.lineSpacing = this.lineSpacing;
            var renderContext = this.parentSurface.currentWebGlRenderContext;
            // @ts-ignore mismatch with TTextStyle
            this.getTextSize(text, this.textStyle, renderContext);
        }
    };
    Object.defineProperty(AxisTitleRenderer.prototype, "useNativeText", {
        get: function () {
            return this.useNativeTextProperty;
        },
        set: function (value) {
            this.useNativeTextProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisTitleRenderer.prototype, "desiredHeight", {
        get: function () {
            return this.desiredHeightProperty;
        },
        set: function (value) {
            if (this.desiredWidthProperty !== value) {
                this.invalidateCache();
            }
            this.desiredHeightProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisTitleRenderer.prototype, "desiredWidth", {
        get: function () {
            return this.desiredWidthProperty;
        },
        set: function (value) {
            if (this.desiredWidthProperty !== value) {
                this.invalidateCache();
            }
            this.desiredWidthProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    AxisTitleRenderer.prototype.layout = function (rect) {
        if (!this.text) {
            this.viewRectProperty = rect;
            return;
        }
        var alignment = convertLabelAlignmentToTextAlignment(this.textStyle.alignment);
        this.viewRectProperty = this.getViewRect(this.text, rect, this.titlePosition, alignment);
    };
    AxisTitleRenderer.prototype.getTitleTexture = function () {
        var position = this.titlePosition;
        var adjRotation = (0, TitleRenderer_1.getAdjustedRotation)(this.textStyle.rotation, position);
        var titleText = Array.isArray(this.text) ? this.text : this.text.split("\n");
        var texture = this.textureManager.createTextTexture(titleText, 
        // @ts-ignore mismatch with TTextStyle
        this.textStyle, 
        // { ...this.textStyle, padding: new Thickness(0, 0, 0, 0) },
        adjRotation, this.lineSpacing);
        return texture;
    };
    AxisTitleRenderer.prototype.draw = function (renderContext) {
        if (this.drawDebug) {
            this.drawTitleDebugViewRect(renderContext);
        }
        return this.drawInternal(renderContext, this.useNativeText, this.titlePosition);
    };
    AxisTitleRenderer.prototype.delete = function () {
        this.parentSurface = undefined;
        _super.prototype.delete.call(this);
    };
    return AxisTitleRenderer;
}(TitleRenderer_1.TitleRendererBase));
exports.AxisTitleRenderer = AxisTitleRenderer;
var checkAreEqualTextStyles = function (style1, style2) {
    if (!style1 || !style2) {
        return false;
    }
    return (style1.color === style2.color &&
        style1.fontFamily === style2.fontFamily &&
        style1.fontSize === style2.fontSize &&
        style1.fontStyle === style2.fontStyle &&
        style1.fontWeight === style2.fontWeight &&
        style1.alignment === style2.alignment &&
        style1.rotation === style2.rotation &&
        style1.multilineAlignment === style2.multilineAlignment &&
        ((style1.padding === undefined && style2.padding === undefined)
            || Thickness_1.Thickness.areEqual(style1.padding, style2.padding)));
};
// TODO consider refactoring
// helper function used to unify title renderer types & interfaces
var convertLabelAlignmentToTextAlignment = function (alignment) {
    if (alignment === LabelAlignment_1.ELabelAlignment.Auto) {
        return TextStyle_1.ETextAlignment.Center;
    }
    return TextStyle_1.ETextAlignment[alignment];
};
