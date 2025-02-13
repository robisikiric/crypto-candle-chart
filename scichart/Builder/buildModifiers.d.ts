import { ChartModifierBase2D, IChartModifierBaseOptions } from "../Charting/ChartModifiers/ChartModifierBase2D";
import { ICursorModifierOptions } from "../Charting/ChartModifiers/CursorModifier";
import { IDataPointSelectionModifierOptions } from "../Charting/ChartModifiers/DataPointSelectionModifier";
import { ILegendModifierOptions } from "../Charting/ChartModifiers/LegendModifier";
import { IMouseWheelZoomModifierOptions } from "../Charting/ChartModifiers/MouseWheelZoomModifier";
import { IRangeSelectionModifierOptions } from "../Charting/ChartModifiers/OverviewRangeSelectionModifier";
import { IPinchZoomModifierOptions } from "../Charting/ChartModifiers/PinchZoomModifier";
import { IRolloverModifierOptions } from "../Charting/ChartModifiers/RolloverModifier";
import { IVerticalSliceOptions } from "../Charting/ChartModifiers/VerticalSliceModifier";
import { IRubberBandXyZoomModifierOptions } from "../Charting/ChartModifiers/RubberBandXyZoomModifier";
import { ISeriesSelectionModifierOptions } from "../Charting/ChartModifiers/SeriesSelectionModifier";
import { IXAxisDragModifierOptions } from "../Charting/ChartModifiers/XAxisDragModifier";
import { IYAxisDragModifierOptions } from "../Charting/ChartModifiers/YAxisDragModifier";
import { IZoomExtentsModifierOptions } from "../Charting/ChartModifiers/ZoomExtentsModifier";
import { IZoomPanModifierOptions } from "../Charting/ChartModifiers/ZoomPanModifier";
import { EChart2DModifierType } from "../types/ChartModifierType";
import { IAnnotationHoverModifierOptions } from "../Charting/ChartModifiers/AnnotationHoverModifier";
/** Definition of a 2d chart modifier, comprising a {@link EChart2DModifierType} and the relevant options */
export declare type TModifierDefinition = {
    type: EChart2DModifierType.Cursor;
    options?: ICursorModifierOptions;
} | {
    type: EChart2DModifierType.DataPointSelection;
    options?: IDataPointSelectionModifierOptions;
} | {
    type: EChart2DModifierType.Legend;
    options?: ILegendModifierOptions;
} | {
    type: EChart2DModifierType.MouseWheelZoom;
    options?: IMouseWheelZoomModifierOptions;
} | {
    type: EChart2DModifierType.PinchZoom;
    options?: IPinchZoomModifierOptions;
} | {
    type: EChart2DModifierType.Rollover;
    options?: IRolloverModifierOptions;
} | {
    type: EChart2DModifierType.VerticalSlice;
    options?: IVerticalSliceOptions;
} | {
    type: EChart2DModifierType.RubberBandXYZoom;
    options?: IRubberBandXyZoomModifierOptions;
} | {
    type: EChart2DModifierType.SeriesSelection;
    options?: ISeriesSelectionModifierOptions;
} | {
    type: EChart2DModifierType.AnnotationHover;
    options?: IAnnotationHoverModifierOptions;
} | {
    type: EChart2DModifierType.XAxisDrag;
    options?: IXAxisDragModifierOptions;
} | {
    type: EChart2DModifierType.YAxisDrag;
    options?: IYAxisDragModifierOptions;
} | {
    type: EChart2DModifierType.ZoomExtents;
    options?: IZoomExtentsModifierOptions;
} | {
    type: EChart2DModifierType.ZoomPan;
    options?: IZoomPanModifierOptions;
} | {
    type: EChart2DModifierType.OverviewRangeSelection;
    options?: IRangeSelectionModifierOptions;
} | {
    type: EChart2DModifierType.Custom;
    customType?: string;
    options?: IChartModifierBaseOptions;
};
/**
 * Build one or more chart modifiers from a definition that can be pure data.
 * @param definition One or an array of {@link TModifierDefinition}
 * @returns An array of modifiers
 */
export declare const buildModifiers: (definition: TModifierDefinition | TModifierDefinition[]) => ChartModifierBase2D[];
