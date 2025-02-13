import { EAxisType } from "../../../types/AxisType";
import { TSciChart } from "../../../types/TSciChart";
import { CategoryAxisBase, ICategoryAxisBaseOptions } from "./CategoryAxisBase";
export interface ICategoryAxisOptions extends ICategoryAxisBaseOptions {
}
/**
 * @summary A 2D Chart Category Axis type
 * @description A category axis uses the X-index not the X-value to measure data-points on the XAxis.
 * For example this can be used in stock chart applications to ensure weekend or overnight gaps are collapsed
 * and each data-point is spaced equidistantly
 * @remarks
 * Set a {@link CategoryAxis} on the {@link SciChartSurface.xAxes} property. This axis type is not valid for YAxis
 */
export declare class CategoryAxis extends CategoryAxisBase {
    readonly type = EAxisType.CategoryAxis;
    /**
     * Creates an instance of a {@link CategoryAxis}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ICategoryAxisOptions} used to configure the axis at instantiation time
     */
    constructor(webAssemblyContext: TSciChart, options?: ICategoryAxisOptions);
}
