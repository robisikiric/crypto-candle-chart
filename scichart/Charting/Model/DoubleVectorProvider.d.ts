import { NumberArray } from "../../types/NumberArray";
import { SCRTDoubleVector, SCRTFifoVector } from "../../types/TSciChart";
import { TSciChart } from "../Visuals/SciChartSurface";
export interface IDoubleVectorProvider {
    capacity: number;
    getDoubleVector(wasmContext: TSciChart): SCRTDoubleVector;
    appendArray(wasmContext: TSciChart, destinationVector: SCRTDoubleVector, values: NumberArray): void;
}
export declare class DoubleVectorProvider implements IDoubleVectorProvider {
    capacity: number;
    getDoubleVector(wasmContext: TSciChart): SCRTDoubleVector;
    appendArray(wasmContext: TSciChart, destinationVector: SCRTDoubleVector, jsArray: NumberArray): void;
}
export declare class FIFOVectorProvider implements IDoubleVectorProvider {
    capacity: number;
    constructor(fifoCapacity: number);
    getDoubleVector(wasmContext: TSciChart): SCRTDoubleVector;
    appendArray(wasmContext: TSciChart, destinationVector: SCRTFifoVector, jsArray: NumberArray): void;
}
