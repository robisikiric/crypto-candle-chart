"use strict";
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
exports.BaseDataLabelProvider = void 0;
var Guard_1 = require("../../../../Core/Guard");
var TextPosition_1 = require("../../../../types/TextPosition");
var parseColor_1 = require("../../../../utils/parseColor");
var IThemeProvider_1 = require("../../../Themes/IThemeProvider");
var NativeObject_1 = require("../../Helpers/NativeObject");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var BaseDataLabelProvider = /** @class */ (function () {
    /**
     * Creates an instance of the {@link DataLabelProvider}
     */
    function BaseDataLabelProvider(options) {
        var _this = this;
        /**
         * The text to draw, along with the sizes and positions.  Usually generated, but can be updated before final drawing
         */
        this.dataLabels = [];
        this.getstyleProxy = function (newStyle) {
            return new Proxy(newStyle, {
                set: function (target, key, value) {
                    //@ts-ignore
                    target[key] = value;
                    _this.invalidateParent();
                    return true;
                }
            });
        };
        this.styleProperty = (options === null || options === void 0 ? void 0 : options.style) ? this.getstyleProxy(options === null || options === void 0 ? void 0 : options.style) : undefined;
        this.colorProperty = options === null || options === void 0 ? void 0 : options.color;
    }
    /**
     * Called when a DataLabelProvider is attached to a parent {@link IRenderableSeries | RenderableSeries}
     * @param webAssemblyContext
     * @param parentSeries
     */
    BaseDataLabelProvider.prototype.onAttach = function (webAssemblyContext, parentSeries) {
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        Guard_1.Guard.notNull(parentSeries, "parentSeries");
        this.webAssemblyContext = webAssemblyContext;
        this.parentSeries = parentSeries;
    };
    BaseDataLabelProvider.prototype.onDetach = function () {
        this.webAssemblyContext = undefined;
        this.parentSeries = undefined;
    };
    BaseDataLabelProvider.prototype.delete = function () { };
    Object.defineProperty(BaseDataLabelProvider.prototype, "style", {
        /**
         * Gets or sets the text style used for data labels. The style must be set, with fontFamily and fontSize set, in order for text to be drawn.
         */
        get: function () {
            return this.styleProperty;
        },
        /**
         * Gets or sets the text style used for data labels. The style must be set, with fontFamily and fontSize set, in order for text to be drawn.
         */
        set: function (value) {
            this.styleProperty = this.getstyleProxy(value);
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseDataLabelProvider.prototype, "color", {
        /**
         * Gets or sets the color for data labels.  Defaults to axis label color
         */
        get: function () {
            var _a, _b, _c;
            if (!this.colorProperty) {
                return (_c = (_b = (_a = this.parentSeries) === null || _a === void 0 ? void 0 : _a.parentSurface) === null || _b === void 0 ? void 0 : _b.themeProvider) === null || _c === void 0 ? void 0 : _c.tickTextBrush;
            }
            return (0, IThemeProvider_1.stripAutoColor)(this.colorProperty);
        },
        /**
         * Gets or sets the color for data labels.  Defaults to axis label color
         */
        set: function (value) {
            this.colorProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    /** Update the style.  Only the properties passed will be updated */
    BaseDataLabelProvider.prototype.updateStyle = function (value) {
        this.styleProperty = this.getstyleProxy(__assign(__assign({}, this.styleProperty), value));
        this.invalidateParent();
    };
    /**
     * Base behaviour is to do nothing.  Labels will only be drawn if they have been manually set
     */
    BaseDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) { };
    BaseDataLabelProvider.prototype.draw = function (renderContext) {
        var _a, _b, _c;
        if (!this.dataLabels || this.dataLabels.length === 0) {
            return;
        }
        if (!this.style || !this.style.fontFamily || !this.style.fontSize) {
            return;
        }
        var color = (0, parseColor_1.parseColorToUIntArgb)(this.color);
        var dpiAdjustedStyle = DpiHelper_1.DpiHelper.adjustTextStyle(this.style);
        var font = renderContext.getFont(dpiAdjustedStyle);
        var rotationVector = (0, NativeObject_1.getVector4)(this.webAssemblyContext, 0, 0, 0, 0);
        var alignMode = (0, TextPosition_1.convertMultiLineAlignment)(this.style.multiLineAlignment, this.webAssemblyContext);
        for (var _i = 0, _d = this.dataLabels; _i < _d.length; _i++) {
            var item = _d[_i];
            // Adjust the postion to take into account the seriesVewRect.
            // We do this because we are ending the font after the transformation has been popped.
            font.DrawStringAdvanced((_a = item.text) !== null && _a !== void 0 ? _a : "", (_b = item.color) !== null && _b !== void 0 ? _b : color, Math.round(item.position.x + this.parentSeries.parentSurface.seriesViewRect.left), Math.round(item.position.y + this.parentSeries.parentSurface.seriesViewRect.top), rotationVector, alignMode, (_c = this.style.lineSpacing) !== null && _c !== void 0 ? _c : 2);
        }
        // Don't end font here to facilitate batch drawing
    };
    BaseDataLabelProvider.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        if (this.colorProperty && this.colorProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getStrokeColor(index, maxSeries, this.webAssemblyContext);
            this.color = IThemeProvider_1.AUTO_COLOR + color;
        }
    };
    BaseDataLabelProvider.prototype.toJSON = function () {
        return { type: this.type, options: { style: this.style, color: this.color } };
    };
    BaseDataLabelProvider.prototype.invalidateParent = function () {
        var _a;
        if ((_a = this.parentSeries) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback) {
            this.parentSeries.invalidateParentCallback();
        }
    };
    return BaseDataLabelProvider;
}());
exports.BaseDataLabelProvider = BaseDataLabelProvider;
