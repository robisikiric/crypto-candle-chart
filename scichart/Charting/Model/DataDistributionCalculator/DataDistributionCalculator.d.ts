import { NumberArray } from "../../../types/NumberArray";
import { SCRTDoubleVector } from "../../../types/TSciChart";
import { IDataDistributionCalculator } from "./IDataDistributionCalculator";
export declare class DataDistributionCalculator implements IDataDistributionCalculator {
    private containsNanProperty;
    private isSortedAscendingProperty;
    /** @inheritDoc */
    get containsNaN(): boolean;
    /** @inheritDoc */
    get isSortedAscending(): boolean;
    /** @inheritDoc */
    onAppend(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray): void;
    /** @inheritDoc */
    onInsert(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray, indexWhereInserted: number): void;
    /** @inheritDoc */
    onUpdate(isSorted: boolean, containsNaN: boolean, currentXValues: SCRTDoubleVector, newXValues: NumberArray, newYValues: NumberArray, indexWhereUpdated: number): void;
    /** @inheritDoc */
    clear(isSorted: boolean, containsNaN: boolean): void;
    /** @inheritDoc */
    setIsSortedAscending(value: boolean): void;
    /** @inheritDoc */
    setContainsNaN(value: boolean): void;
}
