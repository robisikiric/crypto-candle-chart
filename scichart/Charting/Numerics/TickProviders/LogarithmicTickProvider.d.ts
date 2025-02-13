import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { TickProvider } from "./TickProvider";
export declare enum ELogarithmicMinorTickMode {
    Linear = "Linear",
    Logarithmic = "Logarithmic",
    Auto = "Auto"
}
export declare enum ELogarithmicMajorTickMode {
    EqualSpacing = "EqualSpacing",
    RoundNumbers = "RoundNumbers"
}
/**
 * @summary The LogarithmicTickProvider is a {@link TickProvider} implementation for Logarithmic 2D or 3D Axis.
 * @description TickProviders are responsible for calculating the interval between major and minor gridlines, ticks and labels.
 *
 *  * The method {@link getMajorTicks} returns an array of major ticks (data-values values where SciChart will place labels and major gridlines.
 *  * The method {@link getMinorTicks} returns an array of minor ticks (data-values values where SciChart will place minor gridlines.
 *  * The method {@link calculateTicks} performs the actual calculation
 *
 * Override these methods to create custom implementations of Tick intervals in SciChart
 * @remarks
 * See also {@link TickProvider} for the base implementation.
 */
export declare class LogarithmicTickProvider extends TickProvider {
    logarithmicBase: number;
    isHighPrecisionTicks: boolean;
    private wasmContext;
    private majorTickModeProperty;
    private minorTickModeProperty;
    constructor(wasmContext: TSciChart | TSciChart3D);
    /**
     * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
     * Equally spaced (best for large ranges) or
     * Round numbers (better for small ranges)
     */
    get majorTickMode(): ELogarithmicMajorTickMode;
    /**
     * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
     * Equally spaced (best for large ranges) or
     * Round numbers (better for small ranges)
     */
    set majorTickMode(mode: ELogarithmicMajorTickMode);
    /**
     * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
     * Linear (default, best for smaller ranges),
     * Logarithmic (better for very large ranges) or
     * Auto (switches from linear to Logarithmic when the visible range is such that
     *  the first linear minor tick would be more than 70% of the major tick)
     */
    get minorTickMode(): ELogarithmicMinorTickMode;
    /**
     * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
     * Linear (default, best for smaller ranges),
     * Logarithmic (better for very large ranges) or
     * Auto (switches from linear to Logarithmic when the visible range is such that
     *  the first linear minor tick would be more than 70% of the major tick)
     */
    set minorTickMode(mode: ELogarithmicMinorTickMode);
    getMajorTicks(minorDelta: number, majorDelta: number, visibleRange: NumberRange): number[];
    getRoundNumberMajorTicks(minorDelta: number, majorDelta: number, visibleRange: NumberRange): number[];
    roundNum(value: number, difference?: number): number;
    getMinorTicks(minorDelta: number, majorDelta: number, visibleRange: NumberRange): number[];
    /**
     * @summary Performs sanity checks to see if parameters are valid.
     * @description If this method returns false, then we should not process or compute major/minor gridlines, but instead should
     * return empty array ```[]``` in {@link getMajorTicks} / {@link getMinorTicks}
     * @param visibleRange The current {@link AxisCore.visibleRange} which is the minimum / maximum range visible on the Axis.
     * @param deltaRange The current {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} which is the difference between minor
     * and major gridlines requested by the {@link AxisCore | Axis}
     */
    protected isParamsValid(visibleRange: NumberRange, deltaRange: NumberRange): boolean;
}
