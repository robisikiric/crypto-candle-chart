import { DeletableEntity } from "../../../../Core/DeletableEntity";
import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { ENumericFormat } from "../../../../types/NumericFormat";
import { AxisCore } from "../AxisCore";
export interface ILabelOptions {
    /** The formating mode to apply to the value.  */
    labelFormat?: ENumericFormat;
    labelPrecision?: number;
    cursorLabelFormat?: ENumericFormat;
    cursorLabelPrecision?: number;
    labelPrefix?: string;
    labelPostfix?: string;
}
/**
 * Formats a data-value into a string for display
 * @param dataValue The data-value (e.g. a numeric value)
 */
export declare type TFormatLabelFn = (dataValue: number) => string;
/**
 * @summary A base class for Label Providers - types which allow programmatic overriding of Axis labels
 */
export declare abstract class LabelProvider extends DeletableEntity {
    abstract readonly type: ELabelProviderType | string;
    /**
     * The parent {@link AxisCore}. This will be set once {@link attachedToAxis} is called
     */
    parentAxis: AxisCore;
    protected formatLabelProperty: TFormatLabelFn;
    protected formatCursorLabelProperty: TFormatLabelFn;
    private numericFormatProperty;
    private precisionProperty;
    private cursorNumericFormatProperty;
    private cursorPrecisionProperty;
    private prefixProperty;
    private postfixProperty;
    /**
     *
     */
    constructor(options?: ILabelOptions);
    /**
     * Called when the {@link LabelProvider} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    attachedToAxis(axis: AxisCore): void;
    /**
     * Called when the {@link LabelProvider} is detached from an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    detachedFromAxis(): void;
    /**
     * Called once when an axis drawing pass begins. Use this method to do one-time setup
     */
    abstract onBeginAxisDraw(): void;
    /**
     * Gets or sets numeric format to use. For a list of values, see {@link ENumericFormat}
     */
    get numericFormat(): ENumericFormat;
    set numericFormat(value: ENumericFormat);
    /**
     * Gets or sets the precision to use when formatting
     */
    get precision(): number;
    set precision(value: number);
    /**
     * Gets or sets numeric format to use for cursor labels. For a list of values, see {@link ENumericFormat}
     */
    get cursorNumericFormat(): ENumericFormat;
    set cursorNumericFormat(value: ENumericFormat);
    /**
     * Gets or sets the precision to use for cursors labels
     */
    get cursorPrecision(): number;
    set cursorPrecision(value: number);
    /**
     * Gets or sets a string to add to the beginning of each label
     */
    get prefix(): string;
    set prefix(v: string);
    /**
     * Gets or sets a string to add to the end of each label
     */
    get postfix(): string;
    set postfix(v: string);
    /**
     * Gets or sets a formatLabel function which is used for
     * formatting a data-value into a string for display on the axis labels.
     * If you are creating a custom LabelProvider, you should override formatLabelProperty, not the formatLabel property!
     * See our {@link https://www.scichart.com/javascript-chart-documentation Documentation}
     */
    get formatLabel(): TFormatLabelFn;
    set formatLabel(value: TFormatLabelFn);
    /**
     * Gets or sets a formatCursorLabel function which is used for
     * formatting a data-value into a string for display on a cursor or tooltip
     * If you are creating a custom LabelProvider, you should override formatCursorLabelProperty,
     * not the formatCursorLabel property!
     * See our {@link https://www.scichart.com/javascript-chart-documentation Documentation}
     */
    get formatCursorLabel(): TFormatLabelFn;
    set formatCursorLabel(value: TFormatLabelFn);
    applyFormat(value: string): string;
    toJSON(): {
        type: string;
        options: Required<Omit<ILabelOptions, never>>;
    };
    protected invalidateParent(): void;
}
