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
exports.LogarithmicDeltaCalculator = void 0;
var Guard_1 = require("../../../../Core/Guard");
var NumberRange_1 = require("../../../../Core/NumberRange");
var DeltaCalculator_1 = require("./DeltaCalculator");
/**
 * The LogarithmicDeltaCalculator is responsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link LogarithmicAxis} types.
 */
var LogarithmicDeltaCalculator = /** @class */ (function (_super) {
    __extends(LogarithmicDeltaCalculator, _super);
    /**
     * Creates an instance of the {@link LogarithmicDeltaCalculator}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    function LogarithmicDeltaCalculator(webAssemblyContext) {
        var _this = _super.call(this) || this;
        /**
         * Gets or sets the logarithmic base. Defaults to 10
         */
        _this.logarithmicBase = 10;
        _this.isHighPrecisionTicks = true;
        _this.webAssemblyContext = webAssemblyContext;
        return _this;
    }
    /**
     * @inheritDoc
     */
    LogarithmicDeltaCalculator.prototype.getDeltaFromRange = function (min, max, minorsPerMajor, maxTicks) {
        Guard_1.Guard.argumentIsRealNumber(min, "min");
        Guard_1.Guard.argumentIsRealNumber(max, "max");
        // Handle the case of negative log axis
        min = Math.abs(min);
        max = Math.abs(max);
        if (min > max) {
            // Swap if min > max
            var temp = min;
            min = max;
            max = temp;
        }
        if (this.isHighPrecisionTicks) {
            var delta = this.webAssemblyContext.NiceLogScale.CalculateTickSpacing(min, max, this.logarithmicBase, minorsPerMajor, maxTicks);
            var tsDelta = new NumberRange_1.NumberRange(delta.minD, delta.maxD);
            delta.delete();
            return tsDelta;
        }
        else {
            var delta = this.webAssemblyContext.NiceLogScale.CalculateLowPrecisionTickSpacing(min, max, this.logarithmicBase, minorsPerMajor, maxTicks);
            var tsDelta = new NumberRange_1.NumberRange(delta.minD, delta.maxD);
            delta.delete();
            return tsDelta;
        }
    };
    return LogarithmicDeltaCalculator;
}(DeltaCalculator_1.DeltaCalculator));
exports.LogarithmicDeltaCalculator = LogarithmicDeltaCalculator;
