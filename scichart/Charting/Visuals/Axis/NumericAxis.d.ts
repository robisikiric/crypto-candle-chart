import { EAxisType } from "../../../types/AxisType";
import { TSciChart } from "../../../types/TSciChart";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { AxisBase2D, IAxisBase2dOptions } from "./AxisBase2D";
import { ILabel2DOptions } from "./LabelProvider/LabelProviderBase2D";
export interface INumericAxisOptions extends IAxisBase2dOptions, ILabel2DOptions {
}
/**
 * @summary A 2D Chart Numeric / Value Axis type
 * @description A Numeric axis uses the X-value to measure data-points on the XAxis.
 * This is contrary to a {@link CategoryAxis} which uses X-index.
 * @remarks
 * Set a {@link NumericAxis} on the {@link SciChartSurface.xAxes} or {@link SciChartSurface.yAxes} property.
 */
export declare class NumericAxis extends AxisBase2D {
    readonly type = EAxisType.NumericAxis;
    /**
     * Creates an instance of a {@link NumericAxis}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link INumericAxisOptions} used to configure the axis at instantiation time
     */
    constructor(webAssemblyContext: TSciChart, options?: INumericAxisOptions);
    /**
     * @inheritDoc
     */
    protected getCurrentCoordinateCalculatorInternal(): CoordinateCalculatorBase;
}
