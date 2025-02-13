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
exports.CategoryDeltaCalculator = void 0;
var Guard_1 = require("../../../../Core/Guard");
var NumberRange_1 = require("../../../../Core/NumberRange");
var NumericDeltaCalculator_1 = require("./NumericDeltaCalculator");
/**
 * The CategoryDeltaCalculator is responsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link CategoryAxis} types.
 */
var CategoryDeltaCalculator = /** @class */ (function (_super) {
    __extends(CategoryDeltaCalculator, _super);
    /**
     * Creates an instance of the {@link CategoryDeltaCalculator}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    function CategoryDeltaCalculator(webAssemblyContext) {
        return _super.call(this, webAssemblyContext) || this;
    }
    /**
     * @inheritDoc
     */
    CategoryDeltaCalculator.prototype.getDeltaFromRange = function (min, max, minorsPerMajor, maxTicks) {
        Guard_1.Guard.argumentIsRealNumber(min, "min");
        Guard_1.Guard.argumentIsRealNumber(max, "max");
        // Force category axis to show all ticks if there is very little data
        if (max <= maxTicks) {
            return new NumberRange_1.NumberRange(1 / minorsPerMajor, 1);
        }
        return _super.prototype.getDeltaFromRange.call(this, min, max, minorsPerMajor, maxTicks);
    };
    return CategoryDeltaCalculator;
}(NumericDeltaCalculator_1.NumericDeltaCalculator));
exports.CategoryDeltaCalculator = CategoryDeltaCalculator;
