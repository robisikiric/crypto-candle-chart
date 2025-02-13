import { EChart2DModifierType } from "../../types/ChartModifierType";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
/**
 * Base class for custom Chart Modifiers (allows custom zooming, panning, interaction behaviour) on 2D Charts
 */
export declare class CustomChartModifier2D extends ChartModifierBase2D {
    /**
     * @inheritDoc
     */
    readonly type: EChart2DModifierType;
    /**
     * @inheritDoc
     * @param options
     */
    constructor(options?: IChartModifierBaseOptions);
}
