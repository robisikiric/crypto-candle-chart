import { DeletableEntity } from "../../../Core/DeletableEntity";
import { GradientParams } from "../../../Core/GradientParams";
import { IDeletable } from "../../../Core/IDeletable";
import { Rect } from "../../../Core/Rect";
import { Thickness } from "../../../Core/Thickness";
import { ISciChartSurfaceBase } from "../SciChartSurfaceBase";
export declare type TLegendItem = {
    id: string;
    name: string;
    color: string;
    checked: boolean;
    gradient?: GradientParams;
    showMarker?: boolean;
};
export interface IEventSubscriptionItem extends IDeletable {
    element: HTMLElement;
    eventType: string;
    eventListener: EventListener;
}
/**
 * Enumeration constants to define legend orientation
 */
export declare enum ELegendOrientation {
    Vertical = 0,
    Horizontal = 1
}
/**
 * Enumeration constants to define legend placement
 */
export declare enum ELegendPlacement {
    TopLeft = 0,
    TopRight = 1,
    BottomLeft = 2,
    BottomRight = 3
}
/**
 * Enumeration constants to define the legend type
 */
export declare enum ELegendType {
    SciChartLegend = "SciChartLegend",
    ManualLegend = "ManualLegend",
    SciChartPieLegend = "SciChartPieLegend"
}
export interface ILegendOptionsBase {
    /**
     * Sets the initial orientation of the legend. See {@link ELegendOrientation} for a list of values
     */
    orientation?: ELegendOrientation;
    /**
     * Sets whether the legend is initially visible or not
     */
    showLegend?: boolean;
    /**
     * Sets whether the legend has visibility checkboxes in it or not
     */
    showCheckboxes?: boolean;
    /**
     * Sets whether Series markers are visible or not
     */
    showSeriesMarkers?: boolean;
    /**
     * Sets the initial legend placement in the parent chart surface. See {@link ELegendPlacement} for a list of values
     */
    placement?: ELegendPlacement;
    /**
     * Sets the margin for the legend control
     */
    margin?: number;
    /**
     * The parent div element Id or reference, the Legend will be appended to this element
     */
    placementDivId?: string | HTMLDivElement;
    /** Sets the legend background color.  Defaults to theme.legendBackgroundBrush */
    backgroundColor?: string;
    /** Sets the legend text color.  Defaults to theme.labelForegroundBrush  */
    textColor?: string;
}
/**
 * Base class for legends in the SciChart library
 */
export declare abstract class SciChartLegendBase extends DeletableEntity implements IDeletable {
    abstract readonly type: ELegendType;
    protected rootDiv: HTMLDivElement;
    protected parentDiv: HTMLDivElement;
    protected div: HTMLDivElement;
    protected invalidateParentSurface: () => void;
    protected orientationProperty: ELegendOrientation;
    protected showLegendProperty: boolean;
    protected placementProperty: ELegendPlacement;
    protected marginProperty: number;
    protected isDirty: boolean;
    protected parentSurfaceProperty: ISciChartSurfaceBase;
    protected placementDivIdProperty: string | HTMLDivElement;
    protected backgroundColorProperty: string;
    protected textColorProperty: string;
    protected eventListenersCollection: Map<string, IEventSubscriptionItem[]>;
    constructor(options?: ILegendOptionsBase);
    /** @inheritDoc */
    abstract applyTheme(): void;
    setInvalidateParentSurface(value: () => void): void;
    /**
     * Set the root div in HTML where the legend will be placed
     * @param rootDivProperty
     */
    setRootDiv(rootDivProperty: HTMLDivElement): void;
    /**
     * @deprecated
     */
    setSeriesViewRect(seriesViewRect: Rect): void;
    /**
     * Sets the parent {@link ISciChartSurfaceBase}
     */
    setParentSurface(scs: ISciChartSurfaceBase): void;
    /**
     * Attach this legend to a SciChartSurfaceBase
     * @param sciChartSurface
     */
    attachTo(sciChartSurface: ISciChartSurfaceBase): void;
    detach(): void;
    /**
     * Update the legend
     */
    update(): void;
    /**
     * Invalidate the legend, hinting a redraw is needed
     */
    invalidateLegend(): void;
    /**
     * Gets and sets the legend orientation. See {@link ELegendOrientation} for a list of values
     */
    get orientation(): ELegendOrientation;
    /**
     * Gets and sets the legend orientation. See {@link ELegendOrientation} for a list of values
     */
    set orientation(orientation: ELegendOrientation);
    /**
     * When true, the legend is shown, else it is hidden
     */
    get showLegend(): boolean;
    /**
     * When true, the legend is shown, else it is hidden
     */
    set showLegend(value: boolean);
    /**
     * Gets or sets the legend placement. See {@link ELegendPlacement} for a list of values
     */
    get placement(): ELegendPlacement;
    /**
     * Gets or sets the legend placement. See {@link ELegendPlacement} for a list of values
     */
    set placement(value: ELegendPlacement);
    /**
     * Gets or sets the margin in pixels
     */
    get margin(): number;
    /**
     * Gets or sets the margin in pixels
     */
    set margin(value: number);
    /**
     * Gets or sets the parent div element reference or id for the Legend
     */
    get placementDivId(): string | HTMLDivElement;
    /**
     * Gets or sets the parent div element reference or id for the Legend
     */
    set placementDivId(value: string | HTMLDivElement);
    /**
     * Gets or sets the backgroundColor as an html color code
     */
    get backgroundColor(): string;
    /**
     * Gets or sets the backgroundColor as an html color code
     */
    set backgroundColor(value: string);
    /**
     * Gets or sets the textColor as an html color code
     */
    get textColor(): string;
    /**
     * Gets or sets the textColor as an html color code
     */
    set textColor(value: string);
    clear(): void;
    /** @inheritDoc */
    delete(): void;
    /**
     * Gets if the Legend in placed externally
     */
    isExternal(): boolean;
    /**
     * Gets HTML string for the Legend
     * @param placement The {@link SciChartLegendBase} placement
     * @param textColor The {@link SciChartLegendBase} textColor
     * @param backgroundColor The {@link SciChartLegendBase} backgroundColor
     * @param margin The {@link SciChartLegendBase} margin
     * @param orientation The {@link SciChartLegendBase} orientation
     * @param showCheckboxes Show the Legend checkboxes
     * @param showSeriesMarkers Show the Legend markers
     * @param items The {@link TLegendItem[]}
     */
    getLegendHTML(placement: ELegendPlacement, textColor: string, backgroundColor: string, margin: Thickness, orientation: ELegendOrientation, showCheckboxes: boolean, showSeriesMarkers: boolean, items: TLegendItem[]): string;
    /**
     * Gets HTML string for legend items
     * @param orientation The {@link SciChartLegendBase} orientation
     * @param showCheckboxes Show the Legend checkboxes
     * @param showSeriesMarkers Show the Legend markers
     * @param item The {@link TLegendItem}
     */
    getLegendItemHTML(orientation: ELegendOrientation, showCheckboxes: boolean, showSeriesMarkers: boolean, item: TLegendItem): string;
    /**
     * Notifies listeners of {@link invalidateParentSurface} that a property has changed
     */
    protected notifyPropertyChanged(): void;
    /**
     * Creates the legend in the DOM
     */
    protected create(): void;
    /**
     * Gets the HTML to place inside the legend, for example could be several rows of series names, markers
     */
    protected abstract getInnerHTML(): string;
    /**
     * When overridden in a derived class, will be called when its time to add event listeners to series
     */
    protected abstract addEventListeners(): void;
    /**
     * When overridden in a derived class, will be called when its time to remove event listeners from series
     */
    protected abstract removeEventListeners(): void;
    /**
     * removes event listeners from a specific {@link IRenderableSeries} series
     */
    protected removeEventListenerFromSeries: (renderableSeriesId: string) => void;
    protected getParentDiv(): HTMLDivElement;
}
export declare const getLegendItemHtml: (orientation: ELegendOrientation, showCheckboxes: boolean, showSeriesMarkers: boolean, item: TLegendItem) => string;
export declare const getLegendContainerHtml: (placement: ELegendPlacement, textColor: string, backgroundColor: string, margin: Thickness, body: string, isExternal?: boolean) => string;
