import { NumberRange } from "../../../../Core/NumberRange";
import { AxisCore } from "../AxisCore";
/**
 * @summary A base class for Delta Calculators within SciChart's 2D & 3D Charts.
 * @description The {@link DeltaCalculator} is responsible for calculating the min and max deltas on an axis.
 *
 * A delta is the spacing between two gridlines, so the Major Delta is the spacing between major grid lines and
 * the Minor Delta is the spacing between minor gridlines.
 *
 * This calculator class computes these and they are later stored on {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} properties.
 */
export declare abstract class DeltaCalculator {
    /**
     * The parent {@link AxisCore}. This will be set once {@link attachedToAxis} is called
     */
    parentAxis: AxisCore;
    /**
     * Called when the {@link DeltaCalculator} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    attachedToAxis(axis: AxisCore): void;
    /**
     * Called when the {@link DeltaCalculator} is detached from {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    detachedFromAxis(): void;
    /**
     * Gets a Delta from a visiblerange and with the provided properties
     * @param min the {@link AxisCore.visibleRange} minimum
     * @param max the {@link AxisCore.visibleRange} maximum
     * @param minorsPerMajor A hint of how many minor gridlines you want per major gridline
     * @param maxTicks A hint of the maximum number of major gridlines you want on the axis (result will vary depending on zoom level)
     */
    abstract getDeltaFromRange(min: number, max: number, minorsPerMajor: number, maxTicks: number): NumberRange;
}
