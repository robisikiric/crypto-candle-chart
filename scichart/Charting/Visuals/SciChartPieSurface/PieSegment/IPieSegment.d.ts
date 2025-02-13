import { GradientParams } from "../../../../Core/GradientParams";
import { Point } from "../../../../Core/Point";
import { TTextStyle } from "../../Axis/AxisCore";
import { SciChartPieSurface } from "../SciChartPieSurface";
import { IPieSegmentOptions } from "./PieSegment";
export interface IPieSegment {
    readonly id: string;
    text: string;
    value: number;
    oldValue: number;
    color: string;
    colorLinearGradient: GradientParams;
    isSelected: boolean;
    delta: number;
    shift: number;
    labelStyle: TTextStyle;
    labelOffset: Point;
    radiusAdjustment: number;
    /**
     * When true (default value = true) a label is shown, else false
     */
    showLabel: boolean;
    onAttach(scs: SciChartPieSurface): void;
    onDetach(): void;
    toJSON(): IPieSegmentOptions;
    getPercentage(total: number): number;
    getLabelText(total: number): string;
}
