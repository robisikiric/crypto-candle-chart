import { TLabelProviderDefinition } from "../../../Builder/buildAxis";
import { Thickness } from "../../../Core/Thickness";
import { TBorder } from "../../../types/TBorder";
import { PieLabelProvider } from "../Axis/LabelProvider/PieLabelProvider";
import { ISurfaceOptionsBase } from "../SciChartSurfaceBase";
import { EPieType, EPieValueMode, ESizingMode } from "./SciChartPieSurface";
/**
 * Options passed to a {@link SciChartPieSurface} in the {@link SciChartPieSurface.create} function
 */
export interface IPieSurfaceOptions extends ISurfaceOptionsBase {
    /**
     * Optional - the width aspect ratio of the {@link SciChartPieSurface}. By default SciChart will scale to fit the parent Div.
     * However if height of the div is not provided it will use width/height aspect ratio to calculate the height. The default ratio is 3/2.
     */
    widthAspect?: number;
    /**
     * Optional - the height aspect ratio of the {@link SciChartPieSurface}. By default SciChart will scale to fit the parent Div.
     * However if height of the div is not provided it will use width/height aspect ratio to calculate the height. The default ratio is 3/2.
     */
    heightAspect?: number;
    /** Optional - whether this is a pie or donut chart. Default Pie.  */
    pieType?: EPieType;
    /** Optional - the radius of the hole for a donut chart. */
    holeRadius?: number;
    /** Optional - Whether to animate the chart as it is drawn.  Default true */
    animate?: boolean;
    /** Optional - The number of frames for the animation. Default 30.  A frame will be trigged every 20ms. */
    animationFrames?: number;
    /** Optional - how the hole radius is interpreted, either absolute, or relative to the total radius */
    holeRadiusSizingMode?: ESizingMode;
    /** Optional - whether to show the legend.  Default true */
    showLegend?: boolean;
    /** Optional - whether to animate the appearance of the legend.  Default true */
    animateLegend?: boolean;
    /** Optional - whether to show checkboxes on the legend.  Default false */
    showLegendCheckBoxes?: boolean;
    /** Optional - whether to show series markers on the legend.  Default true */
    showLegendSeriesMarkers?: boolean;
    /** Optional - adds the spacings / padding around the view area */
    padding?: Thickness;
    /** Optional - adds the border to the view area */
    canvasBorder?: TBorder;
    /** Optional - addes spacing between the segments */
    seriesSpacing?: number;
    /**
     * Sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
     */
    labelProvider?: PieLabelProvider | TLabelProviderDefinition;
    /** Whether to show labels as percentages, or raw values.  Default to percentages */
    valueMode?: EPieValueMode;
    /**
     * Use this to adjust the position of the labels.  1 is the default.  Larger values will shift the labels outwards.
     * For Pie charts, 1.7 will place the labels outside the pie.
     * If you want more detailed control you can override calcTitlePosition.
     */
    labelRadiusAdjustment?: number;
}
