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
exports.TextDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var Rect_1 = require("../../../../Core/Rect");
var NativeObject_1 = require("../../Helpers/NativeObject");
var BaseDataLabelProvider_1 = require("./BaseDataLabelProvider");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var DataLabelState_1 = require("./DataLabelState");
var TextPosition_1 = require("../../../../types/TextPosition");
/**
 * A DataLabelProvider sepcifically designed to work with {@link FastTextRenderableSeries } or any series that uses an {@link XYTextDataSeries }
 * Text is taken directly from the textValues on the dataSeries and placed at the x,y coordinates (anchored top, left)
 */
var TextDataLabelProvider = /** @class */ (function (_super) {
    __extends(TextDataLabelProvider, _super);
    function TextDataLabelProvider(options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, __assign(__assign({}, options), { style: __assign({ fontFamily: "Arial", fontSize: 12 }, options === null || options === void 0 ? void 0 : options.style) })) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Text;
        /**
         * This default false for maximum performance.  It will be true if you set the textPosition to something other than Above, Right.
         * You can force it true if you want to make use of the text sizes in onAfterGenerate
         */
        _this.calculateTextBounds = false;
        _this.horizontalTextPositionProperty = TextPosition_1.EHorizontalTextPosition.Right;
        _this.verticalTextPositionProperty = TextPosition_1.EVerticalTextPosition.Above;
        _this.isEnabledProperty = true;
        _this.calculateTextBounds = (_a = options === null || options === void 0 ? void 0 : options.calculateTextBounds) !== null && _a !== void 0 ? _a : _this.calculateTextBounds;
        _this.horizontalTextPositionProperty = (_b = options === null || options === void 0 ? void 0 : options.horizontalTextPosition) !== null && _b !== void 0 ? _b : _this.horizontalTextPosition;
        _this.verticalTextPositionProperty = (_c = options === null || options === void 0 ? void 0 : options.verticalTextPosition) !== null && _c !== void 0 ? _c : _this.verticalTextPosition;
        _this.isEnabledProperty = (_d = options === null || options === void 0 ? void 0 : options.isEnabled) !== null && _d !== void 0 ? _d : _this.isEnabledProperty;
        return _this;
    }
    Object.defineProperty(TextDataLabelProvider.prototype, "horizontalTextPosition", {
        /**
         * Gets or sets the horizontal text position for the label
         * For more control, override getPosition
         */
        get: function () {
            return this.horizontalTextPositionProperty;
        },
        set: function (value) {
            this.horizontalTextPositionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDataLabelProvider.prototype, "verticalTextPosition", {
        /**
         * Gets or sets the vertical text position for the label
         * For more control, override getPosition
         */
        get: function () {
            return this.verticalTextPositionProperty;
        },
        set: function (value) {
            this.verticalTextPositionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDataLabelProvider.prototype, "isEnabled", {
        /** Flag to enable/disable dataLabel generation.  Default true */
        get: function () {
            return this.isEnabledProperty;
        },
        /** Flag to enable/disable dataLabel generation.  Default true */
        set: function (value) {
            if (this.isEnabledProperty !== value) {
                this.isEnabledProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    TextDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var x = state.xCoord();
        if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Center) {
            x -= textBounds.m_fWidth / 2;
        }
        else if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Left) {
            x -= textBounds.m_fWidth + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.right) !== null && _b !== void 0 ? _b : 0);
        }
        else {
            x += (_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.right) !== null && _d !== void 0 ? _d : 0;
        }
        var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
        var y = state.yCoord() - yOffset;
        if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
            y += textBounds.m_fHeight / 2;
        }
        else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
            y += textBounds.m_fHeight + ((_f = (_e = this.style.padding) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : 0);
        }
        else {
            y -= (_h = (_g = this.style.padding) === null || _g === void 0 ? void 0 : _g.bottom) !== null && _h !== void 0 ? _h : 0;
        }
        return new Point_1.Point(x, y);
    };
    TextDataLabelProvider.prototype.getColor = function (state, text) {
        return state.color;
    };
    TextDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var _a, _b, _c, _d, _e;
        // clear any previous labels
        this.dataLabels = [];
        if (!this.isEnabled || !this.style || !this.style.fontFamily || !this.style.fontSize) {
            return;
        }
        var textSeries = this.parentSeries.dataSeries;
        if (!textSeries || !textSeries.textValues) {
            console.warn("TextDataLabelProvider requires an XyTextDataSeries");
            return;
        }
        var state = new DataLabelState_1.DataLabelState(renderContext, renderPassData, this.style, this.color, renderPassData.pointSeries.yValues, this.parentSeries);
        var bounds = (0, NativeObject_1.getTextBounds)(this.webAssemblyContext);
        var _f = this.parentSeries.dataSeries, fifoCapacity = _f.fifoCapacity, fifoSweeping = _f.fifoSweeping, fifoSweepingGap = _f.fifoSweepingGap, fifoStartIndex = _f.fifoStartIndex;
        var indexes = renderPassData.pointSeries.indexes;
        var calcBounds = this.verticalTextPosition !== TextPosition_1.EVerticalTextPosition.Above ||
            this.horizontalTextPosition !== TextPosition_1.EHorizontalTextPosition.Right ||
            this.calculateTextBounds;
        if (textSeries) {
            state.font.CalculateStringBounds((_a = textSeries.getTextValue(0)) !== null && _a !== void 0 ? _a : "", bounds, (_c = (_b = this.style) === null || _b === void 0 ? void 0 : _b.lineSpacing) !== null && _c !== void 0 ? _c : 2);
            for (var i = 0; i < indexes.size(); i++) {
                state.index = i;
                var index = indexes.get(state.index);
                if (fifoSweeping &&
                    state.pointCount === fifoCapacity &&
                    state.index >= fifoStartIndex &&
                    state.index < fifoStartIndex + fifoSweepingGap)
                    continue;
                var text = textSeries.getTextValue(index);
                if (calcBounds) {
                    state.font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", bounds, (_e = (_d = this.style) === null || _d === void 0 ? void 0 : _d.lineSpacing) !== null && _e !== void 0 ? _e : 2);
                }
                var position = this.getPosition(state, bounds);
                var firstLineHeight = bounds.GetLineBounds(0).m_fHeight;
                var label = {
                    text: text,
                    position: position,
                    rect: new Rect_1.Rect(position.x, position.y - firstLineHeight, bounds.m_fWidth, bounds.m_fHeight),
                    color: this.getColor(state, text),
                    dataX: state.xCoord(),
                    dataY: state.yCoord()
                };
                this.dataLabels.push(label);
            }
        }
        this.onAfterGenerate(this.dataLabels);
    };
    /** Called after labels are generated but before they are drawn. */
    TextDataLabelProvider.prototype.onAfterGenerate = function (dataLabels) { };
    TextDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            calculateTextBounds: this.calculateTextBounds,
            horizontalTextPosition: this.horizontalTextPosition,
            verticalTextPosition: this.verticalTextPosition,
            isEnabled: this.isEnabled
        };
        Object.assign(json.options, options);
        return json;
    };
    return TextDataLabelProvider;
}(BaseDataLabelProvider_1.BaseDataLabelProvider));
exports.TextDataLabelProvider = TextDataLabelProvider;
