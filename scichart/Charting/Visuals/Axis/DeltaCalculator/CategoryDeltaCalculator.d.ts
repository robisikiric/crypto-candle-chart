import { NumberRange } from "../../../../Core/NumberRange";
import { TSciChart } from "../../../../types/TSciChart";
import { TSciChart3D } from "../../../../types/TSciChart3D";
import { NumericDeltaCalculator } from "./NumericDeltaCalculator";
/**
 * The CategoryDeltaCalculator is responsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link CategoryAxis} types.
 */
export declare class CategoryDeltaCalculator extends NumericDeltaCalculator {
    /**
     * Creates an instance of the {@link CategoryDeltaCalculator}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    constructor(webAssemblyContext: TSciChart | TSciChart3D);
    /**
     * @inheritDoc
     */
    getDeltaFromRange(min: number, max: number, minorsPerMajor: number, maxTicks: number): NumberRange;
}
