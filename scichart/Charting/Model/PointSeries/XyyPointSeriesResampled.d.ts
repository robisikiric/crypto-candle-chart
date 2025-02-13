import { NumberRange } from "../../../Core/NumberRange";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { BasePointSeriesResampled } from "./BasePointSeriesResampled";
import { IXyyPointSeries } from "./IPointSeries";
export declare class XyyPointSeriesResampled extends BasePointSeriesResampled implements IXyyPointSeries {
    readonly y1Values: SCRTDoubleVector;
    constructor(wasmContext: TSciChart, xRange: NumberRange);
    delete(): void;
    debugOutputForUnitTests(): void;
}
