import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { HlcDataSeries, IHlcDataSeriesOptions } from "../HlcDataSeries";
import { IDataChangeArgs } from "../IDataSeries";
import { IFilterBase } from "./IFilterBase";
import { EDataSeriesField } from "./XyFilterBase";
export interface IHlcFilterOptions extends IHlcDataSeriesOptions {
    closefield?: EDataSeriesField;
    highfield?: EDataSeriesField;
    lowfield?: EDataSeriesField;
}
export declare abstract class HlcFilterBase extends HlcDataSeries implements IFilterBase {
    readonly closefield: EDataSeriesField;
    readonly highfield: EDataSeriesField;
    readonly lowfield: EDataSeriesField;
    protected originalSeriesProperty: BaseDataSeries;
    constructor(originalSeries: BaseDataSeries, options?: IHlcFilterOptions);
    get originalSeries(): BaseDataSeries;
    detachFromOriginalSeries(): void;
    delete(): void;
    getOriginalXValues(): SCRTDoubleVector;
    getOriginalYValues(): SCRTDoubleVector;
    getOriginalHighValues(): SCRTDoubleVector;
    getOriginalLowValues(): SCRTDoubleVector;
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
