import { DataPointInfo } from "./DataPointInfo";
import { DataPointSelectionModifier } from "./DataPointSelectionModifier";
/**
 * Arguments passed into the callback for {@link DataPointSelectionModifier.selectionChanged} event
 */
export declare class DataPointSelectionChangedArgs {
    /**
     * The source {@link DataPointSelectionModifier} which raised the event
     */
    readonly source: DataPointSelectionModifier;
    /**
     * The array of selected datapoints at the time of the event.
     * These are datapoints on any {@link BaseDataSeries} which have metadata with {@link IPointMetadata.isSelected} = true.
     * Query {@link DataPointInfo} for more details about the series and data-point index that was selected
     */
    readonly selectedDataPoints: DataPointInfo[];
    /**
     * Creates an instance of DataPointSelectionChangedArgs -
     * arguments passed into the callback for {@link DataPointSelectionModifier.selectionChanged} event
     * @param source
     * @param selectedDataPoints
     */
    constructor(source: DataPointSelectionModifier, selectedDataPoints: DataPointInfo[]);
}
