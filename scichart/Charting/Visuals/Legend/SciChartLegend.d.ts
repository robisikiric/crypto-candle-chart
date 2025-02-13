import { IRenderableSeries } from "../RenderableSeries/IRenderableSeries";
import { ELegendType, SciChartLegendBase } from "./SciChartLegendBase";
/**
 * The SciChartLegend displays a legend on the chart at top,left,bottom,right location and with customisable legend rows
 */
export declare class SciChartLegend extends SciChartLegendBase {
    readonly type = ELegendType.SciChartLegend;
    /**
     * Checked changed callback - when a legend item row checkbox is checked or unchecked. Set by parent {@link LegendModifier}
     */
    legendItemCheckedChangedCallback: (series: IRenderableSeries, isChecked: boolean) => void;
    private renderableSeriesArray;
    private showCheckboxesProperty;
    private showSeriesMarkersProperty;
    /** @inheritDoc */
    applyTheme(): void;
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
     * Sets the array of RenderableSeries to display in the legend
     * @param renderableSeriesArray The array of series
     * @remarks see {@link SciChartSurface.renderableSeries} which is the source for this array
     */
    setRenderableSeriesArray(renderableSeriesArray: IRenderableSeries[]): void;
    /** @inheritDoc */
    protected addEventListeners(): void;
    /** @inheritDoc */
    protected removeEventListeners(): void;
    /**
     * adds event listeners to a specific {@link IRenderableSeries} series
     */
    protected addEventListenerToSeries(rs: IRenderableSeries): void;
    /** @inheritDoc */
    protected getInnerHTML(): string;
}
