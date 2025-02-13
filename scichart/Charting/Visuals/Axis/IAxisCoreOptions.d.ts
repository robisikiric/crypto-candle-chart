import { NumberRange } from "../../../Core/NumberRange";
import { EAutoRange } from "../../../types/AutoRange";
import { TAxisTitleStyle, TGridLineStyle, TTickLineStyle } from "./AxisCore";
/**
 * Optional parameters passed to {@link AxisCore} constructor to set defaults at construction time
 */
export interface IAxisCoreOptions {
    /**
     * When true, 32-bit faster paths for coordinate calculation maths are used. This improves performance in
     * edge-cases where every CPU cycle counts.
     */
    allowFastMath?: boolean;
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
    visibleRange?: NumberRange;
    /**
     * The Axis Id - a unique string ID for this axis
     * @description
     * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
     * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
     * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
     * their operations to an axis.
     *
     * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
     * you want them to be registered on.
     */
    id?: string;
    /**
     * Sets GrowBy: a padding factor on the axis
     * @description
     * Growby factor is a padding factor set on the axis. For example if you want to have a constant padding above and below the axis,
     * the following code will result in a 10% (min) and 20% (max) padding outside of the datarange.
     * ```ts
     * axis.growBy = new NumberRange(0.1, 0.2);
     * ```
     */
    growBy?: NumberRange;
    /**
     * Sets the {@link AxisCore.autoRange} mode. For a list of values, see {@link EAutoRange}
     */
    autoRange?: EAutoRange;
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
    isVisible?: boolean;
    /**
     * Set the Axis Title string to display on this axis
     * Use an Array to create a multiline title
     */
    axisTitle?: string | string[];
    /**
     * @summary Sets the Axis Title style
     * @remarks See {@link TTextStyle} for the type which contains style options
     */
    axisTitleStyle?: TAxisTitleStyle;
    /**
     * The maximum number of ticks on the axis when SciChart's Axis is in {@link AxisCore.autoTicks} mode
     * @remarks
     * The number of ticks on the axis will never exceed this number, but may be smaller than this number when zooming or panning.
     */
    maxAutoTicks?: number;
    /**
     * When {@link AxisCore.autoTicks} is true, minorsPerMajor is a hint of how many minor
     * gridlines should be drawn between each major gridline
     */
    minorsPerMajor?: number;
    /**
     * When true, the {@link AxisCore.majorDelta} and {@link AxisCore.minorDelta} values will be computed automatically.
     * Else, the user may specify these values by setting the properties.
     */
    autoTicks?: boolean;
    /**
     * The MajorDelta is the spacing between major gridlines and axis labels. Available when {@link AxisCore.autoTicks} is false
     */
    majorDelta?: number;
    /**
     * The MinorDelta is the spacing between major gridlines and axis labels. Available when {@link AxisCore.autoTicks} is false
     */
    minorDelta?: number;
    /**
     * When true, draw labels on the chart, else labels are hidden
     * @remarks Default value when undefined is true
     */
    drawLabels?: boolean;
    /**
     * When true, draw minor gridlines on the chart, else minor grid lines are hidden
     * @remarks Default value when undefined is true
     */
    drawMinorGridLines?: boolean;
    /**
     * When true, draw major gridlines on the chart, else major grid lines are hidden
     * @remarks Default value when undefined is true
     */
    drawMajorGridLines?: boolean;
    /**
     * When true, draw major ticklines on the chart, else major ticks are hidden
     * @remarks Default value when undefined is true
     */
    drawMajorTickLines?: boolean;
    /**
     * When true, draw minor ticklines on the chart, else minor ticks are hidden
     * @remarks Default value when undefined is true
     */
    drawMinorTickLines?: boolean;
    /**
     * @summary Sets the Major gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    majorGridLineStyle?: TGridLineStyle;
    /**
     * @summary Sets the Minor gridlines style
     * @remarks See {@link TGridLineStyle} for the type which contains style options
     */
    minorGridLineStyle?: TGridLineStyle;
    /**
     * @summary Sets the Major tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    majorTickLineStyle?: TTickLineStyle;
    /**
     * @summary Sets the Minor tick lines style
     * @remarks See {@link TTickLineStyle} for the type which contains style options
     */
    minorTickLineStyle?: TTickLineStyle;
    /**
     * When true, draws bands, a solid color fill between alternative major gridlines, else they are not drawn
     * @remarks
     * See also the {@link AxisCore.axisBandsFill} property to style this element
     */
    drawMajorBands?: boolean;
    /**
     * Gets or sets the Axis Bands fill as an HTML Color code
     * @remarks See {@link AxisCore.drawMajorBands} to switch band drawing on and off
     */
    axisBandsFill?: string;
    /**
     * When true, axis coordinates are flipped, e.g. a {@link NumericAxis} with {@link AxisCore.visibleRange | VisibleRange}
     * 0..10 will render from 10 to 0
     */
    flippedCoordinates?: boolean;
}
