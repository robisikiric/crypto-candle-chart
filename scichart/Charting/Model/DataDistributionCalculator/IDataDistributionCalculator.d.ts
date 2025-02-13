import { NumberArray } from "../../../types/NumberArray";
import { SCRTDoubleVector } from "../../../types/TSciChart";
export interface IDataDistributionCalculator {
    /**
     * isSortedAscending Data Distribution flag
     */
    readonly isSortedAscending: boolean;
    /**
     * containsNaN Data Distribution flag
     */
    readonly containsNaN: boolean;
    /**
     *  Called when X Values are appended. Should update the Data Distribution flags
     * @param isSorted
     * @param containsNaN
     * @param currentXValues
     * @param newXValues
     * @param newYValues
     */
    onAppend(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray): void;
    /**
     * Called when new values are inserted. Should update the Data Distribution flags
     * @param isSorted
     * @param containsNaN
     * @param currentXValues
     * @param newXValues
     * @param newYValues
     * @param indexWhereInserted
     */
    onInsert(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray, indexWhereInserted: number): void;
    /**
     * Called when yValues are updated. Should update the Data Distribution flags
     * @param isSorted
     * @param containsNaN
     * @param currentXValues
     * @param newXValues
     * @param newYValues
     * @param indexWhereUpdated
     */
    onUpdate(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray, indexWhereUpdated: number): void;
    /**
     * Clears the DataDistributionCalculator flags
     * @param isSorted
     * @param containsNaN
     */
    clear(isSorted: boolean, containsNaN: boolean): void;
    /**
     * Called to update isSortedAscending flag manually, for example when {@link IDataSeries.isSorted} property changes
     * @param value
     */
    setIsSortedAscending(value: boolean): void;
    /**
     * Called to update containsNaN flag manually, for example when {@link IDataSeries.containsNaN} property changes
     * @param value
     */
    setContainsNaN(value: boolean): void;
}
