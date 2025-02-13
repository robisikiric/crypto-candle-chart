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
exports.wrapText = exports.TextLabelProvider = void 0;
var LabelProviderType_1 = require("../../../../types/LabelProviderType");
var TextureManager_1 = require("../../TextureManager/TextureManager");
var LabelCache_1 = require("./LabelCache");
var LabelProviderBase2D_1 = require("./LabelProviderBase2D");
var TextLabelProvider = /** @class */ (function (_super) {
    __extends(TextLabelProvider, _super);
    function TextLabelProvider(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        _this.type = LabelProviderType_1.ELabelProviderType.Text;
        _this.maxLengthProperty = 0;
        _this.labelsProperty = (_a = options === null || options === void 0 ? void 0 : options.labels) !== null && _a !== void 0 ? _a : [];
        _this.maxLength = (_b = options === null || options === void 0 ? void 0 : options.maxLength) !== null && _b !== void 0 ? _b : _this.maxLength;
        _this.formatLabelProperty = function (dataValue) {
            var _a, _b;
            if (_this.parentAxis.isCategoryAxis && Array.isArray(_this.labels)) {
                var categoryCoordCalc = _this.parentAxis.getCurrentCoordinateCalculator();
                var index = categoryCoordCalc.transformDataToIndex(dataValue);
                return _this.wrapText((_a = _this.labels[index]) !== null && _a !== void 0 ? _a : "");
            }
            return _this.wrapText((_b = _this.labels[dataValue]) !== null && _b !== void 0 ? _b : "");
        };
        _this.formatCursorLabelProperty = _this.formatLabelProperty;
        return _this;
    }
    Object.defineProperty(TextLabelProvider.prototype, "labels", {
        /**
         * The label text to use.  If not set by options this will be an empty array.
         * When adding/updating labels, you should replace the whole array or object if you want to trigger chart updates.
         * If you pass an object like {1:"one", 2:"two", 3:"three"} then labels will be chosen based on the tick value.
         * eg ticks 3,1 will result in "three", "one".
         * If you pass an array like ["one", "two", "three"] then for a category axis it will use the labels in the order given, regardless of data value.
         * If you know that your x data will be a fixed set in a fixed order, then passing an array of labels is simpler.
         * To manually specify multiple lines, pass an array for the label eg ["One line",["Two","Lines"],["Three","more","lines"]]
         */
        get: function () {
            return this.labelsProperty;
        },
        /**
         * The label text to use.  If not set by options this will be an empty array.
         * When adding/updating labels, you should replace the whole array or object if you want to trigger chart updates.
         * If you pass an object like {1:"one", 2:"two", 3:"three"} then labels will be chosen based on the tick value.
         * eg ticks 3,1 will result in "three", "one".
         * If you pass an array like ["one", "two", "three"] then for a category axis it will use the labels in the order given, regardless of data value.
         * If you know that your x data will be a fixed set in a fixed order, then passing an array of labels is simpler.
         * To manually specify multiple lines, pass an array for the label eg ["One line",["Two","Lines"],["Three","more","lines"]]
         */
        set: function (labels) {
            this.labelsProperty = labels;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextLabelProvider.prototype, "maxLength", {
        /**
         * Wrap text longer than this number of characters.  Will only wrap whole words.
         */
        get: function () {
            return this.maxLengthProperty;
        },
        set: function (value) {
            this.maxLengthProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    TextLabelProvider.prototype.onBeginAxisDraw = function () { };
    TextLabelProvider.prototype.getLabelWidth = function (ctx, labelText, labelStyle) {
        if (this.useNativeText || this.rotation % 90 === 0 || !this.parentAxis.isHorizontalAxis) {
            var cachedlabel = LabelCache_1.labelCache.getLabel(labelText, this.styleId);
            if (!cachedlabel) {
                var padding = labelStyle.padding;
                return (0, TextureManager_1.measureTextWidth)(ctx, labelText) + padding.left + padding.right;
            }
            return cachedlabel.textureWidth;
        }
        else {
            var lines = Array.isArray(labelText) ? labelText : labelText.split("\n");
            return (lines.length * this.lineSpacing * labelStyle.fontSize +
                labelStyle.padding.left +
                labelStyle.padding.right);
        }
    };
    TextLabelProvider.prototype.getLabelTexture = function (labelText, textureManager, labelStyle) {
        var lines = labelText.split("\n");
        return textureManager.createTextTexture(lines, labelStyle, this.rotation, this.lineSpacing);
    };
    /**
     * Wraps the label text and returns it as a string with newlines
     */
    TextLabelProvider.prototype.wrapText = function (text) {
        if (text && Array.isArray(text))
            return text.join("\n");
        return (0, exports.wrapText)(text, this.maxLength).join("\n");
    };
    TextLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            labels: this.labels,
            maxLength: this.maxLength
        };
        Object.assign(json.options, options);
        return json;
    };
    TextLabelProvider.prototype.getCachedStyle = function () {
        var axis = this.parentAxis;
        return __assign(__assign({}, axis.dpiAdjustedLabelStyle), { rotation: this.rotation, extras: "ls".concat(this.lineSpacing, ",ml").concat(this.maxLength), providerId: this.useSharedCache ? undefined : this.providerId });
    };
    return TextLabelProvider;
}(LabelProviderBase2D_1.LabelProviderBase2D));
exports.TextLabelProvider = TextLabelProvider;
/**
 * Convert a string into an array of lines by splitting on spaces and wrapping to a maximum number of characters
 */
var wrapText = function (text, maxLength) {
    if (maxLength === 0)
        return [text];
    var lines = [];
    if (!text) {
        return lines;
    }
    var words = text.split(" ");
    var line = "";
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        var newLine = line + (line !== "" ? " " : "") + word;
        if (newLine.length > maxLength) {
            if (line === "") {
                lines.push(word);
            }
            else {
                lines.push(line);
                line = word;
            }
        }
        else {
            line = newLine;
        }
    }
    lines.push(line);
    return lines;
};
exports.wrapText = wrapText;
