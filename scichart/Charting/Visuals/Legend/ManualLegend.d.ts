import { ISciChartSurfaceBase } from "../SciChartSurfaceBase";
import { ELegendType, ILegendOptionsBase, SciChartLegendBase, TLegendItem } from "./SciChartLegendBase";
export interface IManualLegendOptions extends ILegendOptionsBase {
    /**
     * Sets whether the legend has visibility checkboxes in it or not
     */
    showCheckboxes?: boolean;
    /**
     * Sets whether Series markers are visible or not
     */
    showSeriesMarkers?: boolean;
    items?: TLegendItem[];
    /**
     * Callback when a legend item checkbox is checked or unchecked
     * @param item
     * @param isChecked
     */
    isCheckedChangedCallback?: (item: TLegendItem, isChecked: boolean) => void;
}
export declare class ManualLegend extends SciChartLegendBase {
    type: ELegendType;
    legendItemCheckedChangedCallback: (item: TLegendItem, isChecked: boolean) => void;
    private itemsProperty;
    private showCheckboxesProperty;
    private showSeriesMarkersProperty;
    constructor(options?: IManualLegendOptions, sciChartSurface?: ISciChartSurfaceBase);
    /**
     * Gets or sets whether series visibility checkboxes should be shown
     */
    get showCheckboxes(): boolean;
    /**
     * Gets or sets whether series visibility checkboxes should be shown
     */
    set showCheckboxes(value: boolean);
    /**
     * Gets or sets whether series markers should be shown
     */
    get showSeriesMarkers(): boolean;
    /**
     * Gets or sets whether series markers should be shown
     */
    set showSeriesMarkers(value: boolean);
    /**
     * Gets or sets the items to be displayed in the legend
     */
    get items(): TLegendItem[];
    /**
     * Gets or sets the items to be displayed in the legend
     */
    set items(value: TLegendItem[]);
    attachTo(sciChartSurface: ISciChartSurfaceBase): void;
    applyTheme(): void;
    protected getInnerHTML(): string;
    protected addEventListeners(): void;
    protected addEventListenerToItem(item: TLegendItem): void;
    protected removeEventListeners(): void;
}
