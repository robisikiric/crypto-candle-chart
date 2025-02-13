import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { NumberRange } from "../../../Core/NumberRange";
import { IntVector, SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { IPointSeries, IPointSeriesResampled } from "./IPointSeries";
export declare abstract class BasePointSeriesResampled extends DeletableEntity implements IPointSeries, IPointSeriesResampled, IDeletable {
    readonly intIndexes: IntVector;
    readonly indexes: SCRTDoubleVector;
    readonly xValues: SCRTDoubleVector;
    readonly yValues: SCRTDoubleVector;
    xRange: NumberRange;
    readonly resampled = true;
    fifoStartIndex: number;
    protected wasmContext: TSciChart;
    constructor(wasmContext: TSciChart, xRange: NumberRange);
    get count(): number;
    delete(): void;
    clearIntIndexes(): void;
    debugOutputForUnitTests(): void;
}
