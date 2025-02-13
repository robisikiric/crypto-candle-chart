import { IPieSegment } from "../SciChartPieSurface/PieSegment/IPieSegment";
import { ELegendType, SciChartLegendBase } from "./SciChartLegendBase";
/**
 * A legend specific to pie and donut chart types. Inherits {@link SciChartLegendBase}
 */
export declare class SciChartPieLegend extends SciChartLegendBase {
    readonly type = ELegendType.SciChartPieLegend;
    animate: boolean;
    private showCheckboxesProperty;
    private showSeriesMarkersProperty;
    private pieSegmentArray;
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
     * @inheritDoc
     */
    applyTheme(): void;
    /**
     * Sets the array of pie segments to display in the legend
     * @param pieSegmentArray The Pie segment array
     * @remarks See {@link SciChartPieSurface.pieSegments} which is the source for this array
     */
    setPieSegmentArray(pieSegmentArray: IPieSegment[]): void;
    /**
     * @inheritDoc
     */
    update(): void;
    /**
     * @inheritDoc
     */
    protected addEventListeners(): void;
    /** @inheritDoc */
    protected removeEventListeners(): void;
    /**
     * @inheritDoc
     */
    protected getInnerHTML(): string;
}
