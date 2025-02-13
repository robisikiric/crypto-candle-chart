import { CoordinateCalculatorBase } from "../../../Charting/Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { TEasingFn } from "../../../Core/Animations/EasingFunctions";
import { NumberRange } from "../../../Core/NumberRange";
import { EAxisType } from "../../../types/AxisType";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { AxisBase3D, IAxisBase3dOptions } from "./AxisBase3D";
interface INumericAxis3dOptions extends IAxisBase3dOptions {
    /**
     * @deprecated use labelPrecision instead
     */
    precision?: number;
}
/**
 * @summary A 3D Chart Numeric / Value Axis type
 * @description A Numeric axis uses the X-value to measure data-points on the XAxis. The axis can represent
 * both numbers and dates using text-formatting
 * @remarks
 * Set a {@link NumericAxis3D} on the {@link SciChart3DSurface.xAxis}, {@link SciChart3DSurface.yAxis} or {@link SciChart3DSurface.zAxis} property.
 */
export declare class NumericAxis3D extends AxisBase3D {
    /**
     * @inheritDoc
     */
    readonly type: EAxisType;
    /**
     * Creates an instance of a {@link NumericAxis3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link INumericAxis3dOptions} to configure the axis
     */
    constructor(webAssemblyContext: TSciChart3D, options?: INumericAxis3dOptions);
    /**
     * @inheritDoc
     */
    getDefaultNonZeroRange(): NumberRange;
    /**
     * @inheritDoc
     */
    animateVisibleRange(visibleRange: NumberRange, durationMs: number, easingFunction?: TEasingFn, onCompleted?: () => void): import("../../..").IGenericAnimation;
    /**
     * @inheritDoc
     */
    protected getCurrentCoordinateCalculatorInternal(): CoordinateCalculatorBase;
}
export {};
