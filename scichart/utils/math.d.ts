/**
 * Sine wave
 * @param pointCount - number of points, includes most left and most right points
 * @param xMax - sine wave supposed to be plotted in interval from 0 to xMax
 * @param frequency - frequency per interval [0, xMax]
 * @param amplitude
 * @param noiseAmplitude - amplitude for noise
 */
import { XyDataSeries } from "../Charting/Model/XyDataSeries";
export declare const getNoisySinewave: (pointCount: number, xMax: number, frequency: number, amplitude: number, noiseAmplitude: number) => number[][];
export declare const fillNoisySinewave: (pointCount: number, xMax: number, frequency: number, amplitude: number, noiseAmplitude: number, dataSeries: XyDataSeries) => void;
export declare const logToBase: (n: number, base: number) => number;
