import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart } from "../../../types/TSciChart";
import { BasePointSeriesResampled } from "./BasePointSeriesResampled";
import { IXyPointSeries } from "./IPointSeries";
export declare class XyPointSeriesResampled extends BasePointSeriesResampled implements IXyPointSeries {
    constructor(wasmContext: TSciChart, xRange: NumberRange);
}
