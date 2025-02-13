import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesField, IXyFilterOptions, XyFilterBase } from "./XyFilterBase";
/**
 * Options for the {@link XyMovingAverageFilter}
 */
export interface IXyMovingAverageFilterOptions extends IXyFilterOptions {
    /**
     * The length of the moving average
     */
    length: number;
}
/**
 * An XyDataSeries that is the moving average of the original series
 */
export declare class XyMovingAverageFilter extends XyFilterBase {
    private lengthProperty;
    private buffer;
    private pointer;
    private bufferTotal;
    constructor(originalSeries: BaseDataSeries, options?: IXyMovingAverageFilterOptions);
    /**
     * Gets or Sets the length of the moving average
     */
    get length(): number;
    /**
     * Gets or Sets the length of the moving average
     */
    set length(value: number);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                field: EDataSeriesField;
                length: number;
            };
        };
        type: import("../IDataSeries").EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected onOriginalPropertyChanged(name: string): void;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private calculateUpdate;
    private calculate;
}
