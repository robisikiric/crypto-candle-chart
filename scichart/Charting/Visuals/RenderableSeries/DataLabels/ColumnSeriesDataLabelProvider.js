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
exports.ColumnSeriesDataLabelProvider = exports.EColumnDataLabelPosition = void 0;
var Point_1 = require("../../../../Core/Point");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var TextPosition_1 = require("../../../../types/TextPosition");
var DataLabelProvider_1 = require("./DataLabelProvider");
var EColumnDataLabelPosition;
(function (EColumnDataLabelPosition) {
    EColumnDataLabelPosition["Outside"] = "Outside";
    EColumnDataLabelPosition["Inside"] = "Inside";
    EColumnDataLabelPosition["Position"] = "Position";
})(EColumnDataLabelPosition = exports.EColumnDataLabelPosition || (exports.EColumnDataLabelPosition = {}));
var ColumnSeriesDataLabelProvider = /** @class */ (function (_super) {
    __extends(ColumnSeriesDataLabelProvider, _super);
    function ColumnSeriesDataLabelProvider(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, __assign({ horizontalTextPosition: TextPosition_1.EHorizontalTextPosition.Center, verticalTextPosition: TextPosition_1.EVerticalTextPosition.Center }, options)) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Column;
        _this.positionModeProperty = EColumnDataLabelPosition.Outside;
        _this.positionModeProperty = (_a = options === null || options === void 0 ? void 0 : options.positionMode) !== null && _a !== void 0 ? _a : _this.positionMode;
        return _this;
    }
    Object.defineProperty(ColumnSeriesDataLabelProvider.prototype, "positionMode", {
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
    ColumnSeriesDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var parent = this.parentSeries;
        this.yAdj = Math.ceil(parent.strokeThickness / 2);
        if (parent.pointMarker) {
            this.yAdj = Math.max(this.yAdj, Math.ceil(parent.pointMarker.height / 2));
        }
        _super.prototype.generateDataLabels.call(this, renderContext, renderPassData);
    };
    ColumnSeriesDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        var x = state.xCoord();
        var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
        // Handle multiline
        var y = state.yCoord() - yOffset;
        var flipX = state.isXFlipped ? -1 : 1;
        var flipY = state.isYFlipped ? -1 : 1;
        if (state.isVerticalChart) {
            if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
                y += textBounds.m_fHeight / 2;
            }
            else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
                y += textBounds.m_fHeight + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.top) !== null && _b !== void 0 ? _b : 0);
            }
            else {
                y -= (_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.bottom) !== null && _d !== void 0 ? _d : 0;
            }
            if (this.positionMode === EColumnDataLabelPosition.Outside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    // positive - draw right
                    x += this.yAdj + ((_f = (_e = state.style.padding) === null || _e === void 0 ? void 0 : _e.left) !== null && _f !== void 0 ? _f : 1);
                }
                else {
                    // negative - draw left
                    x -= textBounds.m_fWidth + this.yAdj + ((_h = (_g = state.style.padding) === null || _g === void 0 ? void 0 : _g.right) !== null && _h !== void 0 ? _h : 1);
                }
                return new Point_1.Point(x, y);
            }
            else if (this.positionMode === EColumnDataLabelPosition.Inside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    x -= textBounds.m_fWidth + this.yAdj + ((_k = (_j = state.style.padding) === null || _j === void 0 ? void 0 : _j.right) !== null && _k !== void 0 ? _k : 1);
                    // positive - draw left
                }
                else {
                    // negative - draw right
                    x += this.yAdj + ((_m = (_l = state.style.padding) === null || _l === void 0 ? void 0 : _l.left) !== null && _m !== void 0 ? _m : 1);
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
                x -= textBounds.m_fWidth + ((_p = (_o = this.style.padding) === null || _o === void 0 ? void 0 : _o.right) !== null && _p !== void 0 ? _p : 0);
            }
            else {
                x += (_r = (_q = this.style.padding) === null || _q === void 0 ? void 0 : _q.left) !== null && _r !== void 0 ? _r : 0;
            }
            if (this.positionMode === EColumnDataLabelPosition.Outside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    // positive - draw above
                    y -= this.yAdj + ((_t = (_s = state.style.padding) === null || _s === void 0 ? void 0 : _s.bottom) !== null && _t !== void 0 ? _t : 1);
                }
                else {
                    // negative - draw below
                    y += textBounds.m_fHeight + this.yAdj + ((_v = (_u = state.style.padding) === null || _u === void 0 ? void 0 : _u.top) !== null && _v !== void 0 ? _v : 1);
                }
                return new Point_1.Point(x, y);
            }
            else if (this.positionMode === EColumnDataLabelPosition.Inside) {
                // Text anchor point is bottom left
                if (state.yVal() * flipY >= 0) {
                    y += textBounds.m_fHeight + this.yAdj + ((_x = (_w = state.style.padding) === null || _w === void 0 ? void 0 : _w.top) !== null && _x !== void 0 ? _x : 1);
                    // positive - draw below
                }
                else {
                    // negative - draw above
                    y -= this.yAdj + ((_z = (_y = state.style.padding) === null || _y === void 0 ? void 0 : _y.bottom) !== null && _z !== void 0 ? _z : 1);
                }
                return new Point_1.Point(x, y);
            }
            else {
                return _super.prototype.getPosition.call(this, state, textBounds);
            }
        }
    };
    ColumnSeriesDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            positionMode: this.positionMode
        };
        Object.assign(json.options, options);
        return json;
    };
    return ColumnSeriesDataLabelProvider;
}(DataLabelProvider_1.DataLabelProvider));
exports.ColumnSeriesDataLabelProvider = ColumnSeriesDataLabelProvider;
