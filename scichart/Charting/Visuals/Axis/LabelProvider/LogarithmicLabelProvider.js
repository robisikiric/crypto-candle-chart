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
exports.LogarithmicLabelProvider = void 0;
var NumericFormat_1 = require("../../../../types/NumericFormat");
var number_1 = require("../../../../utils/number");
var NumericLabelProvider_1 = require("./NumericLabelProvider");
/**
 * The {@link LogarithmicLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link LogarithmicAxis} types
 */
var LogarithmicLabelProvider = /** @class */ (function (_super) {
    __extends(LogarithmicLabelProvider, _super);
    /**
     * Creates an instance of {@link LogarithmicLabelProvider}
     * @param options Optional parameters of type {@link ILabelOptions} used to configure the axis at instantiation time
     */
    function LogarithmicLabelProvider(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, __assign({ labelFormat: (_a = options === null || options === void 0 ? void 0 : options.labelFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Scientific, labelPrecision: (_b = options === null || options === void 0 ? void 0 : options.labelPrecision) !== null && _b !== void 0 ? _b : 1 }, options)) || this;
        _this.formatLabelProperty = function (dataValue) {
            return _this.numericFormat === NumericFormat_1.ENumericFormat.Scientific
                ? _this.applyFormat((0, number_1.toScientific)(dataValue, _this.precision, _this.logarithmicBase))
                : _this.applyFormat((0, number_1.formatNumber)(dataValue, _this.numericFormat, _this.precision, _this.engineeringPrefix));
        };
        return _this;
    }
    return LogarithmicLabelProvider;
}(NumericLabelProvider_1.NumericLabelProvider));
exports.LogarithmicLabelProvider = LogarithmicLabelProvider;
