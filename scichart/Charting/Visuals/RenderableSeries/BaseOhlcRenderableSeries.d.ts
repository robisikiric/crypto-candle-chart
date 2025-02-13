import { NumberRange } from "../../../Core/NumberRange";
import { EDataPointWidthMode } from "../../../types/DataPointWidthMode";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { IOhlcPointSeries } from "../../Model/PointSeries/IPointSeries";
import { OhlcPointSeriesResampled } from "../../Model/PointSeries/OhlcPointSeriesResampled";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
export interface IBaseOhlcRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /** Sets the stoke when candlestick close is greater than open, as an HTML color code */
    strokeUp?: string;
    /** Sets the stoke when candlestick close is less than open, as an HTML color code */
    strokeDown?: string;
    /**
     * Sets a value used to calculate the width of candles.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * To specify if the value should be treated as relative, absolute, or based on range use {@link dataPointWidthMode}
     */
    dataPointWidth?: number;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    dataPointWidthMode?: EDataPointWidthMode;
}
export declare abstract class BaseOhlcRenderableSeries extends BaseRenderableSeries {
    protected pointSeries: OhlcPointSeriesResampled;
    private strokeUpProperty;
    private strokeDownProperty;
    private dataPointWidthProperty;
    private dataPointWidthModeProperty;
    private xyyTempPointSeries;
    constructor(webAssemblyContext: TSciChart, options?: IBaseOhlcRenderableSeriesOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Gets or sets the stoke when candlestick close is greater than open, as an HTML color code
     */
    get strokeUp(): string;
    /**
     * Gets or sets the stoke when candlestick close is greater than open, as an HTML color code
     */
    set strokeUp(htmlColorCode: string);
    /**
     * Gets or sets the stoke when candlestick close is less than open, as an HTML color code
     */
    get strokeDown(): string;
    /**
     * Gets or sets the stoke when candlestick close is less than open, as an HTML color code
     */
    set strokeDown(htmlColorCode: string);
    /**
     * Gets or sets the width of candles as a fraction of available space. Valid values range from 0.0 - 1.0
     */
    get dataPointWidth(): number;
    /**
     * Gets or sets the width of candles as a fraction of available space. Valid values range from 0.0 - 1.0
     */
    set dataPointWidth(value: number);
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    get dataPointWidthMode(): EDataPointWidthMode;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    set dataPointWidthMode(value: EDataPointWidthMode);
    /** @inheritDoc */
    notifyPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    getXRange(): NumberRange;
    /** @inheritDoc */
    delete(): void;
    /**
     * Returns the {@link IDataSeries.getNativeOpenValues} for the associated {@link dataSeries}
     */
    getNativeOpenValues(): SCRTDoubleVector;
    /**
     * Returns the {@link IDataSeries.getNativeHighValues} for the associated {@link dataSeries}
     */
    getNativeHighValues(): SCRTDoubleVector;
    /**
     * Returns the {@link IDataSeries.getNativeLowValues} for the associated {@link dataSeries}
     */
    getNativeLowValues(): SCRTDoubleVector;
    /**
     * Returns the {@link IDataSeries.getNativeCloseValues} for the associated {@link dataSeries}
     */
    getNativeCloseValues(): SCRTDoubleVector;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    toPointSeries(rp?: ResamplingParams): IOhlcPointSeries;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
