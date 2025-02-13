import { TSciChart } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { CoordinateCalculatorBase } from "./CoordinateCalculatorBase";
/**
 * Provides an implementation of Numeric {@link CoordinateCalculatorBase | Coordinate Calculator} which transforms
 * numeric data-values to pixel coordinates and vice versa.
 * @remarks
 * SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts} perform conversion operations between
 * data-coordinates for all drawing and axis measurements.
 *
 * You can fetch a CoordinateCalculator instance by calling {@link AxisCore.getCurrentCoordinateCalculator}. This will return a unique calculator
 * for the current draw pass.
 *
 * You can convert pixel to data-coordinates and back by using the following code:
 * ```ts
 * const axis: AxisCore;
 * const calc = axis.getCurrentCoordinateCalculator();
 *
 * const pixel = calc.getCoordinate(1.23); // Gets the pixel coordinate for data-value 1.23
 * const dataValue = cald.getDataValue(pixel); // Performs the inverse operation to get data-value
 * ```
 *
 * Use the Coordinate calculators when drawing, placing markers, annotations or if you want to place a tooltip over the chart.
 */
export declare class NumericCoordinateCalculator extends CoordinateCalculatorBase {
    /**
     * Creates an instance of NumericCoordinateCalculator
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link AxisCore.visibleRange}.min at the time of drawing
     * @param visibleMax The {@link AxisCore.visibleRange}.max at the time of drawing
     * @param offset A constant pixel offset used in coordinate calculations
     * @param allowFastMath When true, calculate using 32-bit floating point values (faster, but less accurate)
     */
    constructor(webAssemblyContext: TSciChart | TSciChart3D, viewportDimension: number, visibleMin: number, visibleMax: number, offset?: number, allowFastMath?: boolean);
}
