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
exports.NumericDeltaCalculator = void 0;
var Guard_1 = require("../../../../Core/Guard");
var NumberRange_1 = require("../../../../Core/NumberRange");
var DeltaCalculator_1 = require("./DeltaCalculator");
/**
 * The NumericDeltaCalculator is respinsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link NumericAxis} types.
 */
var NumericDeltaCalculator = /** @class */ (function (_super) {
    __extends(NumericDeltaCalculator, _super);
    /**
     * Creates an instance of the {@link NumericDeltaCalculator}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    function NumericDeltaCalculator(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        return _this;
    }
    /**
     * @inheritDoc
     */
    NumericDeltaCalculator.prototype.getDeltaFromRange = function (min, max, minorsPerMajor, maxTicks) {
        Guard_1.Guard.argumentIsRealNumber(min, "min");
        Guard_1.Guard.argumentIsRealNumber(max, "max");
        var delta = this.webAssemblyContext.NiceDoubleScale.CalculateTickSpacing(min, max, minorsPerMajor, maxTicks);
        var tsDelta = new NumberRange_1.NumberRange(delta.minD, delta.maxD);
        delta.delete();
        return tsDelta;
    };
    return NumericDeltaCalculator;
}(DeltaCalculator_1.DeltaCalculator));
exports.NumericDeltaCalculator = NumericDeltaCalculator;
