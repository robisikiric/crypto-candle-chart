import { TLayoutManagerDefinition } from "../../Builder/buildSurface";
import { Rect } from "../../Core/Rect";
import { Thickness } from "../../Core/Thickness";
import { EAutoColorMode } from "../../types/AutoColorMode";
import { TBorder } from "../../types/TBorder";
import { TChartTitleStyle } from "../../types/TextStyle";
import { ECoordinateMode } from "./Annotations/AnnotationBase";
import { ISurfaceOptionsBase } from "./SciChartSurfaceBase";
/**
 * Options passed to a {@link SciChartSurface} in the {@link SciChartSurface.create} function
 */
export interface I2DSurfaceOptions extends ISurfaceOptionsBase {
    /**
     * Optional - Prove a layoutManager to customise the axis layout.  Use CentralAxesLayoutManager for an easy way to configure central axes.
     */
    layoutManager?: TLayoutManagerDefinition;
    /**
     * Optional - Padding between the SciChartSurface and its inner elements. Default 10
     */
    padding?: Thickness;
    /**
     * Optional - Properties of the viewport border (where series are drawn)
     */
    viewportBorder?: TBorder;
    /**
     * Optional - Properties of the canvas border
     */
    canvasBorder?: TBorder;
    drawSeriesBehindAxis?: boolean;
    /**
     * Optional - An {@link EAutoColorMode} which controls how often series colours set to AUTO_COLOR will be resolved.  Default OnAddRemoveSeries
     */
    autoColorMode?: EAutoColorMode;
    /**
     * Optional a title for the SciChartSurface
     */
    title?: string | string[];
    /**
     * The title text style and placement for the SciChartSurface as {@link TChartTitleStyle}
     */
    titleStyle?: TChartTitleStyle;
    /**
     * @experimental
     *  Optional - enabling prevents chart rendering until {@link SciChartSurface.resume} is called on the surface instance
     */
    createSuspended?: boolean;
}
export interface I2DSubSurfaceOptions extends I2DSurfaceOptions {
    /**
     * A rectangle defining the position and size of a subchart.
     * If {@link coordinateMode} is Relative (the default) then the values give the size as a proportion of the parent div, and all properties must be between 0 and 1 inclusive.
     * If {@link coordinateMode} is DataValue, values will be converted to coordinates using {@link parentXAxisId} and {@link parentYAxisId}. Subchart will be clpped to the parent SeriesViewRect
     * Can only be set if this is a subChart.  See {@link addSubChart}
     */
    position?: Rect;
    /** An id or div element that will wrap the subchart.  This can contain top, left, bottom and right section divs.  The chart will shrink to fit the sections  */
    subChartContainerId?: string | HTMLDivElement;
    /** Whether other surfaces, including the parent, will be visible underneath this surface  */
    isTransparent?: boolean;
    /** Sets if the subchart is visible, allowing you to hide a subchart without removing it from the parent surface */
    isVisible?: boolean;
    /**
     * Sets additional absolute padding between the SciChartSubSurface and its parent, in order top, right, bottom, left
     * {@link subPosition} is applied first, then this padding is added.
     */
    subChartPadding?: Thickness;
    /**
     * Gets or sets the {@link ECoordinateMode} used when calculating the actual position based on the {@link subPosition}
     * Default Relative
     */
    coordinateMode?: ECoordinateMode;
    /**
     * Sets the AxisId used to determing which X Axis should be used when calculating the actual position based on the {@link subPosition}
     * if {@link coordinateMode} is DataValue
     */
    parentXAxisId?: string;
    /**
     * Sets the AxisId used to determing which Y Axis should be used when calculating the actual position based on the {@link subPosition}
     * if {@link coordinateMode} is DataValue
     */
    parentYAxisId?: string;
    /**
     * Gets or sets scale property for all sections
     */
    sectionScale?: number;
}
