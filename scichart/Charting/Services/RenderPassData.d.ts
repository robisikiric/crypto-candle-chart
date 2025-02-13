import { NumberRange } from "../../Core/NumberRange";
import { IPointSeries } from "../Model/PointSeries/IPointSeries";
import { CoordinateCalculatorBase } from "../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
/**
 * @summary RenderPassData contains properties which are passed to {@link BaseRenderableSeries} at the time of drawing
 */
export declare class RenderPassData {
    readonly indexRange: NumberRange;
    readonly getxCoordinateCalculator: () => CoordinateCalculatorBase;
    readonly getyCoordinateCalculator: () => CoordinateCalculatorBase;
    readonly isVerticalChart: boolean;
    readonly pointSeries?: IPointSeries;
    readonly resamplingHash?: number;
    /**
     * Creates an instance of RenderPassData
     * @param indexRange The min and max index to data-range currently visible on the {@link SciChartSurface}
     * @param getxCoordinateCalculator A function to get the XAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     * @param getyCoordinateCalculator A function to get the YAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     * @param isVerticalChart A flag indicating if the chart is currently vertically arranged (XAxis on the left, YAxis on the top/bottom)
     * @param pointSeries The point series
     * @param resamplingHash The resampling hash value, used for caching
     */
    constructor(indexRange: NumberRange, getxCoordinateCalculator: () => CoordinateCalculatorBase, getyCoordinateCalculator: () => CoordinateCalculatorBase, isVerticalChart: boolean, pointSeries?: IPointSeries, resamplingHash?: number);
    /**
     * Get the XAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     */
    get xCoordinateCalculator(): CoordinateCalculatorBase;
    /**
     * Get the YAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     */
    get yCoordinateCalculator(): CoordinateCalculatorBase;
}
