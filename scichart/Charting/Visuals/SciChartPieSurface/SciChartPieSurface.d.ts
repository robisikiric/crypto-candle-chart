import { ISciChartPieDefinition } from "../../../Builder/buildSurface";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { EventHandler } from "../../../Core/EventHandler";
import { IDeletable } from "../../../Core/IDeletable";
import { ObservableArray } from "../../../Core/ObservableArray";
import { Thickness } from "../../../Core/Thickness";
import { ESciChartSurfaceType } from "../../../types/SciChartSurfaceType";
import { TBorder } from "../../../types/TBorder";
import { TSciChartSurfaceCanvases } from "../../../types/TSciChartSurfaceCanvases";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { TTextStyle } from "../Axis/AxisCore";
import { PieLabelProvider } from "../Axis/LabelProvider/PieLabelProvider";
import { IEventSubscriptionItem } from "../Legend/SciChartLegendBase";
import { SciChartPieLegend } from "../Legend/SciChartPieLegend";
import { ISciChartSurfaceBase, TSciChartDestination } from "../SciChartSurfaceBase";
import { IPieSurfaceOptions } from "./IPieSurfaceOptions";
import { IPieSegment } from "./PieSegment/IPieSegment";
export declare enum ESizingMode {
    /**
     * The size value is specified as absolute value ( e.g. 1px, 10dp etc)
     */
    Absolute = "Absolute",
    /**
     * The size value is specified as relative value ( e.g. 10% from available size )
     */
    Relative = "Relative"
}
export declare enum EPieType {
    Pie = "Pie",
    Donut = "Donut"
}
export declare enum EPieValueMode {
    Percentage = 0,
    Raw = 1
}
/**
 * @summary The {@link SciChartPieSurface} is the root Pie and Donut Chart control in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Chart Library}
 * @description
 * To create a Pie chart using SciChart, declare a {@link SciChartPieSurface} using {@link SciChartPieSurface.create},
 *
 * Next, add a pie segments by adding a {@link PieSegment} to the {@link SciChartPieSurface.pieSegments} collection.
 *
 * You can create a donut chart by setting the {@link SciChartPieSurface.holeRadius} property.
 *
 * You can add and configure a legend by setting the {@link SciChartPieSurface.legend} property.
 * @remarks
 * It is possible to have more than one {@link SciChartPieSurface} on screen at the same time.
 * {@link SciChartPieSurface | SciChartPieSurfaces} scale to fit the parent DIV where they are hosted. Use CSS to position the DIV.
 */
export declare class SciChartPieSurface extends DeletableEntity implements ISciChartSurfaceBase {
    /**
     * Creates a {@link SciChartPieSurface} to occupy the div by element ID in your DOM.
     * @remarks This method is async and must be awaited
     * @param divElementId The Div Element ID where the {@link SciChartPieSurface} will reside
     * @param width Optional - the width of the {@link SciChartPieSurface} in pixels. By default SciChart will scale to fit the parent Div
     * @param height Optional - the height of the {@link SciChartPieSurface} in pixels. By default SciChart will scale to fit the parent Div
     */
    static create(divElement: string | HTMLDivElement, options?: IPieSurfaceOptions): Promise<SciChartPieSurface>;
    /**
     * @summary Gets the collection of {@link IPieSegment} - the pie segments or slices on this {@link SciChartPieSurface}
     * @description A {@link SciChartPieSurface} can have one to many {@link IPieSegment | Pie Segments}.     *
     * Use this collection to add and remove series to the chart.
     * @remarks
     * Adding a pie segment to the chart causes it to automatically redraw.
     */
    readonly pieSegments: ObservableArray<IPieSegment>;
    readonly domChartRoot: HTMLDivElement;
    readonly domCanvas2D: HTMLCanvasElement;
    readonly domSvgContainer: SVGSVGElement;
    readonly domSvgAdornerLayer: SVGSVGElement;
    readonly domDivContainer: HTMLDivElement;
    animate: boolean;
    animationFrames: number;
    /**
     * An optional legend of type {@link SciChartPieLegend} which may be added to the Pie chart
     */
    legend: SciChartPieLegend;
    onCreatedName: string;
    id: string;
    /**
     * An event handler which notifies its subscribers when a render operation has finished. Use this
     * to time render performance, or to update elements of the chart or your UI on redraw.
     */
    rendered: EventHandler<boolean>;
    protected widthAspect: number;
    protected heightAspect: number;
    protected labelProviderProperty: PieLabelProvider;
    protected isDeletedProperty: boolean;
    protected destinations: TSciChartDestination[];
    private pieTypeProperty;
    private holeRadiusProperty;
    private holeRadiusSizingModeProperty;
    private seriesSpacingProperty;
    private labelRadiusProperty;
    private svg;
    private titleDivs;
    private viewRect;
    private sweepAnimationDone;
    private suspendUpdate;
    private themeProviderProperty;
    private previousThemeProviderProperty;
    private deletables;
    private paddingProperty?;
    private canvasBorderProperty?;
    private valueModeProperty;
    private labelStyleProperty;
    private resizeSubscriptionToken;
    constructor(canvases?: TSciChartSurfaceCanvases, options?: IPieSurfaceOptions);
    get isDeleted(): boolean;
    /**
     * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
     */
    get labelProvider(): PieLabelProvider;
    /**
     * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
     */
    set labelProvider(labelProvider: PieLabelProvider);
    /**
     * Gets or sets a {@link TTextStyle} object for styling labels
     */
    get labelStyle(): TTextStyle;
    /**
     * Gets or sets a {@link TTextStyle} object for styling labels
     */
    set labelStyle(textStyle: TTextStyle);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Used internally - gets the previous {@link IThemeProvider}
     */
    get themeProvider(): IThemeProvider;
    /**
     * Used internally - gets the previous {@link IThemeProvider}
     */
    get previousThemeProvider(): IThemeProvider;
    setDestinations(destinations: TSciChartDestination[]): void;
    get otherSurfaces(): ISciChartSurfaceBase[];
    /**
     * Call invalidateElement() to trigger a redraw of the {@link SciChartPieSurface}. SciChart's rendering
     * engine will schedule a redraw a the next time the renderer is free.
     */
    invalidateElement(options?: string | {
        force?: boolean;
    }): void;
    /**
     * Called internally - Updates and draws the Pie Chart
     */
    update(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Used Internally. Cleans up the chart internal parts, subscriptions, etc.
     */
    protected deleteInternals(isAnimationProgress?: boolean): void;
    /**
     * @inheritDoc
     */
    addDeletable(deletable: IDeletable): void;
    /**
     * @inheritDoc
     */
    changeViewportSize(width: number, height: number): void;
    /**
     * Gets or sets the type of the pie chart. See {@link EPieType} for a list of values
     * @remarks See also {@link holeRadius} which is required for Donut charts and {@link holeRadiusSizingMode}
     * which defines whether the Donut hole is relative or absolute.
     */
    get pieType(): EPieType;
    /**
     * Gets or sets the type of the pie chart. See {@link EPieType} for a list of values
     * @remarks See also {@link holeRadius} which is required for Donut charts and {@link holeRadiusSizingMode}
     * which defines whether the Donut hole is relative or absolute.
     */
    set pieType(value: EPieType);
    /**
     * Gets or sets the hole radius, which allows you to create Donut charts instead of Pie.
     * @remarks See also {@link EPieType} which is required to change from Pie to Donut and {@link holeRadiusSizingMode}
     * which defines whether the Donut hole is relative or absolute.
     */
    get holeRadius(): number;
    /**
     * Gets or sets the hole radius, which allows you to create Donut charts instead of Pie.
     * @remarks See also {@link EPieType} which is required to change from Pie to Donut and {@link holeRadiusSizingMode}
     * which defines whether the Donut hole is relative or absolute.
     */
    set holeRadius(holeRadius: number);
    /**
     * Gets or sets the hole radius size mode for Donut charts. See {@link ESizingMode} for a list of values
     * @remarks See also {@link EPieType} which is required to change from Pie to Donut, and {@link holeRadius}
     * which sets the size of a Donut Chart hole
     */
    get holeRadiusSizingMode(): ESizingMode;
    /**
     * Gets or sets the hole radius size mode for Donut charts. See {@link ESizingMode} for a list of values
     * @remarks See also {@link EPieType} which is required to change from Pie to Donut, and {@link holeRadius}
     * which sets the size of a Donut Chart hole
     */
    set holeRadiusSizingMode(holeRadiusSizingMode: ESizingMode);
    /**
     * Gets or sets padding
     */
    get padding(): Thickness;
    /**
     * Gets or sets padding
     */
    set padding(value: Thickness);
    /**
     * Gets or sets canvas border
     */
    get canvasBorder(): TBorder;
    /**
     * Gets or sets canvas border
     */
    set canvasBorder(value: TBorder);
    get seriesSpacing(): number;
    set seriesSpacing(value: number);
    /** Whether to show labels as percentages, or raw values.  Default to percentages */
    get valueMode(): EPieValueMode;
    /** Whether to show labels as percentages, or raw values.  Default to percentages */
    set valueMode(value: EPieValueMode);
    /**
     * Use this to adjust the position of the labels.  1 is the default.  Larger values will shift the labels outwards.
     * For Pie charts, 1.7 will place the labels outside the pie
     * If you want more detailed control you can override calcTitlePosition.
     */
    get labelRadiusAdjustment(): number;
    /**
     * Use this to adjust the position of the labels.  1 is the default.  Larger values will shift the labels outwards.
     * If you want more detailed control you can override calcTitlePosition.
     */
    set labelRadiusAdjustment(value: number);
    /**
     * Convert the surface to a {@link TSurfaceDefinition}
     * @param excludedata If false, segments will be included in the json
     */
    toJSON(excludedata?: boolean): {
        type: ESciChartSurfaceType;
        options: ISciChartPieDefinition;
    };
    /** The method used to calculate the label position for each segment */
    calcTitlePosition(x: number, y: number, outerRadius: number, innerRadius: number, a1: number, a2: number, delta: number, divWidth: number, divHeight: number): {
        left: number;
        top: number;
    };
    /**
     * Changes the size of the DOM element where the {@link SciChartSurfaceBase} resides.
     * @param width
     * @param height
     */
    protected changeDomViewportSize(width: number, height: number): void;
    private notifyPropertyChanged;
    private isValidToDraw;
    private detachPieSegment;
    private attachPieSegment;
    private updateLegendMargin;
    private calculateViewRectWidth;
    private calculateViewRectHeight;
    private draw;
    /**
     * @description Draws pie chart itself
     * @param animationProgress - Current progress from 0 to 1, is being used for sweep animation on start.
     */
    private drawChart;
    private adjustDomContainer;
    private drawSegmentLabel;
    private pieSegmentsTotalValue;
    private pieSegmentsTotalOldValue;
    private applySciChartBackground;
}
/** @ignore */
export declare const addEventListenerToPieSegment: (ps: IPieSegment, el: HTMLElement, animate: boolean) => IEventSubscriptionItem;
