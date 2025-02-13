import { EChart3DModifierType } from "../../types/ChartModifierType";
import { ChartModifierBase3D, IChartModifierBase3DOptions } from "./ChartModifierBase3D";
/**
 * Base class for custom Chart Modifiers (allows custom zooming, panning, interaction behaviour) on 2D Charts
 */
export declare class CustomChartModifier3D extends ChartModifierBase3D {
    /**
     * @inheritDoc
     */
    readonly type: EChart3DModifierType;
    /**
     * @inheritDoc
     * @param options
     */
    constructor(options?: IChartModifierBase3DOptions);
}
