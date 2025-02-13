import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { IDataChangeArgs } from "../IDataSeries";
import { IXyyDataSeriesOptions, XyyDataSeries } from "../XyyDataSeries";
import { IFilterBase } from "./IFilterBase";
import { EDataSeriesField } from "./XyFilterBase";
export interface IXyyFilterOptions extends IXyyDataSeriesOptions {
    yfield?: EDataSeriesField;
    y1field?: EDataSeriesField;
}
export declare abstract class XyyFilterBase extends XyyDataSeries implements IFilterBase {
    readonly yfield: EDataSeriesField;
    readonly y1field: EDataSeriesField;
    protected originalSeriesProperty: BaseDataSeries;
    constructor(originalSeries: BaseDataSeries, options?: IXyyFilterOptions);
    get originalSeries(): BaseDataSeries;
    detachFromOriginalSeries(): void;
    delete(): void;
    getOriginalXValues(): SCRTDoubleVector;
    getOriginalYValues(): SCRTDoubleVector;
    getOriginalY1Values(): SCRTDoubleVector;
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
