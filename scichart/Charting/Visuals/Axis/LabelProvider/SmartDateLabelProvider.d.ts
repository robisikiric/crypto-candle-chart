import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { ENumericFormat } from "../../../../types/NumericFormat";
import { LabelProviderBase2D, ILabel2DOptions } from "./LabelProviderBase2D";
export declare enum ETradeChartLabelFormat {
    MilliSeconds = "MilliSeconds",
    Seconds = "Seconds",
    Minutes = "Minutes",
    Days = "Days",
    Months = "Months"
}
export interface ISmartDateLabelProviderOptions extends ILabel2DOptions {
    /**
     * Sets whether the first label should be formatted using the wider format (eg Month Day).
     * If false the wider format will only be used when it changes (eg day/month boundary)
     */
    showWiderDateOnFirstLabel?: boolean;
    /**
     * Sets whether the year should be shown in the wider format used on first label.  Default false.
     */
    showYearOnWiderDate?: boolean;
    /**
     * A timestamp in seconds to add to the value being formatted.  This allows you to plot dates with more than millisecond precision
     * but still show a full date with year on the axis
     */
    dateOffset?: number;
}
/**
 * The {@link SmartDateLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link NumericAxis} types
 */
export declare class SmartDateLabelProvider extends LabelProviderBase2D {
    readonly type = ELabelProviderType.SmartDate;
    textVariesForSameTick: boolean;
    private prevValue;
    private prevPrevValue;
    protected format: ETradeChartLabelFormat | string;
    private showWiderDateOnFirstLabelProperty;
    private showYearOnWiderDateProperty;
    private dateOffsetProperty;
    protected firstLabel: boolean;
    /**
     * Creates an instance of {@link SmartDateLabelProvider}
     */
    constructor(options?: ISmartDateLabelProviderOptions);
    /**
     * Gets or Sets whether the first label should be formatted using the wider format (eg Month Day or Month Day Year if {@link showYearOnWiderDate}).
     * If false the wider format will only be used when it changes (eg day/month boundary)
     */
    get showWiderDateOnFirstLabel(): boolean;
    /**
     * Gets or Sets whether the first label should be formatted using the wider format (eg Month Day or Month Day Year if {@link showYearOnWiderDate}).
     * If false the wider format will only be used when it changes (eg day/month boundary).
     */
    set showWiderDateOnFirstLabel(value: boolean);
    /**
     * A timestamp in seconds to add to the value being formatted.  This allows you to plot dates with more than millisecond precision
     * but still show a full date with year on the axis
     */
    get dateOffset(): number;
    /**
     * A timestamp in seconds to add to the value being formatted.  This allows you to plot dates with more than millisecond precision
     * but still show a full date with year on the axis
     */
    set dateOffset(value: number);
    /**
     * Gets or Sets whether the year should be shown in the wider format used on first label. Default false.
     */
    get showYearOnWiderDate(): boolean;
    /**
     * Gets or Sets whether the year should be shown in the wider format used on first label. Default false.
     */
    set showYearOnWiderDate(value: boolean);
    /**
     * @inheritDoc
     */
    onBeginAxisDraw(): void;
    /**
     * @inheritDoc
     */
    getLabels(majorTicks: number[]): string[];
    /** @inheritDoc */
    get numericFormat(): ENumericFormat;
    /** @inheritDoc */
    set numericFormat(value: ENumericFormat);
    /** Format the value in a wider format, for the first label, and when the wider formated value would change */
    protected formatDateWide(labelRange: ETradeChartLabelFormat | string, value: number): string;
    /** Format the value using precise format */
    protected formatDatePrecise(labelRange: ETradeChartLabelFormat | string, value: number): string;
    /** This method is bound to the formatLabel method of the base labelProvider.
     * It calls formatSmartLabel if a format has been set by getLabelRange
     */
    protected doFormat(dataValue: number): string;
    /** Return a range string, based on the numeric range of the axis.  This will be used to choose which formatting to use */
    protected getLabelRange(timeRange: number, ticksNumber: number): ETradeChartLabelFormat | string;
    /** Decide whether to format wide or precise, based on the range string, the current value and the two previous values
     * value has the dateOffset added.  originalValue is the actual value of the tick */
    protected formatSmartLabel(tradeChartLabelFormat: ETradeChartLabelFormat | string, value: number, prevValue: number, prevPrevValue: number, originalValue?: number): string;
}
