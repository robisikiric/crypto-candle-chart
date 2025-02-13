"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaCalculator = void 0;
/**
 * @summary A base class for Delta Calculators within SciChart's 2D & 3D Charts.
 * @description The {@link DeltaCalculator} is responsible for calculating the min and max deltas on an axis.
 *
 * A delta is the spacing between two gridlines, so the Major Delta is the spacing between major grid lines and
 * the Minor Delta is the spacing between minor gridlines.
 *
 * This calculator class computes these and they are later stored on {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} properties.
 */
var DeltaCalculator = /** @class */ (function () {
    function DeltaCalculator() {
    }
    /**
     * Called when the {@link DeltaCalculator} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    DeltaCalculator.prototype.attachedToAxis = function (axis) {
        this.parentAxis = axis;
    };
    /**
     * Called when the {@link DeltaCalculator} is detached from {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    DeltaCalculator.prototype.detachedFromAxis = function () {
        this.parentAxis = undefined;
    };
    return DeltaCalculator;
}());
exports.DeltaCalculator = DeltaCalculator;
