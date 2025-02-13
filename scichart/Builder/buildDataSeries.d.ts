import { IHlcScaleOffsetFilterOptions } from "../Charting/Model/Filters/HlcScaleOffsetFilter";
import { IOhlcScaleOffsetFilterOptions } from "../Charting/Model/Filters/OhlcScaleOffsetFilter";
import { IXyFilterOptions } from "../Charting/Model/Filters/XyFilterBase";
import { IXyMovingAverageFilterOptions } from "../Charting/Model/Filters/XyMovingAverageFilter";
import { IXyRatioFilterOptions } from "../Charting/Model/Filters/XyRatioFilter";
import { IXyScaleOffsetFilterOptions } from "../Charting/Model/Filters/XyScaleOffsetFilter";
import { IXyyScaleOffsetFilterOptions } from "../Charting/Model/Filters/XyyScaleOffsetFilter";
import { IXyzScaleOffsetFilterOptions } from "../Charting/Model/Filters/XyzScaleOffsetFilter";
import { IHlcDataSeriesOptions } from "../Charting/Model/HlcDataSeries";
import { EDataSeriesType, IDataSeries } from "../Charting/Model/IDataSeries";
import { INonUniformHeatmapSeriesOptions } from "../Charting/Model/NonUniformHeatmapDataSeries";
import { IOhlcDataSeriesOptions } from "../Charting/Model/OhlcDataSeries";
import { IUniformHeatmapSeriesOptions } from "../Charting/Model/UniformHeatmapDataSeries";
import { IXyDataSeriesOptions } from "../Charting/Model/XyDataSeries";
import { IXyTextDataSeriesOptions } from "../Charting/Model/XyTextDataSeries";
import { IXyyDataSeriesOptions } from "../Charting/Model/XyyDataSeries";
import { IXyzDataSeriesOptions } from "../Charting/Model/XyzDataSeries";
import { EDataFilterType } from "../types/DataFilterType";
import { TSciChart } from "../types/TSciChart";
/**
 * Shared data that can be used in {@link ISciChart2DDefinition}
 * or directly in {@link chartBuilder.buildSeries} or {@link chartBuilder.buildDataSeries}
 */
export declare type TSharedDataDefinition = Record<number | string, number[]>;
/** Definition of a data filter */
declare type TFilterDefinition = {
    type: EDataFilterType.XyLinearTrend;
    options?: IXyFilterOptions;
} | {
    type: EDataFilterType.XyMovingAverage;
    options?: IXyMovingAverageFilterOptions;
} | {
    type: EDataFilterType.XyRatio;
    options: IXyRatioFilterOptions;
} | {
    type: EDataFilterType.XyScaleOffset;
    options?: IXyScaleOffsetFilterOptions;
} | {
    type: EDataFilterType.XyyScaleOffset;
    options?: IXyyScaleOffsetFilterOptions;
} | {
    type: EDataFilterType.XyzScaleOffset;
    options?: IXyzScaleOffsetFilterOptions;
} | {
    type: EDataFilterType.HlcScaleOffset;
    options?: IHlcScaleOffsetFilterOptions;
} | {
    type: EDataFilterType.OhlcScaleOffset;
    options?: IOhlcScaleOffsetFilterOptions;
};
/** Definition of XY data */
export declare type TXySeriesData = {
    /** The id of sharedData to use for X data.  You must either specify both xDataId and yDataId, or both xValues and yValues */
    xDataId?: number | string;
    /** The id of sharedData to use for Y data.  You must either specify both xDataId and yDataId, or both xValues and yValues */
    yDataId?: number | string;
} & IXyDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of XYY data */
export declare type TXyySeriesData = {
    /** The id of sharedData to use for X data.
     * You must either specify all of xDataId, yDataId and y1DataId, or all of xValues, yValues and y1Values
     */
    xDataId?: number | string;
    /** The id of sharedData to use for Y data.
     * You must either specify all of xDataId, yDataId and y1DataId, or all of xValues, yValues and y1Values
     */
    yDataId?: number | string;
    /** The id of sharedData to use for Y1 data.
     * You must either specify all of xDataId, yDataId and y1DataId, or all of xValues, yValues and y1Values
     */
    y1DataId?: number | string;
} & IXyyDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of XYZ data */
export declare type TXyzSeriesData = {
    /** The id of sharedData to use for X data.
     * You must either specify all of xDataId, yDataId and zDataId, or all of xValues, yValues and zValues
     */
    xDataId?: number | string;
    /** The id of sharedData to use for Y data.
     * You must either specify all of xDataId, yDataId and zDataId, or all of xValues, yValues and zValues
     */
    yDataId?: number | string;
    /** The id of sharedData to use for Z data.
     * You must either specify all of xDataId, yDataId and zDataId, or all of xValues, yValues and zValues
     */
    zDataId?: number | string;
} & IXyzDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of Open, High, Low, Close data */
export declare type TOhlcSeriesData = {
    /** The id of sharedData to use for X data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    xDataId?: number | string;
    /** The id of sharedData to use for Open data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    openDataId?: number | string;
    /** The id of sharedData to use for High data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    highDataId?: number | string;
    /** The id of sharedData to use for Low data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    lowDataId?: number | string;
    /** The id of sharedData to use for Close data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    closeDataId?: number | string;
} & IOhlcDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of Open, High, Low, Close data */
export declare type THlcSeriesData = {
    /** The id of sharedData to use for X data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    xDataId?: number | string;
    /** The id of sharedData to use for High data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    highDataId?: number | string;
    /** The id of sharedData to use for Low data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    lowDataId?: number | string;
    /** The id of sharedData to use for Close data.  You must either use all DataId or all Values properties.  You cannot mix them. */
    closeDataId?: number | string;
} & IHlcDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of XYText data */
export declare type TXyTextSeriesData = {
    /** The id of sharedData to use for X data.
     * You must either specify all of xDataId, yDataId and textValues, or all of xValues, yValues and textValues
     */
    xDataId?: number | string;
    /** The id of sharedData to use for Y data.
     * You must either specify all of xDataId, yDataId and textValues, or all of xValues, yValues and textValues
     */
    yDataId?: number | string;
} & IXyTextDataSeriesOptions & {
    filter?: TFilterDefinition;
};
/** Definition of series data, which can take various shapes */
export declare type TSeriesDataDefinition = TXySeriesData | TXyySeriesData | TXyzSeriesData | THlcSeriesData | TOhlcSeriesData | TXyTextSeriesData | IUniformHeatmapSeriesOptions | INonUniformHeatmapSeriesOptions;
export declare type TDataSeriesDefinition = {
    type: EDataSeriesType;
    options: TSeriesDataDefinition;
};
/**
 * Build a data series from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition A {@link TSeriesDefinition}
 * @param sharedData Optional {@link TSharedDataDefinition} to define shared data which can be referenced by the data series
 * @param originalDataSeries Optional {@Link IDataSeries} to define original data for filter
 * @returns An {@link IDataSeries}
 */
export declare const buildDataSeries: (wasmContext: TSciChart, dataSeriesDefinition: TDataSeriesDefinition, sharedData?: TSharedDataDefinition, originalDataSeries?: IDataSeries) => IDataSeries;
export {};
