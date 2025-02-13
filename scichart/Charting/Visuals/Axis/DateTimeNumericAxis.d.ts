import { TSciChart } from "../../../types/TSciChart";
import { IAxisBase2dOptions } from "./AxisBase2D";
import { ISmartDateLabelProviderOptions } from "./LabelProvider/SmartDateLabelProvider";
import { NumericAxis } from "./NumericAxis";
export interface IDateTimeNumericAxisOptions extends IAxisBase2dOptions, ISmartDateLabelProviderOptions {
    possibleDeltas?: number[];
    minTicks?: number;
}
export declare class DateTimeNumericAxis extends NumericAxis {
    constructor(webAssemblyContext: TSciChart, options?: IDateTimeNumericAxisOptions);
}
