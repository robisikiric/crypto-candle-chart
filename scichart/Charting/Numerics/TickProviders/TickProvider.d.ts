import { NumberRange } from "../../../Core/NumberRange";
import { AxisCore } from "../../Visuals/Axis/AxisCore";
/**
 * @summary The TickProvider is a base class for calculating ticks (interval between major and minor gridlines, ticks and labels).
 * @description TickProviders are responsible for calculating the interval between major and minor gridlines, ticks and labels.
 *
 * The method {@getMajorTicks} returns an array of major ticks (data-values values where SciChart will place labels and major gridlines).
 * The method {@getMinorTicks} returns an array of minor ticks (data-values values where SciChart will place minor gridlines).
 * The method {@attachedToAxis} is called when the TickProvider is attached to an {@link AxisCore | Axis}.
 *
 * Override these methods to create custom implementations of Tick intervals in SciChart or use our built-in {@link NumericTickProvider}
 * @remarks
 * TickProviders are shared between 2D & 3D Charts.
 * See also {@link NumericTickProvider} for a concrete implementation.
 */
export declare abstract class TickProvider {
    /**
     * Gets the parent {@link AxisCore | Axis} this TickProvider is attached to
     */
    parentAxis: AxisCore;
    /**
     * Called when the TickProvider is attached to an {@link AxisCore | Axis}
     * @param axis
     */
    attachedToAxis(axis: AxisCore): void;
    /**
     * Called when the TickProvider is attached from an {@link AxisCore | Axis}
     * @param axis
     */
    detachedFromAxis(): void;
    /**
     * @summary Gets an array of major ticks (data-values values where SciChart will place labels and major gridlines).
     * @description Major ticks are data-values where we will place the major gridlines and labels. For example. if the {@link AxisCore | Axis}
     * has a {@link AxisCore.visibleRange | visibleRange} of 100..200 and we want to place gridlines at 100,120,140,160,180,200, then the
     * getMajorTicks() method should return an array with ```[100,120,140,160,180,200]```.
     * @param minorDelta The current {@link AxisCore.minorDelta} which is the difference between minor gridlines requested by the
     * {@link AxisCore | Axis}
     * @param majorDelta The current {@link AxisCore.majorDelta} which is the difference between major gridlines requested by the {
     * @link AxisCore | Axis}
     * @param visibleRange The current {@link AxisCore.visibleRange} which is the minimum / maximum range visible on the Axis.
     * @returns The array of major ticks, e.g. if we want to place gridlines at 100,120,140,160,180,200, then the
     * getMajorTicks() method should return an array with ```[100,120,140,160,180,200]```.
     */
    abstract getMajorTicks(minorDelta: number, majorDelta: number, visibleRange: NumberRange): number[];
    /**
     * @summary Gets an array of minor ticks (data-values values where SciChart will place minor gridlines).
     * @description Minor ticks are data-values where we will place the minor gridlines. For example. if the {@link AxisCore | Axis}
     * has a {@link AxisCore.visibleRange | visibleRange} of 100..200 and we want to place minor gridlines every 5, then the
     * getMinorTicks() method should return an array with ```[105, 110, 115]``` etc...
     * @remarks getMinorTicks should not include locations where major ticks lie.
     * @param minorDelta The current {@link AxisCore.minorDelta} which is the difference between minor gridlines requested by the
     * {@link AxisCore | Axis}
     * @param majorDelta The current {@link AxisCore.majorDelta} which is the difference between major gridlines requested by the {
     * @link AxisCore | Axis}
     * @param visibleRange The current {@link AxisCore.majorDelta} which is the minimum / maximum range visible on the Axis.
     * @returns The array of minor ticks, e.g. if we want to place minor gridlines every 5, then the
     * getMinorTicks() method should return an array with ```[105, 110, 115]``` etc...
     */
    abstract getMinorTicks(minorDelta: number, majorDelta: number, visibleRange: NumberRange): number[];
}
