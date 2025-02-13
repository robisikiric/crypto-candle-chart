import { NumberRange } from "../../../Core/NumberRange";
import { IntVector, SCRTDoubleVector } from "../../../types/TSciChart";
/**
 * The PointSeries is a set of data for drawing. This might be a reduced set depending on optimisations enabled
 */
export interface IPointSeries {
    readonly indexes: SCRTDoubleVector;
    readonly xValues: SCRTDoubleVector;
    readonly yValues: SCRTDoubleVector;
    readonly count: number;
    xRange: NumberRange;
    readonly resampled: boolean;
    fifoStartIndex: number;
}
export interface IPointSeriesResampled {
    readonly intIndexes: IntVector;
    clearIntIndexes(): void;
}
export interface IXyPointSeries extends IPointSeries {
}
export interface IXyyPointSeries extends IPointSeries {
    readonly y1Values: SCRTDoubleVector;
}
export interface IXyzPointSeries extends IPointSeries {
    readonly zValues: SCRTDoubleVector;
}
export interface IHlcPointSeries extends IPointSeries {
    readonly highValues: SCRTDoubleVector;
    readonly lowValues: SCRTDoubleVector;
    readonly closeValues: SCRTDoubleVector;
}
export interface IOhlcPointSeries extends IPointSeries {
    readonly openValues: SCRTDoubleVector;
    readonly highValues: SCRTDoubleVector;
    readonly lowValues: SCRTDoubleVector;
    readonly closeValues: SCRTDoubleVector;
}
