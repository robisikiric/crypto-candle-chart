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
exports.StackedColumnSeriesDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var TextPosition_1 = require("../../../../types/TextPosition");
var ColumnSeriesDataLabelProvider_1 = require("./ColumnSeriesDataLabelProvider");
var DataLabelProvider_1 = require("./DataLabelProvider");
var StackedColumnSeriesDataLabelProvider = /** @class */ (function (_super) {
    __extends(StackedColumnSeriesDataLabelProvider, _super);
    function StackedColumnSeriesDataLabelProvider(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, __assign({ horizontalTextPosition: TextPosition_1.EHorizontalTextPosition.Center, verticalTextPosition: TextPosition_1.EVerticalTextPosition.Center }, options)) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Column;
        _this.positionModeProperty = ColumnSeriesDataLabelProvider_1.EColumnDataLabelPosition.Outside;
        _this.positionModeProperty = (_a = options === null || options === void 0 ? void 0 : options.positionMode) !== null && _a !== void 0 ? _a : _this.positionMode;
        return _this;
    }
    Object.defineProperty(StackedColumnSeriesDataLabelProvider.prototype, "positionMode", {
        /**
         * Sets whether text should be positioned outside or inside the end of the column using {@link EColumnDataLabelPosition}.
         * If Position then the {@link verticalTextPosition} property is used, or {@link horizontalTextPosition} if it is a vertical chart.
         * Default Outside
         */
        get: function () {
            return this.positionModeProperty;
        },
        /**
         * Sets whether text should be positioned outside or inside the end of the column using {@link EColumnDataLabelPosition}.
         * If Position then the {@link verticalTextPosition} property is used, or {@link horizontalTextPosition} if it is a vertical chart.
         * Default Outside
         */
        set: function (value) {
            this.positionModeProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    StackedColumnSeriesDataLabelProvider.prototype.CalculateShift = function (initialVal) {
        var columnWidth = this.columnWidth;
        var columnCount = this.groupSize;
        return (initialVal -
            (columnWidth * columnCount) / 2.0 -
            (this.spacing * (columnCount - 1.0)) / 2.0 +
            this.groupIndex * (this.spacing + columnWidth) +
            0.5 * columnWidth);
    };
    StackedColumnSeriesDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var parent = this.parentSeries;
        this.yAdj = Math.ceil(parent.strokeThickness / 2);
        if (parent.pointMarker) {
            this.yAdj = Math.max(this.yAdj, Math.ceil(parent.pointMarker.height / 2));
        }
        _super.prototype.generateDataLabels.call(this, renderContext, renderPassData);
    };
    StackedColumnSeriesDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        // when isXFlipped is true, the index is reversed in the state so we need to reverse it back
        var pointIndex = state.isXFlipped ? state.index : state.indexEnd - (state.index - state.indexStart);
        var accumulatedValue = this.topVector.get(pointIndex);
        var x = state.xCoord();
        var y = state.yCoord();
        var yCalculator = state.renderPassData.yCoordinateCalculator;
        if (state.isVerticalChart) {
            y = this.CalculateShift(y);
            x = yCalculator.getCoordinate(accumulatedValue);
        }
        else {
            x = this.CalculateShift(x);
            y = yCalculator.getCoordinate(accumulatedValue);
        }
        // to handle multi-line text
        var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
        y = y - yOffset;
        var flipX = state.isXFlipped ? -1 : 1;
        var flipY = state.isYFlipped ? -1 : 1;
        // TODO: handle isOneHundredPercent (middle placement of dataLabels - not urgent).
        if (state.isVerticalChart) {
            // Vertical Text positioning
            if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
                y += textBounds.m_fHeight / 2;
            }
            else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
                y += textBounds.m_fHeight + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.top) !== null && _b !== void 0 ? _b : 1);
            }
            else {
                // Above
                y -= (_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.bottom) !== null && _d !== void 0 ? _d : 0;
            }
            // Positioning Mode
            if (this.positionMode === ColumnSeriesDataLabelProvider_1.EColumnDataLabelPosition.Outside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    // positive - draw right
                    x += this.yAdj;
                    if (!state.isXFlipped) {
                        x -= textBounds.m_fWidth + ((_f = (_e = state.style.padding) === null || _e === void 0 ? void 0 : _e.right) !== null && _f !== void 0 ? _f : 1);
                    }
                    else {
                        x += (_h = (_g = state.style.padding) === null || _g === void 0 ? void 0 : _g.left) !== null && _h !== void 0 ? _h : 1;
                    }
                }
                else {
                    // negative - draw left
                    x -= this.yAdj - ((_k = (_j = state.style.padding) === null || _j === void 0 ? void 0 : _j.right) !== null && _k !== void 0 ? _k : 1);
                    if (state.isXFlipped || state.isYFlipped) {
                        x -= textBounds.m_fWidth + ((_m = (_l = state.style.padding) === null || _l === void 0 ? void 0 : _l.left) !== null && _m !== void 0 ? _m : 1);
                    }
                }
                return new Point_1.Point(x, y);
            }
            else if (this.positionMode === ColumnSeriesDataLabelProvider_1.EColumnDataLabelPosition.Inside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    // positive - draw left
                    x -= this.yAdj + ((_p = (_o = state.style.padding) === null || _o === void 0 ? void 0 : _o.right) !== null && _p !== void 0 ? _p : 1);
                    if (state.isXFlipped || state.isYFlipped) {
                        x -= textBounds.m_fWidth + ((_r = (_q = state.style.padding) === null || _q === void 0 ? void 0 : _q.left) !== null && _r !== void 0 ? _r : 1);
                    }
                }
                else {
                    // negative - draw right
                    x += this.yAdj + ((_t = (_s = state.style.padding) === null || _s === void 0 ? void 0 : _s.left) !== null && _t !== void 0 ? _t : 1);
                    if (!state.isXFlipped) {
                        x -= textBounds.m_fWidth + ((_v = (_u = state.style.padding) === null || _u === void 0 ? void 0 : _u.right) !== null && _v !== void 0 ? _v : 1);
                    }
                }
                return new Point_1.Point(x, y);
            }
            else {
                return _super.prototype.getPosition.call(this, state, textBounds);
            }
        }
        else {
            if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Center) {
                x -= textBounds.m_fWidth / 2;
            }
            else if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Left) {
                x -= textBounds.m_fWidth + ((_x = (_w = this.style.padding) === null || _w === void 0 ? void 0 : _w.right) !== null && _x !== void 0 ? _x : 0) + textBounds.m_fWidth;
            }
            else {
                x += (_z = (_y = this.style.padding) === null || _y === void 0 ? void 0 : _y.left) !== null && _z !== void 0 ? _z : 0 + textBounds.m_fWidth;
            }
            if (this.positionMode === ColumnSeriesDataLabelProvider_1.EColumnDataLabelPosition.Outside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    // positive - draw above
                    y -= this.yAdj + ((_1 = (_0 = state.style.padding) === null || _0 === void 0 ? void 0 : _0.bottom) !== null && _1 !== void 0 ? _1 : 1);
                }
                else {
                    // negative - draw below
                    y += textBounds.m_fHeight + this.yAdj + ((_3 = (_2 = state.style.padding) === null || _2 === void 0 ? void 0 : _2.top) !== null && _3 !== void 0 ? _3 : 1);
                }
                return new Point_1.Point(x, y);
            }
            else if (this.positionMode === ColumnSeriesDataLabelProvider_1.EColumnDataLabelPosition.Inside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    y += textBounds.m_fHeight + this.yAdj + ((_5 = (_4 = state.style.padding) === null || _4 === void 0 ? void 0 : _4.top) !== null && _5 !== void 0 ? _5 : 1);
                    // positive - draw below
                }
                else {
                    // negative - draw above
                    y -= this.yAdj + ((_7 = (_6 = state.style.padding) === null || _6 === void 0 ? void 0 : _6.bottom) !== null && _7 !== void 0 ? _7 : 1);
                }
                return new Point_1.Point(x, y);
            }
            else {
                return _super.prototype.getPosition.call(this, state, textBounds);
            }
        }
    };
    StackedColumnSeriesDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            positionMode: this.positionMode
        };
        Object.assign(json.options, options);
        return json;
    };
    return StackedColumnSeriesDataLabelProvider;
}(DataLabelProvider_1.DataLabelProvider));
exports.StackedColumnSeriesDataLabelProvider = StackedColumnSeriesDataLabelProvider;
