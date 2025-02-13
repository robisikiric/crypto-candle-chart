import { TEasingFn } from "../../../Core/Animations/EasingFunctions";
import { IGenericAnimation } from "../../../Core/Animations/GenericAnimation";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { EventHandler } from "../../../Core/EventHandler";
import { IDeletable } from "../../../Core/IDeletable";
import { NumberRange } from "../../../Core/NumberRange";
import { Thickness } from "../../../Core/Thickness";
import { EAutoRange } from "../../../types/AutoRange";
import { EAxisType } from "../../../types/AxisType";
import { ELabelAlignment } from "../../../types/LabelAlignment";
import { EMultiLineAlignment } from "../../../types/TextPosition";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { TickCoordinatesProvider } from "../../Numerics/TickCoordinateProviders/TickCoordinatesProvider";
import { TickProvider } from "../../Numerics/TickProviders/TickProvider";
import { DeltaCalculator } from "./DeltaCalculator/DeltaCalculator";
import { IAxisCoreOptions } from "./IAxisCoreOptions";
import { LabelProvider } from "./LabelProvider/LabelProvider";
import { VisibleRangeChangedArgs } from "./VisibleRangeChangedArgs";
/**
 * A type class to contain information about gridline styles
 * @remarks
 * A grid line is the X Y axis grid inside the chart
 * - Set the color as an HTML Color code to define the color
 * - Set the strokeThickness to change the thickness of the grid line
 * - Set the strokeDashArray to define dash pattern, e.g. [2,2] will have a 2-pixel long dash every 2 pixels
 */
export declare type TGridLineStyle = {
    strokeThickness?: number;
    color?: string;
    strokeDashArray?: number[];
};
/**
 * A type class to contain information about Tick line styles
 * @remarks
 * A tick line is the small 3 pixel line outside the axis.
 * - Set the tickSize to define the size of this tick in pixels.
 * - Set the color as an HTML Color code to define the color
 * - Set the strokeThickness to change the thickness of the tick line
 */
export declare type TTickLineStyle = {
    tickSize?: number;
    color?: string;
    strokeThickness?: number;
};
/**
 * A type class to contain information about Axis Label text styles
 * @remarks
 * - Set the fontFamily as a string to set the font
 * - Set the fontSize as you would in HTML/CSS
 * - Set the fontWeight and fontStyle as you would in HTML/CSS
 * - Set the color as an HTML Color code to define the color
 */
export declare type TTextStyle = {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    color?: string;
    /** Padding is left 4, right 4, top 2, bottom 0 by default.  This is because there is natural space below the text baseline.
     * If you are using text labels rather than just numbers, or when using native text, you may want to increase the bottom padding.
     */
    padding?: Thickness;
    /**
     * Horizontal label alignment for vertical axes. Default Auto.
     * @privateRemarks This property should only be used for axis labels.
     * So the current type definition should be changed in future versions, specifically this property may be renamed or removed.
     * In other cases, e.g. for multiline text alignment use TTextStyle.multilineAlignment
     */
    alignment?: ELabelAlignment;
    /** Horizontal text alignment for multiline text. */
    multilineAlignment?: EMultiLineAlignment;
};
export declare type TAxisTitleStyle = TTextStyle & {
    /** Text rotation in degrees. */
    rotation?: number;
};
/**
 * Interface to minimal set of parameters which define an {@link AxisCore | Axis} in SciChart
 */
export interface IAxisParams {
    /**
     * The VisibleRange is the range of the Axis (min to max).
     * @description
     * For example, if you have data-values from 0 to 100 in your {@link XyDataSeries | DataSeries}, but you only want to show
     * values from 15-25 on the axis, then set the visibleRange as follows:
     * ```ts
     * axis.visibleRange = new NumberRange(15, 25);
     * ```
     * @remarks
     * The visibleRange is a data-value for {@link NumericAxis}, {@link NumericAxis3D} but refers to an **index** to the data
     * for {@link CategoryAxis} types.
     */
    visibleRange: NumberRange;
    /**
     * The MajorDelta is the spacing between major gridlines and axis labels.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.minorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    majorDelta: number;
    /**
     * The MinorDelta is the spacing between minor gridlines.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.majorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    minorDelta: number;
}
/**
 * The base class for Axis within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}.
 * @description
 * AxisCore is a base class for both 2D & 3D Axis types in SciChart. Concrete types include:
 *
 *  - {@link NumericAxis}: a Numeric 2D value-axis
 *  - {@link CategoryAxis}: A category 2D axis used for stock chart applications
 *  - {@link NumericAxis3D}: A numeric 3D value-axis
 *
 *  Set axis on the {@link SciChartSurface.xAxes} or {@link SciChartSurface.yAxes} collections in 2D Charts.
 *  Set axis on the {@link SciChart3DSurface.xAxis}, {@link SciChart3DSurface.yAxis} or {@link SciChart3DSurface.zAxis} collections in 3D Charts.
 */
export declare abstract class AxisCore extends DeletableEntity implements IAxisParams, IDeletable {
    /**
     * The Default {@link AxisCore.id}
     * @description
     * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
     * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
     * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
     * their operations to an axis.
     *
     * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
     * you want them to be registered on.
     */
    static readonly DEFAULT_AXIS_ID = "DefaultAxisId";
    /**
     * The type of axis. See {@link EAxisType} for a list of values
     */
    abstract readonly type: EAxisType;
    /**
     * Callback to invalidate the parent 2D {@link SciChartSurface} or 3D {@link SciChart3DSurface}
     */
    invalidateParentCallback: () => void;
    /**
     * An {@link EventHandler} which fires a callback when the {@link AxisCore.visibleRange} property changes.
     * @desc
     */
    visibleRangeChanged: EventHandler<VisibleRangeChangedArgs>;
    /** A flag to indicate if measure has been called this frame.  Properties updated after measure must trigger a redraw */
    isMeasured: boolean;
    /** If the diff of the visibleRange is 0, this growby fraction will be applied */
    ZeroRangeGrowBy: number;
    /**
     * Internal backing property for {@link AxisCore.id}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected idProperty: string;
    /**
     * Internal backing property for {@link AxisCore.isAxis}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected isXAxisProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.growBy}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected growByProperty: NumberRange | undefined;
    /**
     * Internal backing property for {@link AxisCore.visibleRange}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected visibleRangeProperty: NumberRange;
    /**
     * Internal backing property for {@link AxisCore.majorDelta}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected majorDeltaProperty: number;
    /**
     * Internal backing property for {@link AxisCore.minorDelta}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected minorDeltaProperty: number;
    /**
     * Internal backing property for {@link AxisCore.minorsPerMajor}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected minorsPerMajorProperty: number;
    /**
     * Internal backing property for {@link AxisCore.textFormatting}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected textFormattingProperty: string;
    /**
     * Internal backing property for {@link AxisCore.cursorTextFormatting}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected cursorTextFormattingProperty: string;
    /**
     * Internal backing property for {@link AxisCore.drawMajorGridLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawMajorGridLinesProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.drawMinorGridLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawMinorGridLinesProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.drawMajorTickLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawMajorTickLinesProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.drawMinorTickLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawMinorTickLinesProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.drawMajorBands}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawMajorBandsProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.drawLabels}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected drawLabelsProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.flippedCoordinates}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected flippedCoordinatesProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.tickTextBrush}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected tickTextBrushProperty: string;
    /**
     * Internal backing property for {@link AxisCore.axisBandsFill}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected axisBandsFillProperty: string;
    /**
     * Internal backing property for {@link AxisCore.autoRange}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected autoRangeProperty: EAutoRange;
    /**
     * Internal backing property for {@link AxisCore.majorTickLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected majorTickLineStyleProperty: TTickLineStyle;
    /**
     * Internal backing property for {@link AxisCore.minorTickLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected minorTickLineStyleProperty: TTickLineStyle;
    /**
     * Internal backing property for {@link AxisCore.axisTitle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected axisTitleProperty: string | string[];
    /**
     * Internal backing property for {@link AxisCore.majorGridLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected majorGridLineStyleProperty: TGridLineStyle;
    /**
     * Internal backing property for {@link AxisCore.minorGridLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected minorGridLineStyleProperty: TGridLineStyle;
    /**
     * Internal backing property for {@link AxisCore.axisTitleStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected axisTitleStyleProperty: TAxisTitleStyle;
    /**
     * Internal backing property for {@link AxisCore.tickProvider}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected tickProviderProperty: TickProvider;
    /**
     * Internal backing property for {@link AxisCore.labelProvider}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected labelProviderProperty: LabelProvider;
    /**
     * Internal backing property for {@link AxisCore.deltaCalculator}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected deltaCalculatorProperty: DeltaCalculator;
    /**
     * Internal backing property for {@link AxisCore.tickCoordinatesProvider}.
     * To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected tickCoordinatesProviderProperty: TickCoordinatesProvider;
    /**
     * Internal backing property for {@link AxisCore.getCurrentCoordinateCalculator},
     * a method which returns the latest valid {@link CoordinateCalculatorBase}
     * instance for calculating pixel coordinates from data-values and vice versa.
     */
    protected coordCalcCache: CoordinateCalculatorBase;
    /**
     * Internal backing property for {@link AxisCore.isVisible}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected isVisibleProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.autoTicks}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected autoTicksProperty: boolean;
    /**
     * Internal backing property for {@link AxisCore.maxAutoTicks}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
     */
    protected maxAutoTicksProperty: number;
    protected visibleRangeAnimationToken: IGenericAnimation;
    protected readonly defaultVisibleRange: NumberRange;
    protected allowFastMathProperty: boolean;
    /**
     * If false, autoRange Once will run on this axis.  Set true when there is any change to the visibleRange.
     */
    protected hasVisibleRangeSet: boolean;
    /**
     * Creates an instance of an {@link AxisCore}
     * @param options Optional parameters of type {@link IAxisCoreOptions} used to define properties at instantiation time
     */
    protected constructor(options?: IAxisCoreOptions);
    /**
     * Gets if the Axis is Category
     */
    get isCategoryAxis(): boolean;
    /**
     * SET INTERNALLY. Gets whether this axis is an XAxis or not
     * @remarks
     * See {@link AxisBase2D.axisAlignment} if you want to set a 2D Axis alignment to the left, right, top or bottom
     */
    get isXAxis(): boolean;
    /**
     * When true, 32-bit faster paths for coordinate calculation maths are used. This improves performance in
     * edge-cases where every CPU cycle counts.
     */
    get allowFastMath(): boolean;
    /**
     * When true, 32-bit faster paths for coordinate calculation maths are used. This improves performance in
     * edge-cases where every CPU cycle counts.
     */
    set allowFastMath(allowFastMath: boolean);
    /**
     * When true, the axis has a valid {@link AxisCore.visibleRange} which can be drawn
     * @remarks
     * {@link AxisCore.visibleRange} undefined, or NAN, or infinite, or {@link AxisCore.visibleRange} min greater than max
     * will result in this property being false.
     */
    hasValidVisibleRange(): boolean;
    /**
     * When true, the axis has the default {@link AxisCore.visibleRange}.
     * @remarks
     * This property is used internally when autoranging. If the range is default and {@link AxisCore.autoRange} is {@link EAutoRange.Once}
     * then the axis will autorange once.
     */
    hasDefaultVisibleRange(): boolean;
    /**
     * Gets or sets the unique Axis Id
     * @description
     * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
     * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
     * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
     * their operations to an axis.
     *
     * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
     * you want them to be registered on.
     */
    get id(): string;
    /**
     * Gets or sets the unique Axis Id
     * @description
     * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
     * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
     * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
     * their operations to an axis.
     *
     * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
     * you want them to be registered on.
     */
    set id(id: string);
    /**
     * When true, the axis is visible. Default value is also true for the axis
     * @remarks
     * An invisible axis can be used to scale series to the viewport. For example:
     *
     *  - have a chart with two-YAxis
     *  - have one series on the first axis and another series on the second axis
     *  - set second {@link AxisCore.isVisible} = false, and {@link AxisCore.autoRange} = {@link EAutoRange.Always}
     *
     *  This will scale the series on the second axis to the viewport, on an invisible, auto-ranged axis
     */
    get isVisible(): boolean;
    /**
     * When true, the axis is visible. Default value is also true for the axis
     * @remarks
     * An invisible axis can be used to scale series to the viewport. For example:
     *
     *  - have a chart with two-YAxis
     *  - have one series on the first axis and another series on the second axis
     *  - set second {@link AxisCore.isVisible} = false, and {@link AxisCore.autoRange} = {@link EAutoRange.Always}
     *
     *  This will scale the series on the second axis to the viewport, on an invisible, auto-ranged axis
     */
    set isVisible(isVisible: boolean);
    /**
     * Gets or sets the GrowBy: a padding factor on the axis
     * @description
     * Growby factor is a padding factor set on the axis. For example if you want to have a constant padding above and below the axis,
     * the following code will result in a 10% (min) and 20% (max) padding outside of the datarange.
     * ```ts
     * axis.growBy = new NumberRange(0.1, 0.2);
     * ```
     */
    get growBy(): NumberRange | undefined;
    /**
     * Gets or sets the GrowBy: a padding factor on the axis
     * @description
     * Growby factor is a padding factor set on the axis. For example if you want to have a constant padding above and below the axis,
     * the following code will result in a 10% (min) and 20% (max) padding outside of the datarange.
     * ```ts
     * axis.growBy = new NumberRange(0.1, 0.2);
     * ```
     */
    set growBy(growBy: NumberRange | undefined);
    /**
     * The VisibleRange is the range of the Axis (min to max).
     * @description
     * For example, if you have data-values from 0 to 100 in your {@link XyDataSeries | DataSeries}, but you only want to show
     * values from 15-25 on the axis, then set the visibleRange as follows:
     * ```ts
     * axis.visibleRange = new NumberRange(15, 25);
     * ```
     * @remarks
     * The visibleRange is a data-value for {@link NumericAxis}, {@link NumericAxis3D} but refers to an **index** to the data
     * for {@link CategoryAxis} types.
     */
    get visibleRange(): NumberRange;
    /**
     * The VisibleRange is the range of the Axis (min to max).
     * @description
     * For example, if you have data-values from 0 to 100 in your {@link XyDataSeries | DataSeries}, but you only want to show
     * values from 15-25 on the axis, then set the visibleRange as follows:
     * ```ts
     * axis.visibleRange = new NumberRange(15, 25);
     * ```
     * @remarks
     * The visibleRange is a data-value for {@link NumericAxis}, {@link NumericAxis3D} but refers to an **index** to the data
     * for {@link CategoryAxis} types.
     *
     * If you override this setter, make sure you add
     * this.hasVisibleRangeSet = true;
     */
    set visibleRange(visibleRange: NumberRange);
    get animatedVisibleRange(): NumberRange;
    /**
     * Sets and animates the visibleRange of the axis from the current value to the provided value over the duration and with
     * {@link TEasingFn | Easing Function} provided
     * @param visibleRange the {@link NumberRange} which we wish to animate {@link AxisCore.visibleRange} to
     * @param durationMs the duration of the animation in milliseconds
     * @param easingFunction the {@link TEasingFn | Easing Function to use}. Default value is outCubic
     * @param onCompleted the callback function
     */
    abstract animateVisibleRange(visibleRange: NumberRange, durationMs: number, easingFunction: TEasingFn, onCompleted: () => void): IGenericAnimation;
    /**
     * The MajorDelta is the spacing between major gridlines and axis labels.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.minorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    get majorDelta(): number;
    /**
     * The MajorDelta is the spacing between major gridlines and axis labels.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.minorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    set majorDelta(majorDelta: number);
    /**
     * The MinorDelta is the spacing between minor gridlines.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.majorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    get minorDelta(): number;
    /**
     * The MinorDelta is the spacing between minor gridlines.
     * @remarks
     * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
     * in which case you should also set {@link AxisCore.majorDelta} and {@link AxisCore.autoTicks} = false.
     *
     * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
     * spacing.
     */
    set minorDelta(minorDelta: number);
    /**
     * When {@link AxisCore.autoTicks} is true, minorsPerMajor is a hint of how many minor gridlines should be drawn between each major gridline
     */
    get minorsPerMajor(): number;
    /**
     * When {@link AxisCore.autoTicks} is true, minorsPerMajor is a hint of how many minor gridlines should be drawn between each major gridline
     */
    set minorsPerMajor(minorDelta: number);
    get textFormatting(): string;
    set textFormatting(textFormatting: string);
    get cursorTextFormatting(): string;
    set cursorTextFormatting(cursorTextFormatting: string);
    /**
     * When true, major gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.majorGridLineStyle} to style the major gridlines
     */
    get drawMajorGridLines(): boolean;
    /**
     * When true, major gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.majorGridLineStyle} to style the major gridlines
     */
    set drawMajorGridLines(drawMajorGridLines: boolean);
    /**
     * When true, minor gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.minorGridLineStyle} to style the minor gridlines
     */
    get drawMinorGridLines(): boolean;
    /**
     * When true, minor gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.minorGridLineStyle} to style the minor gridlines
     */
    set drawMinorGridLines(drawMinorGridLines: boolean);
    /**
     * When true, major gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.majorTickLineStyle} to style the major tick lines
     */
    get drawMajorTickLines(): boolean;
    /**
     * When true, major gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.majorTickLineStyle} to style the major tick lines
     */
    set drawMajorTickLines(drawMajorTickLines: boolean);
    /**
     * When true, minor gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.minorTickLineStyle} to style the minor tick lines
     */
    get drawMinorTickLines(): boolean;
    /**
     * When true, minor gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
     * @description
     * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
     *
     * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
     *
     * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
     * @remarks
     * See also {@link AxisCore.minorTickLineStyle} to style the minor tick lines
     */
    set drawMinorTickLines(drawMinorTickLines: boolean);
    /**
     * When true, draws bands, a solid color fill between alternative major gridlines, else they are not drawn
     * @remarks
     * See also the {@link AxisCore.axisBandsFill} property to style this element
     */
    get drawMajorBands(): boolean;
    /**
     * When true, draws bands, a solid color fill between alternative major gridlines, else they are not drawn
     * @remarks
     * See also the {@link AxisCore.axisBandsFill} property to style this element
     */
    set drawMajorBands(drawMajorBands: boolean);
    /**
     * When true, draws labels on the axis, else they are not drawn
     */
    get drawLabels(): boolean;
    /**
     * When true, draws labels on the axis, else they are not drawn
     */
    set drawLabels(drawLabels: boolean);
    /**
     * When true, axis coordinates are flipped, e.g. a {@link NumericAxis} with {@link AxisCore.visibleRange | VisibleRange}
     * 0..10 will render from 10 to 0
     */
    get flippedCoordinates(): boolean;
    /**
     * When true, axis coordinates are flipped, e.g. a {@link NumericAxis} with {@link AxisCore.visibleRange | VisibleRange}
     * 0..10 will render from 10 to 0
     */
    set flippedCoordinates(flippedCoordinates: boolean);
    /**
     * Gets or sets the Axis Bands fill as an HTML Color code
     * @remarks See {@link AxisCore.drawMajorBands} to switch band drawing on and off
     */
    get axisBandsFill(): string;
    /**
     * Gets or sets the Axis Bands fill as an HTML Color code
     * @remarks See {@link AxisCore.drawMajorBands} to switch band drawing on and off
     */
    set axisBandsFill(axisBandsFill: string);
    /**
     * gets or sets the Auto-Ranging behaviour on the axis. See {@link EAutoRange} for a list of values. The default value is
     * {@link EAutoRange.Once}
     */
    get autoRange(): EAutoRange;
    /**
     * gets or sets the Auto-Ranging behaviour on the axis. See {@link EAutoRange} for a list of values. The default value is
     * {@link EAutoRange.Once}
     */
    set autoRange(autoRange: EAutoRange);
    /**
     * @summary Gets or sets the Major Tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    get majorTickLineStyle(): TTickLineStyle;
    /**
     * @summary Gets or sets the Major Tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    set majorTickLineStyle(majorTickLineStyle: TTickLineStyle);
    /**
     * @summary Gets or sets the Minor Tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    get minorTickLineStyle(): TTickLineStyle;
    /**
     * @summary Gets or sets the Minor Tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    set minorTickLineStyle(minorTickLineStyle: TTickLineStyle);
    /**
     * @summary Gets or sets the Major gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    get majorGridLineStyle(): TGridLineStyle;
    /**
     * @summary Gets or sets the Major gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    set majorGridLineStyle(majorGridLineStyle: TGridLineStyle);
    /**
     * @summary Gets or sets the Minor gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    get minorGridLineStyle(): TGridLineStyle;
    /**
     * @summary Gets or sets the Minor gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    set minorGridLineStyle(minorGridLineStyle: TGridLineStyle);
    /**
     * Gets the {@link axisTitleStyle} adjusted for current DPI / Browser zoom level
     */
    get dpiAdjustedAxisTitleStyle(): TAxisTitleStyle;
    /**
     * @summary Gets or sets the Axis Title style
     * @remarks See {@link TAxisTitleStyle} for the type which contains style options
     */
    get axisTitleStyle(): TAxisTitleStyle;
    /**
     * @summary Gets or sets the Axis Title style
     * @remarks See {@link TAxisTitleStyle} for the type which contains style options
     */
    set axisTitleStyle(textStyle: TAxisTitleStyle);
    /**
     * Gets or sets the Axis title string
     * Use an array to create a multiLine title
     */
    get axisTitle(): string | string[];
    /**
     * Gets or sets the Axis title string
     * Use an array to create a multiLine title
     */
    set axisTitle(axisTitle: string | string[]);
    /**
     * Gets or sets a {@link TickProvider} - a class which calculates ticks (interval between major and minor gridlines, ticks and labels)
     */
    get tickProvider(): TickProvider;
    /**
     * Gets or sets a {@link TickProvider} - a class which calculates ticks (interval between major and minor gridlines, ticks and labels)
     * @param tickProvider
     */
    set tickProvider(tickProvider: TickProvider);
    /**
     * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
     */
    get labelProvider(): LabelProvider;
    /**
     * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
     */
    set labelProvider(labelProvider: LabelProvider);
    /**
     * Gets or sets a {@link DeltaCalculator} - a class which is responsible for calculating the Major and Minor delta,
     * which are used for gridline spacing
     */
    get deltaCalculator(): DeltaCalculator;
    /**
     * Gets or sets a {@link DeltaCalculator} - a class which is responsible for calculating the Major and Minor delta,
     * which are used for gridline spacing
     */
    set deltaCalculator(deltaCalculator: DeltaCalculator);
    /**
     * Gets or sets a {@link TickCoordinatesProvider} - a class which is responsible for converting tick values to pixel coordinates
     */
    get tickCoordinatesProvider(): TickCoordinatesProvider;
    /**
     * Gets or sets a {@link TickCoordinatesProvider} - a class which is responsible for converting tick values to pixel coordinates
     */
    set tickCoordinatesProvider(tickCoordinatesProvider: TickCoordinatesProvider);
    /**
     * Gets or sets the max-auto-ticks. A hint which limits the number of major gridlines and labels (aka major ticks) on the axis
     * at any one time. This value is a hint, and actual value of ticks may be lower than this
     */
    get maxAutoTicks(): number;
    /**
     * Gets or sets the max-auto-ticks. A hint which limits the number of major gridlines and labels (aka major ticks) on the axis
     * at any one time. This value is a hint, and actual value of ticks may be lower than this
     */
    set maxAutoTicks(value: number);
    /**
     * A boolean flag, when true, the axis will automatically calculate its Major and Minor delta.
     * When false, the user can specify or set these properties for overriding axis gridline spacing
     */
    get autoTicks(): boolean;
    /**
     * A boolean flag, when true, the axis will automatically calculate its Major and Minor delta.
     * When false, the user can specify or set these properties for overriding axis gridline spacing
     */
    set autoTicks(value: boolean);
    /**
     * Gets the current {@link CoordinateCalculatorBase} instance. Recreates the coordinate-calculator if it does not match the axis values
     * The coordinate-calculator allows you to transform between pixel and data coordinates (and vice versa)
     */
    getCurrentCoordinateCalculator(): CoordinateCalculatorBase;
    /** Force the recreation of the coordinate calculator the next time it is requested
     * Required if the dataSeries has changed on a category axis
     */
    clearCoordCalcCache(): void;
    /**
     * Gets a default value to apply to {@link AxisCore.visibleRange} if none provided, and no auto-range operation
     */
    abstract getDefaultNonZeroRange(): NumberRange;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Tests whether the range passed in is valid
     * @param range The range
     */
    isValidRange(range: NumberRange): boolean;
    get isVerticalChart(): boolean;
    get isHorizontalAxis(): boolean;
    /**
     * Creates new {@link CoordinateCalculatorBase} instance. Valid for this render-pass only, the coordinate-calculator
     * allows you to transform between pixel and data coordinates (and vice versa)
     */
    protected abstract getCurrentCoordinateCalculatorInternal(): CoordinateCalculatorBase;
    /**
     * Gets the long dimension of the axis, in pixels
     */
    abstract getAxisSize(): number;
    /**
     * SET INTERNALLY. Sets whether this axis is an XAxis or not
     * @remarks
     * See {@link AxisBase2D.axisAlignment} if you want to set a 2D Axis alignment to the left, right, top or bottom
     */
    protected setIsXAxis(isXAxis: boolean): void;
    protected coerceZeroVisibleRange(range: NumberRange): NumberRange;
    /**
     * Notifies listeners to {@link AxisCore.invalidateParentCallback} that a property has changed and the parent chart needs to be redrawn.
     * @remarks Override this in derived classes if you want to notified of a specific property change
     * @param propertyName The property name which has changed.
     */
    protected notifyPropertyChanged(propertyName: string): void;
    protected getMaxAutoTicks(): number;
}
