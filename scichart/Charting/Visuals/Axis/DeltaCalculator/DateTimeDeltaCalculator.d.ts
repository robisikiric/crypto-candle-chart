import { NumberRange } from "../../../../Core/NumberRange";
import { TSciChart } from "../../../../types/TSciChart";
import { TSciChart3D } from "../../../../types/TSciChart3D";
import { NumericDeltaCalculator } from "./NumericDeltaCalculator";
export interface IDeltaCalculatorOptions {
    possibleDeltas?: number[];
    minTicks?: number;
}
/**
 * The DateTimeDeltaCalculator is respinsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link NumericAxis} types.
 */
export declare class DateTimeDeltaCalculator extends NumericDeltaCalculator {
    private possibleDeltasProperty;
    private minTicksProperty;
    private prevIndex;
    private currIndex;
    constructor(webAssemblyContext: TSciChart | TSciChart3D, options?: IDeltaCalculatorOptions);
    /**
     * Gets or sets deltas array
     */
    get possibleDeltas(): number[];
    set possibleDeltas(value: number[]);
    get minTicks(): number;
    set minTicks(value: number);
    /**
     * @inheritDoc
     */
    getDeltaFromRange(min: number, max: number, minorsPerMajor: number, maxTicks: number): NumberRange;
}
