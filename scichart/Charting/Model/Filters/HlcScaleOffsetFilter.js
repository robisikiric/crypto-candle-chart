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
exports.HlcScaleOffsetFilter = void 0;
var DataFilterType_1 = require("../../../types/DataFilterType");
var IDataSeries_1 = require("../IDataSeries");
var HlcCustomFilter_1 = require("./HlcCustomFilter");
var HlcScaleOffsetFilter = /** @class */ (function (_super) {
    __extends(HlcScaleOffsetFilter, _super);
    function HlcScaleOffsetFilter(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries, options) || this;
        _this.scaleProperty = 1;
        _this.offsetProperty = 0;
        if (originalSeries.type !== IDataSeries_1.EDataSeriesType.Hlc) {
            throw new Error("HlcScaleOffsetFilter only supports Hlc original series");
        }
        _this.scaleProperty = (_a = options === null || options === void 0 ? void 0 : options.scale) !== null && _a !== void 0 ? _a : _this.scaleProperty;
        _this.offsetProperty = (_b = options === null || options === void 0 ? void 0 : options.offset) !== null && _b !== void 0 ? _b : _this.offsetProperty;
        if (_this.getOriginalCount() > 0) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(HlcScaleOffsetFilter.prototype, "scale", {
        get: function () {
            return this.scaleProperty;
        },
        set: function (value) {
            this.scaleProperty = value;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlcScaleOffsetFilter.prototype, "offset", {
        get: function () {
            return this.offsetProperty;
        },
        set: function (value) {
            this.offsetProperty = value;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    // @ts-ignore
    HlcScaleOffsetFilter.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var original = this.originalSeries.toJSON(excludeData);
        return __assign(__assign({}, original), { filter: {
                type: DataFilterType_1.EDataFilterType.HlcScaleOffset,
                options: { scale: this.scale, offset: this.offset }
            } });
    };
    HlcScaleOffsetFilter.prototype.defaultFunction = function (index, y) {
        return y * this.scaleProperty + this.offsetProperty;
    };
    return HlcScaleOffsetFilter;
}(HlcCustomFilter_1.HlcCustomFilter));
exports.HlcScaleOffsetFilter = HlcScaleOffsetFilter;
