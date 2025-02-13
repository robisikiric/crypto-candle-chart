import { EventHandler } from "../../Core/EventHandler";
import { IIncludeSeries } from "../../Core/IIncludeSeries";
import { Point } from "../../Core/Point";
import { Rect } from "../../Core/Rect";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { RubberBandSvgRect } from "../Visuals/RubberBandSvgRect/RubberBandSvgRect";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { DataPointInfo } from "./DataPointInfo";
import { DataPointSelectionChangedArgs } from "./DataPointSelectionChangedArgs";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 *  Defines constants which represents different selection modes of {@link DataPointSelectionModifier}
 */
export declare enum ESelectionMode {
    /**
     * Points which the user selects are combined with previously selected points.
     */
    Union = "Union",
    /**
     * Points which the user selects become selected, Exclusive-Or (XOR) the current selection
     */
    Inverse = "Inverse",
    /**
     * Points which the user selects become selected. Previously collected points are cleared or replaced by these.
     */
    Replace = "Replace"
}
/**
 * Type to store whether modifier keys (Control, Shift, Alt) are pressed or not
 */
export declare type TModifierKeys = {
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
};
/**
 * Optional parameters used to configure a {@link DataPointSelectionModifier} at construct time
 */
export interface IDataPointSelectionModifierOptions extends IChartModifierBaseOptions {
    /**
     * When true, allow drag to select a rectangle of points.
     * Also see {@link IDataPointSelectionModifierOptions.allowClickSelect} to allow click selection
     * @remarks: default TRUE
     */
    allowDragSelect?: boolean;
    /**
     * When true, allow click to select a point.
     * Also see {@link IDataPointSelectionModifierOptions.allowDragSelect} to allow rectangle dragging
     * @remarks: default TRUE
     */
    allowClickSelect?: boolean;
    /**
     * Optional function to override the {@link ESelectionMode}, e.g. Union, Replace or Invert.
     * See the {@link TModifierKeys} parameter which tells you if Ctrl, Shift or Alt key are currently
     * pressed.
     * @param modifierKeys Contains info about whether Ctrl, Shift or Alt key are currently pressed
     * @param isAreaSelection When true, the user is dragging (an area selection), else, a single point to click
     */
    getSelectionMode?: ((modifierKeys: TModifierKeys, isAreaSelection: boolean) => ESelectionMode) | string;
    /**
     * Sets the fill of the selection rectangle as an HTML-compatible color string
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077``` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    selectionStroke?: string;
    /**
     * Sets the fill of the selection rectangle as an HTML-compatible color string
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077``` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    selectionFill?: string;
    /**
     * Sets the strokeThickness of the selection rectangle
     */
    selectionStrokeThickness?: number;
    /**
     * Optional callback for when any datapoint is selected or deselected
     * @param arg Argument of
     */
    onSelectionChanged?: ((args: DataPointSelectionChangedArgs) => void) | string;
}
export declare class DataPointSelectionModifier extends ChartModifierBase2D implements IIncludeSeries {
    readonly type = EChart2DModifierType.DataPointSelection;
    /**
     * A selection-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
     * notified when any {@link IRenderableSeries | Series} is selected or unselected
     */
    readonly selectionChanged: EventHandler<DataPointSelectionChangedArgs>;
    /**
     * When true, allow single click to select a data-point. Also see {@link allowDragSelect}
     * for the option to drag to select multiple points
     * @remarks Default value is TRUE
     */
    allowClickSelect: boolean;
    /**
     * When true, allow dragging a rectangle to select multiple data-points.
     * Also see {@link allowClickSelect} for the option to click to select a single point
     * @remarks Default value is TRUE
     */
    allowDragSelect: boolean;
    private selectionStrokeProperty;
    private selectionFillProperty;
    private selectionStrokeThicknessProperty;
    protected startPoint: Point;
    protected endPoint: Point;
    protected selectionRect: RubberBandSvgRect;
    private isClicked;
    private includedSeriesMap;
    private selectedDataPointsMap;
    private selectionHasChanged;
    /**
     * Creates an instances of DataPointSelectionModifier
     * @param options Optional parameters of type {@link IDataPointSelectionModifierOptions} used to configure the modifier
     */
    constructor(options?: IDataPointSelectionModifierOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * @inheritDoc
     */
    onAttach(): void;
    /**
     * @inheritDoc
     */
    onDetach(): void;
    /**
     * An array of currently selected series which can be observed by subscribing to the {@link selectionChanged} {@link EventHandler | event handler}
     * @remarks See  documentation for how to subscribe to changes
     */
    get selectedDataPoints(): DataPointInfo[];
    /**
     * @inheritDoc
     */
    onAttachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    onDetachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseUp(args: ModifierMouseArgs): void;
    /**
     * Gets or sets the strokeThickness of the selection rect when the user drags on the chart
     */
    get selectionStrokeThickness(): number;
    /**
     * Gets or sets the strokeThickness of the selection rect when the user drags on the chart
     */
    set selectionStrokeThickness(selectionStrokeThickness: number);
    /**
     * Gets or sets the stroke of the selection rect when the user drags on the chart
     */
    get selectionStroke(): string;
    /**
     * Gets or sets the stroke of the selection rect when the user drags on the chart
     */
    set selectionStroke(selectionStroke: string);
    /**
     * Gets or sets the fill of the selection rect when the user drags on the chart
     */
    get selectionFill(): string;
    /**
     * Gets or sets the fill of the selection rect when the user drags on the chart
     */
    set selectionFill(selectionFill: string);
    /**
     * @inheritDoc
     */
    getIncludedRenderableSeries(): IRenderableSeries[];
    /**
     * @inheritDoc
     */
    includeSeries(series: IRenderableSeries, isIncluded: boolean): void;
    /**
     * Used internally for tests. Gets a Map of included series
     * @remarks Series include flag set to false means excluded. Series not present or flag=true means included
     */
    get includedSeries(): Map<IRenderableSeries, boolean>;
    /**
     * Gets the current {@link ESelectionMode} to use - e.g. Union, Replace - depending on {@link TModifierKeys}
     * and if the selection is area selection or not. This function can be overridden by the
     * {@link IDataPointSelectionModifierOptions.getSelectionMode}
     * @remarks Default behaviour is {@link ESelectionMode.Replace}, or {@link ESelectionMode.Union} when CTRL pressed,
     * or {@link ESelectionMode.Inverse} when Shift pressed
     * @param modifierKeys The {@link TModifierKeys} e.g. if Ctrl, Shift or Alt are pressed
     * @param isAreaSelection When true, the user has selected a rectangle or area, not clicked a single point
     * @protected
     */
    getSelectionMode(modifierKeys: TModifierKeys, isAreaSelection: boolean): ESelectionMode;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    delete(): void;
    /**
     * Selects all points inside the {@link Rect}, according to the {@link ESelectionMode} passed in
     * @param rect
     * @param selectionMode
     * @protected
     */
    protected selectManyPoints(rect: Rect, selectionMode: ESelectionMode): void;
    /**
     * Performs selection of a single point with the desired {@link ESelectionMode}
     * @param point
     * @param selectionMode
     * @protected
     */
    protected selectSinglePoint(point: Point, selectionMode: ESelectionMode): void;
    /**
     * Deselects all points
     * @param invalidate When true (default=true) raise {@link selectionChanged} event and redraw the parent {@link SciChartSurface}
     * @protected
     */
    protected deselectAllPoints(invalidate?: boolean): void;
    private addSelectedDataPoint;
    private removeSelectedDataPoint;
    private clearSelectedDataPoints;
    private removeSelectedDataPointsForSeries;
    private raiseSelectionChanged;
}
