import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { IDataChangeArgs } from "../IDataSeries";
import { IOhlcDataSeriesOptions, OhlcDataSeries } from "../OhlcDataSeries";
import { IFilterBase } from "./IFilterBase";
export interface IOhlcFilterOptions extends IOhlcDataSeriesOptions {
}
export declare abstract class OhlcFilterBase extends OhlcDataSeries implements IFilterBase {
    protected originalSeriesProperty: BaseDataSeries;
    constructor(originalSeries: BaseDataSeries, options?: IOhlcFilterOptions);
    get originalSeries(): BaseDataSeries;
    detachFromOriginalSeries(): void;
    delete(): void;
    getOriginalXValues(): SCRTDoubleVector;
    getOriginalCount(): number;
    protected abstract filterAll(): void;
    protected onOriginalPropertyChanged(name: string): void;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected onClear(): void;
    protected onBaseDataChanged(args: IDataChangeArgs): void;
}
