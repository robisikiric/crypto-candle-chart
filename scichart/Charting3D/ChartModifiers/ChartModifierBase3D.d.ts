import { ChartModifierBase, EModifierType } from "../../Charting/ChartModifiers/ChartModifierBase";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { EExecuteOn } from "../../types/ExecuteOn";
import { SciChart3DSurface } from "../Visuals/SciChart3DSurface";
export interface IChartModifierBase3DOptions {
    /**
     * A unique Id for the {@link ChartModifierBase3D}
     */
    id?: string;
    /**
     * Defines the operation that modifier should respond to
     */
    executeOn?: EExecuteOn;
}
/**
 * Defines a base class to a ChartModifier3D - a class which provides Zoom, Pan, Tooltip or interaction behavior
 * to SciChart - High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
export declare abstract class ChartModifierBase3D extends ChartModifierBase<SciChart3DSurface> {
    /**
     * The type of chartmodifier. See {@link EChart3DModifierType} for available options
     */
    abstract readonly type: EChart3DModifierType | string;
    protected typeMap: Map<string, string>;
    /**
     * Creates an instance of a {@link ChartModifierBase3D}
     * @param options Optional parameters of type {@link IChartModifierBase3DOptions} used to configure the modifier
     */
    constructor(options?: IChartModifierBase3DOptions);
    /**
     * @inheritDoc
     */
    get modifierType(): EModifierType;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBase3DOptions, never>>;
    };
}
