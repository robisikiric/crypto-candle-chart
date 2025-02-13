import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart } from "../../../types/TSciChart";
import { CategoryCoordinateCalculator } from "../../Numerics/CoordinateCalculators/CategoryCoordinateCalculator";
import { FlippedCategoryCoordinateCalculator } from "../../Numerics/CoordinateCalculators/FlippedCategoryCoordinateCalculator";
import { AxisBase2D, IAxisBase2dOptions } from "./AxisBase2D";
import { ILabel2DOptions } from "./LabelProvider/LabelProviderBase2D";
export declare type TCategoryCoordCalc = CategoryCoordinateCalculator | FlippedCategoryCoordinateCalculator;
export interface ICategoryAxisBaseOptions extends IAxisBase2dOptions, ILabel2DOptions {
    /**
     * The default x values to use if no series or data is added to the chart.
     * The tick values shown will depend on the visible range, which for category axis is by index, not by value.
     * eg if you want default values [10, 20, 30, 40] you would need to set visibleRange: new NumberRange(0,3)
     * By default it will start at 0 and increment by 1, up to the size of the visible range.
     * To change the start and step set defaultXStart and defaultXStep
     */
    defaultXValues?: number[];
    /**
     * The starting value for default x values.  See defaultXValues
     */
    defaultXStart?: number;
    /**
     * The step size for default x values.  See defaultXValues
     */
    defaultXStep?: number;
}
/**
 * @summary A 2D Chart Category Axis Base type
 */
export declare abstract class CategoryAxisBase extends AxisBase2D {
    /**
     * @inheritDoc
     */
    get isCategoryAxis(): boolean;
    /**
     * The default x values to use if no series or data is added to the chart.
     * The tick values shown will depend on the visible range, which for category axis is by index, not by value.
     * eg if you want default values [10, 20, 30, 40] you would need to set visibleRange: new NumberRange(0,3)
     * By default it will start at 0 and increment by 1, up to the size of the visible range.
     * To change the start and step set defaultXStart and defaultXStep
     */
    get defaultXValues(): number[];
    /**
     * The default x values to use if no series or data is added to the chart.
     * The tick values shown will depend on the visible range, which for category axis is by index, not by value.
     * eg if you want default values [10, 20, 30, 40] you would need to set visibleRange: new NumberRange(0,3)
     * By default it will start at 0 and increment by 1, up to the size of the visible range.
     * To change the start and step set defaultXStart and defaultXStep
     */
    set defaultXValues(values: number[]);
    /**
     * The starting value for default x values.  See defaultXValues
     */
    get defaultXStart(): number;
    /**
     * The starting value for default x values.  See defaultXValues
     */
    set defaultXStart(value: number);
    /**
     * The step size for default x values.  See defaultXValues
     */
    get defaultXStep(): number;
    /**
     * The step size for default x values.  See defaultXValues
     */
    set defaultXStep(value: number);
    private defaultXValuesProperty;
    private defaultXStartProperty;
    private defaultXStepProperty;
    private defaultBaseXValues;
    /**
     * Creates an instance of a {@link CategoryAxisBase}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ICategoryAxisBaseOptions} used to configure the axis at instantiation time
     */
    constructor(webAssemblyContext: TSciChart, options?: ICategoryAxisBaseOptions);
    /**
     * @inheritDoc
     */
    prepareRenderData(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    protected getCurrentCoordinateCalculatorInternal(): TCategoryCoordCalc;
    /**
     * @inheritDoc
     */
    protected getXDataRange(): NumberRange;
    protected getMaxAutoTicks(): number;
    private generateDefaultXValuesForCategoryAxis;
    private setBaseXValues;
}
