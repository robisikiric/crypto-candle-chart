import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { NumberRange } from "../../../Core/NumberRange";
import { CoordinateCalculator, TSciChart } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
/**
 * The CoordinateCalculatorBase class provides methods for converting between Pixel and Data coordinates
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
export declare abstract class CoordinateCalculatorBase extends DeletableEntity implements IDeletable {
    /**
     * Gets or sets the Visible minimum value, corresponding to {@link AxisCore.visibleRange}.min at the time of drawing
     */
    readonly visibleMin: number;
    /**
     * Gets or sets the Visible maximum value, corresponding to {@link AxisCore.visibleRange}.max at the time of drawing
     */
    readonly visibleMax: number;
    /**
     * Gets or sets the ViewportDimension, corresponding to the size of the associated {@link AxisCore | Axis} at the time of drawing
     */
    readonly viewportDimension: number;
    /**
     * Gets or sets a constant offset in pixels for all generated coordinates
     */
    offset: number;
    /**
     * When true, this coordinate calculator has flipped coordinates
     */
    readonly hasFlippedCoordinates: boolean;
    /**
     * When true, this coordinate calculator behaves as a Category coordinate calculator, using index not x-value for measuring
     */
    readonly isCategoryCoordinateCalculator: boolean;
    /**
     * Gets the native (WebAssembly) {@link CoordinateCalculator} instance
     */
    nativeCalculator: CoordinateCalculator;
    /**
     * The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    protected webAssemblyContext: TSciChart | TSciChart3D;
    /**
     * Creates an instance of the CoordinateCalculatorBase
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link AxisCore.visibleRange}.min at the time of drawing
     * @param visibleMax The {@link AxisCore.visibleRange}.max at the time of drawing
     * @param offset A constant pixel offset used in coordinate calculations
     * @param hasFlippedCoordinates When true, this calculator has flipped coordinates
     * @param isCategoryCoordinateCalculator When true, this calculator behaves as a Category coordinate calculator,
     * using index not x-value for measuring
     */
    protected constructor(webAssemblyContext: TSciChart | TSciChart3D, viewportDimension: number, visibleMin: number, visibleMax: number, offset: number, hasFlippedCoordinates: boolean, isCategoryCoordinateCalculator?: boolean);
    /**
     * Converts the Data-value to a pixel coordinate
     * Performs the inverse operation to {@link getDataValue}
     * @param dataValue The data-value
     * @returns the pixel coordinate
     */
    getCoordinate(dataValue: number): number;
    /**
     * Converts the pixel coordinate to a Data-value.
     * Performs the inverse operation to {@link getCoordinate}
     * @param coordinate The pixel coordiante
     * @returns the data value
     */
    getDataValue(coordinate: number): number;
    /**
     * Translates a {@link NumberRange} in Data-coordinates by a specified number of pixels,
     * performing intermediate calculations from data-value to pixel and back to perform the translation
     * @param pixels The pixels to translate
     * @param range The {@link NumberRange} to translate. For example this could be an {@link AxisCore.visibleRange | Axis.visibleRange}
     * @returns The translated range
     */
    translateBy(pixels: number, range: NumberRange): NumberRange;
    /**
     * Zooms a {@link NumberRange} by a specified fractional amount
     * @param minFraction The fraction to zoom the {@link NumberRange.min} by. A fraction of 0.1 zooms the minimum by 10%
     * @param maxFraction The fraction to zoom the {@link NumberRange.max} by. A fraction of 0.1 zooms the maximum by 10%
     * @param inputRange The {@link NumberRange} to zoom
     * @returns The zoomed range
     */
    zoomTranslateBy(minFraction: number, maxFraction: number, inputRange: NumberRange): NumberRange;
    /**
     * @inheritDoc
     */
    delete(): void;
}
