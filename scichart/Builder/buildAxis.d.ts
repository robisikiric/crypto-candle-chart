import { AxisBase2D } from "../Charting/Visuals/Axis/AxisBase2D";
import { ICategoryAxisOptions } from "../Charting/Visuals/Axis/CategoryAxis";
import { IDateTimeNumericAxisOptions } from "../Charting/Visuals/Axis/DateTimeNumericAxis";
import { ILabelOptions } from "../Charting/Visuals/Axis/LabelProvider/LabelProvider";
import { ITextLabelOptions } from "../Charting/Visuals/Axis/LabelProvider/TextLabelProvider";
import { ILogarithmicAxisOptions } from "../Charting/Visuals/Axis/LogarithmicAxis";
import { INumericAxisOptions } from "../Charting/Visuals/Axis/NumericAxis";
import { EAxisType } from "../types/AxisType";
import { ELabelProviderType } from "../types/LabelProviderType";
import { TSciChart } from "../types/TSciChart";
/** Definition of an {@link AxisBase2D}, comprising a {@link EAxisType} and the relevant options  */
export declare type TAxisDefinition = {
    type: EAxisType.NumericAxis;
    options?: INumericAxisOptions;
} | {
    type: EAxisType.LogarithmicAxis;
    options?: ILogarithmicAxisOptions;
} | {
    type: EAxisType.CategoryAxis;
    options?: ICategoryAxisOptions;
} | {
    type: EAxisType.DateTimeNumericAxis;
    options?: IDateTimeNumericAxisOptions;
};
/** Definition of a {@link LabelProviderBase2D}, comprising a {@link ELabelProviderType} and the relevant options  */
export declare type TLabelProviderDefinition = {
    type: ELabelProviderType.Numeric;
    options?: ILabelOptions;
} | {
    type: ELabelProviderType.Date;
    options?: ILabelOptions;
} | {
    type: ELabelProviderType.Logarithmic;
    options?: ILabelOptions;
} | {
    type: ELabelProviderType.SmartDate;
    options?: {};
} | {
    type: ELabelProviderType.Text;
    options?: ITextLabelOptions;
} | {
    type: ELabelProviderType.Pie;
    options?: ILabelOptions;
};
/**
 * Build one or more axes from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition One or an array of {@link TAxisDefinition}
 * @returns An array of {@link AxisBase2D}.
 */
export declare const buildAxes: (wasmContext: TSciChart, definition: TAxisDefinition | TAxisDefinition[]) => AxisBase2D[];
