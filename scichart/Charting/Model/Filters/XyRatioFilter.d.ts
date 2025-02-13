import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesType } from "../IDataSeries";
import { EDataSeriesField, IXyFilterOptions, XyFilterBase } from "./XyFilterBase";
/**
 * Options for the {@link XyRatioFilter}
 */
export interface IXyRatioFilterOptions extends IXyFilterOptions {
    /** The dataSeries to divide by */
    divisorSeries: BaseDataSeries;
    /** The field in the divisor series to use */
    divisorField?: EDataSeriesField;
}
/**
 * An XyDataSeries where each point is the ratio of the original series and the given divisorSeries
 */
export declare class XyRatioFilter extends XyFilterBase {
    private readonly divisorSeries;
    private readonly divisorField;
    constructor(originalSeries: BaseDataSeries, options: IXyRatioFilterOptions);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                field: EDataSeriesField;
                divisorSeries: number[];
            };
        };
        type: EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private filter;
    private getDivisorYValues;
    private onDivisorDataChanged;
}
