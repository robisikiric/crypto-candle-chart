import { NumberRange } from "../../../Core/NumberRange";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { BasePointSeriesResampled } from "./BasePointSeriesResampled";
import { IOhlcPointSeries } from "./IPointSeries";
export declare class OhlcPointSeriesResampled extends BasePointSeriesResampled implements IOhlcPointSeries {
    readonly openValues: SCRTDoubleVector;
    readonly highValues: SCRTDoubleVector;
    readonly lowValues: SCRTDoubleVector;
    readonly closeValues: SCRTDoubleVector;
    constructor(wasmContext: TSciChart, xRange: NumberRange);
    delete(): void;
    debugOutputForUnitTests(): void;
}
