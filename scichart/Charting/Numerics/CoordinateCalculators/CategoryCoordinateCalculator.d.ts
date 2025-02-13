import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { CoordinateCalculatorBase } from "./CoordinateCalculatorBase";
/**
 * Provides an implementation of Numeric {@link CoordinateCalculatorBase | Coordinate Calculator} which transforms
 * numeric data indexes for {@link CategoryAxis} to pixel coordinates and vice versa.
 * @remarks
 * SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts} perform conversion operations between
 * data-coordinates for all drawing and axis measurements.
 *
 * You can fetch a {link CategoryCoordinateCalculator} instance by calling {@link AxisCore.getCurrentCoordinateCalculator} on a {@link CategoryAxis}.
 * This will return a unique calculator for the current draw pass.
 *
 * You can convert pixel to data-indexes and back by using the following code.
 * An additional method for Category calculators transforms between data-value and index:
 * ```ts
 * const axis: AxisCore;
 * const calc = axis.getCurrentCoordinateCalculator();
 *
 * const pixel = calc.getCoordinate(11); // Gets the pixel coordinate for data at index 11
 * const dataIndex = calc.getDataValue(pixel); // Performs the inverse operation to get data-value
 * const dataValue = calc.transformIndexToData(dataIndex); // Converts index to data-value
 * ```
 * Use the Coordinate calculators when drawing, placing markers, annotations or if you want to place a tooltip over the chart.
 */
export declare class CategoryCoordinateCalculator extends CoordinateCalculatorBase {
    /**
     * The indexMin is the {@link CategoryAxis.visibleRange}.min at the time of drawing, corresponding to the minimum data-index visible
     */
    readonly indexMin: number;
    /**
     * The indexMax is the {@link CategoryAxis.visibleRange}.max at the time of drawing, corresponding to the maximum data-index visible
     */
    readonly indexMax: number;
    /**
     * The primary chart series X-values, required for category calculations and interpolation / extrapolation
     */
    baseXValues: SCRTDoubleVector;
    /**
     * Creates an instance of CategoryCoordinateCalculator
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link CategoryAxis.visibleRange}.min at the time of drawing, corresponding to the minimum data-index visible
     * @param visibleMax The {@link CategoryAxis.visibleRange}.max at the time of drawing, corresponding to the maximum data-index visible
     * @param offset A constant pixel offset used in coordinate calculations
     */
    constructor(webAssemblyContext: TSciChart, viewportDimension: number, visibleMin: number, visibleMax: number, offset?: number);
    /**
     * Transforms an Index to a Data-value, with extrapolation and interpolation for values found outside of
     * {@link baseXValues | the Primary Chart series X-Values}
     * @param index the index to transform
     * @returns the Data-value
     */
    transformIndexToData(index: number): number;
    /**
     * Transforms an Data-value to Index, with extrapolation and interpolation for values found outside of
     * {@link baseXValues | the Primary Chart series X-Values}
     * @param Data-Value the index to transform
     * @returns the index
     */
    transformDataToIndex(dataValue: number): number;
}
