import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesField, IXyFilterOptions, XyFilterBase } from "./XyFilterBase";
/**
 * An XyDataSeries that represents the linear trendline (or linear regression) of the original series
 */
export declare class XyLinearTrendFilter extends XyFilterBase {
    private slopeProperty;
    private interceptProperty;
    private correlationProperty;
    constructor(originalSeries: BaseDataSeries, options?: IXyFilterOptions);
    /**
     * Gets the slope of the trendline
     */
    get slope(): number;
    /**
     * Gets the y-intercept of the trendline
     */
    get intercept(): number;
    /**
     * Gets the correlation coefficient of the trendline
     */
    get correlation(): number;
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                field: EDataSeriesField;
                slope: number;
                intercept: number;
            };
        };
        type: import("../IDataSeries").EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected filterAll(): void;
}
