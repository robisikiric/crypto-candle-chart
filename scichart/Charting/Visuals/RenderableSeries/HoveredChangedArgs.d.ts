import { SeriesSelectionModifier } from "../../ChartModifiers/SeriesSelectionModifier";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IRenderableSeries } from "./IRenderableSeries";
/**
 * Arguments passed into the callback for {@link SeriesSelectionModifier.hoverChanged} event
 */
export declare class HoveredChangedArgs {
    /**
     * The source {@link SeriesSelectionModifier} which raised the event
     */
    readonly source: SeriesSelectionModifier;
    /**
     * The array of hovered series at the time of the event
     */
    readonly hoveredSeries: IRenderableSeries[];
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
     * @param hoveredSeries
     * @param allSeries
     */
    constructor(source: SeriesSelectionModifier, hoveredSeries: IRenderableSeries[], allSeries: IRenderableSeries[], hitTestInfo: HitTestInfo);
}
