import { TEasingFn } from "../../../Core/Animations/EasingFunctions";
import { Dictionary } from "../../../Core/Dictionary";
import { NumberRange } from "../../../Core/NumberRange";
import { EAxisType } from "../../../types/AxisType";
import { TSciChart } from "../../../types/TSciChart";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { ELogarithmicMajorTickMode, ELogarithmicMinorTickMode } from "../../Numerics/TickProviders/LogarithmicTickProvider";
import { TickProvider } from "../../Numerics/TickProviders/TickProvider";
import { AxisBase2D } from "./AxisBase2D";
import { DeltaCalculator } from "./DeltaCalculator/DeltaCalculator";
import { LabelProviderBase2D } from "./LabelProvider/LabelProviderBase2D";
import { INumericAxisOptions } from "./NumericAxis";
export declare const MIN_LOG_AXIS_VALUE = 1e-10;
export interface ILogarithmicAxisOptions extends INumericAxisOptions {
    /**
     * The Logarithmic Base for the axis. Defaults to 10
     */
    logBase?: number;
    /**
     * False if this axis only shows positive values, true if it only shows negative.  A log axis cannot show both
     */
    isNegative?: boolean;
    /**
     * The mode for Major ticks using {@link ELogarithmicMajorTickMode}
     * Equally spaced (default, best for large ranges) or
     * Round numbers (better for small ranges)
     */
    majorTickMode?: ELogarithmicMajorTickMode;
    /**
     * The mode for minor ticks using {@link ELogarithmicMinorTickMode},
     * Linear (default, best for smaller ranges),
     * Logarithmic (better for very large ranges) or
     * Auto (switches from linear to Logarithmic when the visible range is such that
     *  the first linear minor tick would be more than 70% of the major tick)
     */
    minorTickMode?: ELogarithmicMinorTickMode;
    /** If false, only ticks that are whole number multiples of the log base will be used */
    isHighPrecisionTicks?: boolean;
}
/**
 * Creates an instance of a {@link LogarithmicAxis}
 * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param options Optional parameters of type {@link ILogarithmicAxisOptions} used to configure the axis at instantiation time
 */
export declare class LogarithmicAxis extends AxisBase2D {
    readonly type = EAxisType.LogarithmicAxis;
    private logBaseProperty;
    private isNegativeProperty;
    private isHighPrecisionTicksProperty;
    constructor(wasmContext: TSciChart, options?: ILogarithmicAxisOptions);
    /**
     * Gets or sets the Logarithmic Base for the axis. Defaults to 10
     */
    get logBase(): number;
    /**
     * Gets or sets the Logarithmic Base for the axis. Defaults to 10
     */
    set logBase(logBase: number);
    get isNegative(): boolean;
    set isNegative(isNegative: boolean);
    get isHighPrecisionTicks(): boolean;
    set isHighPrecisionTicks(isHighPrecisionTicks: boolean);
    getDefaultNonZeroRange(): NumberRange;
    hasValidVisibleRange(): boolean;
    get tickProvider(): TickProvider;
    set tickProvider(tickProvider: TickProvider);
    get deltaCalculator(): DeltaCalculator;
    set deltaCalculator(deltaCalculator: DeltaCalculator);
    get labelProvider(): LabelProviderBase2D;
    set labelProvider(labelProvider: LabelProviderBase2D);
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
    getWindowedYRange(xRanges: Dictionary<NumberRange>): NumberRange;
    /**
     * @inheritdoc
     */
    animateVisibleRange(visibleRange: NumberRange, durationMs: number, easingFunction?: TEasingFn, onCompleted?: () => void): import("../../..").IGenericAnimation;
    scale(initialRange: NumberRange, delta: number, isMoreThanHalf: boolean): void;
    toJSON(): import("../../..").TAxisDefinition;
    protected getCurrentCoordinateCalculatorInternal(): CoordinateCalculatorBase;
    protected getMaxXRange(): NumberRange;
    private get logTickProvider();
    private updateProviders;
}
