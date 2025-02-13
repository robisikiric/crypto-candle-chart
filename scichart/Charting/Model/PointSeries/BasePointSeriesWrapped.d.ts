import { NumberRange } from "../../../Core/NumberRange";
import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesValueType } from "../IDataSeries";
import { IPointSeries } from "./IPointSeries";
export declare class BasePointSeriesWrapped implements IPointSeries {
    readonly count: number;
    readonly xRange: NumberRange;
    readonly xValues: SCRTDoubleVector;
    readonly yValues: SCRTDoubleVector;
    readonly resampled = false;
    readonly fifoStartIndex: number;
    protected dataSeries: BaseDataSeries;
    protected indexesProperty: SCRTDoubleVector;
    constructor(dataSeries: BaseDataSeries, yValues?: SCRTDoubleVector, valueType?: EDataSeriesValueType);
    get indexes(): SCRTDoubleVector;
}
