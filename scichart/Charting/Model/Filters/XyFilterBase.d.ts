import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { HlcDataSeries } from "../HlcDataSeries";
import { IDataChangeArgs } from "../IDataSeries";
import { OhlcDataSeries } from "../OhlcDataSeries";
import { IXyDataSeriesOptions, XyDataSeries } from "../XyDataSeries";
import { XyyDataSeries } from "../XyyDataSeries";
import { XyzDataSeries } from "../XyzDataSeries";
import { IFilterBase } from "./IFilterBase";
export declare enum EDataSeriesField {
    X = "x",
    Open = "open",
    High = "high",
    Low = "low",
    Close = "close",
    Y = "y",
    Y1 = "y1",
    Z = "z"
}
/**
 * Options for an {@link XyFilterBase}
 */
export interface IXyFilterOptions extends IXyDataSeriesOptions {
    /**
     * The field that will be returned by getOriginalYValues.
     */
    field?: EDataSeriesField;
    /**
     * The field that will be returned by getOriginalXValues.
     */
    xField?: EDataSeriesField;
}
/**
 * Base class for a filter that produces an {@link XyDataSeries}.
 * @remarks
 * The originalSeries can be any series type (other than heatmap).
 * Pass field in the options to determine which field will be returned by getOriginalYValues.
 *
 * To create a filter it is only necessary to implement filterAll, and onClear,
 * but if possible you should override filterOnAppend, filterOnUpdate, filterOnInsert and filterOnRemove
 */
export declare abstract class XyFilterBase extends XyDataSeries implements IFilterBase {
    /**
     * The field that will be returned by getOriginalYValues.
     */
    readonly field: EDataSeriesField;
    /**
     * The field that will be returned by getOriginalYValues.
     */
    readonly xField: EDataSeriesField;
    protected originalSeriesProperty: BaseDataSeries;
    /**
     * Creates an instance of {@link XyFilterBase}
     * @param originalSeries the {@link BaseDataSeries} to be filtered
     * @param options the {@link IXyFilterOptions} which can be passed to configure the Filter at construct time
     */
    constructor(originalSeries: BaseDataSeries, options?: IXyFilterOptions);
    get originalSeries(): BaseDataSeries;
    detachFromOriginalSeries(): void;
    delete(): void;
    /**
     * Get the X values of the original series
     */
    getOriginalXValues(): SCRTDoubleVector;
    /**
     * Get the Y values of the original series, according to the field set.
     */
    getOriginalYValues(): SCRTDoubleVector;
    /**
     * Get the length of the original series.
     */
    getOriginalCount(): number;
    /**
     * Clear and recreate the entire series.
     */
    protected abstract filterAll(): void;
    /**
     * Callback when a property on the original series is changed.
     * @param name The name of the property that changed
     */
    protected onOriginalPropertyChanged(name: string): void;
    /**
     * Called when data is appended to the original series
     * @param count The number of points appended
     */
    protected filterOnAppend(count: number): void;
    /**
     * Called when a point on the original series is updated
     * @param index The index of the updated point.
     */
    protected filterOnUpdate(index: number): void;
    /**
     * Called when data is inserted to the original series
     * @param startIndex The first index where data is inserted
     * @param count The number of points inserted
     */
    protected filterOnInsert(startIndex: number, count: number): void;
    /**
     * Called when data is removed form the original series
     * @param startIndex The first index where data is removed
     * @param count The number of points removed
     */
    protected filterOnRemove(startIndex: number, count: number): void;
    /**
     * Called when the original series is cleared.
     */
    protected onClear(): void;
    protected onBaseDataChanged(args: IDataChangeArgs): void;
    protected getValuesFromOHLC(field: EDataSeriesField, ohlcSeries: OhlcDataSeries): any;
    protected getValuesFromXyy(field: EDataSeriesField, xyySeries: XyyDataSeries): any;
    protected getValuesFromXyz(field: EDataSeriesField, xyzSeries: XyzDataSeries): any;
    protected getValuesFromHlc(field: EDataSeriesField, hlcSeries: HlcDataSeries): any;
}
export declare const switchData: (field: EDataSeriesField, x: any, closey: any, openy1z?: any, high?: any, low?: any) => any;
