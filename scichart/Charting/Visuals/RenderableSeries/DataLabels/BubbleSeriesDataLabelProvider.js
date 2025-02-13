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
exports.BubbleSeriesDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var TextPosition_1 = require("../../../../types/TextPosition");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var DataLabelProvider_1 = require("./DataLabelProvider");
var BubbleSeriesDataLabelProvider = /** @class */ (function (_super) {
    __extends(BubbleSeriesDataLabelProvider, _super);
    function BubbleSeriesDataLabelProvider(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Bubble;
        _this.horizontalTextPositionProperty = (_a = options === null || options === void 0 ? void 0 : options.horizontalTextPosition) !== null && _a !== void 0 ? _a : TextPosition_1.EHorizontalTextPosition.Center;
        _this.verticalTextPositionProperty = (_b = options === null || options === void 0 ? void 0 : options.verticalTextPosition) !== null && _b !== void 0 ? _b : TextPosition_1.EVerticalTextPosition.Center;
        return _this;
    }
    BubbleSeriesDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var x = state.xCoord();
        var radius = Math.abs(state.parentSeries.getBubbleDiameter(state.index)) / 2;
        if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Center) {
            x -= textBounds.m_fWidth / 2;
        }
        else if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Left) {
            x -= textBounds.m_fWidth + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.right) !== null && _b !== void 0 ? _b : 0) + radius;
        }
        else {
            x += ((_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.right) !== null && _d !== void 0 ? _d : 0) + radius;
        }
        var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
        var y = state.yCoord() - yOffset;
        if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
            y += textBounds.m_fHeight / 2;
        }
        else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
            y += textBounds.m_fHeight + ((_f = (_e = this.style.padding) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : 0) + radius;
        }
        else {
            y -= ((_h = (_g = this.style.padding) === null || _g === void 0 ? void 0 : _g.bottom) !== null && _h !== void 0 ? _h : 0) + radius;
        }
        return new Point_1.Point(x, y);
    };
    return BubbleSeriesDataLabelProvider;
}(DataLabelProvider_1.DataLabelProvider));
exports.BubbleSeriesDataLabelProvider = BubbleSeriesDataLabelProvider;
