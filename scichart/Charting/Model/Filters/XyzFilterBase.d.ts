import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { IDataChangeArgs } from "../IDataSeries";
import { IXyzDataSeriesOptions, XyzDataSeries } from "../XyzDataSeries";
import { IFilterBase } from "./IFilterBase";
import { EDataSeriesField } from "./XyFilterBase";
export interface IXyzFilterOptions extends IXyzDataSeriesOptions {
    yfield?: EDataSeriesField;
    zfield?: EDataSeriesField;
}
export declare abstract class XyzFilterBase extends XyzDataSeries implements IFilterBase {
    readonly yfield: EDataSeriesField;
    readonly zfield: EDataSeriesField;
    protected originalSeriesProperty: BaseDataSeries;
    constructor(originalSeries: BaseDataSeries, options?: IXyzFilterOptions);
    get originalSeries(): BaseDataSeries;
    detachFromOriginalSeries(): void;
    delete(): void;
    getOriginalXValues(): SCRTDoubleVector;
    getOriginalYValues(): SCRTDoubleVector;
    getOriginalZValues(): SCRTDoubleVector;
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
