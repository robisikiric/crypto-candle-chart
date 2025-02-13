import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesType } from "../IDataSeries";
import { OhlcCustomFilter } from "./OhlcCustomFilter";
import { IOhlcFilterOptions } from "./OhlcFilterBase";
export interface IOhlcScaleOffsetFilterOptions extends IOhlcFilterOptions {
    scale?: number;
    offset?: number;
}
export declare class OhlcScaleOffsetFilter extends OhlcCustomFilter {
    private scaleProperty;
    private offsetProperty;
    get scale(): number;
    set scale(value: number);
    get offset(): number;
    set offset(value: number);
    constructor(originalSeries: BaseDataSeries, options?: IOhlcScaleOffsetFilterOptions);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                scale: number;
                offset: number;
            };
        };
        type: EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected defaultFunction(index: number, y: number): number;
}
