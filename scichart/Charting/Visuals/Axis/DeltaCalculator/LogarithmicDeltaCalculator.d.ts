import { NumberRange } from "../../../../Core/NumberRange";
import { TSciChart } from "../../../../types/TSciChart";
import { TSciChart3D } from "../../../../types/TSciChart3D";
import { DeltaCalculator } from "./DeltaCalculator";
/**
 * The LogarithmicDeltaCalculator is responsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link LogarithmicAxis} types.
 */
export declare class LogarithmicDeltaCalculator extends DeltaCalculator {
    /**
     * Gets or sets the logarithmic base. Defaults to 10
     */
    logarithmicBase: number;
    isHighPrecisionTicks: boolean;
    private webAssemblyContext;
    /**
     * Creates an instance of the {@link LogarithmicDeltaCalculator}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    constructor(webAssemblyContext: TSciChart | TSciChart3D);
    /**
     * @inheritDoc
     */
    getDeltaFromRange(min: number, max: number, minorsPerMajor: number, maxTicks: number): NumberRange;
}
