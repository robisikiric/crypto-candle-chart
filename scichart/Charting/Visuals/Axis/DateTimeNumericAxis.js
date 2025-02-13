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
exports.DateTimeNumericAxis = void 0;
var DateTimeDeltaCalculator_1 = require("./DeltaCalculator/DateTimeDeltaCalculator");
var SmartDateLabelProvider_1 = require("./LabelProvider/SmartDateLabelProvider");
var NumericAxis_1 = require("./NumericAxis");
var DateTimeNumericAxis = /** @class */ (function (_super) {
    __extends(DateTimeNumericAxis, _super);
    function DateTimeNumericAxis(webAssemblyContext, options) {
        var _this = this;
        if (!(options === null || options === void 0 ? void 0 : options.labelProvider)) {
            options = options !== null && options !== void 0 ? options : {};
            options.labelProvider = new SmartDateLabelProvider_1.SmartDateLabelProvider(options);
        }
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.deltaCalculator = new DateTimeDeltaCalculator_1.DateTimeDeltaCalculator(webAssemblyContext, {
            possibleDeltas: options === null || options === void 0 ? void 0 : options.possibleDeltas,
            minTicks: options === null || options === void 0 ? void 0 : options.minTicks
        });
        return _this;
    }
    return DateTimeNumericAxis;
}(NumericAxis_1.NumericAxis));
exports.DateTimeNumericAxis = DateTimeNumericAxis;
