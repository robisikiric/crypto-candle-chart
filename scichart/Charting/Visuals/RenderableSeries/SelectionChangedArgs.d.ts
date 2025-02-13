import { SeriesSelectionModifier } from "../../ChartModifiers/SeriesSelectionModifier";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IRenderableSeries } from "./IRenderableSeries";
/**
 * Arguments passed into the callback for {@link SeriesSelectionModifier.selectionChanged} event
 */
export declare class SelectionChangedArgs {
    /**
     * The source {@link SeriesSelectionModifier} which raised the event
     */
    readonly source: SeriesSelectionModifier;
    /**
     * The array of selected series at the time of the event
     */
    readonly selectedSeries: IRenderableSeries[];
    /**
     * The array of all series at the time of the event. Query {@link IRenderableSeries.isSelected} to determine if it is selected or not
     */
    readonly allSeries: IRenderableSeries[];
    /**
     * The hitTestInfo for this event, if available.
     */
    readonly hitTestInfo: HitTestInfo;
    /**
     * Creates an instance of SelectionChangedArgs -
     * arguments passed into the callback for {@link SeriesSelectionModifier.selectionChanged} event
     * @param source
     * @param selectedSeries
     * @param allSeries
     */
    constructor(source: SeriesSelectionModifier, selectedSeries: IRenderableSeries[], allSeries: IRenderableSeries[], hitTestInfo: HitTestInfo);
}
