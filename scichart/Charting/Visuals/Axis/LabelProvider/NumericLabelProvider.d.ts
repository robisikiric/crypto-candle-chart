import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { IEngineeringPrefix } from "../../../../types/NumericFormat";
import { ILabel2DOptions, LabelProviderBase2D } from "./LabelProviderBase2D";
/**
 * The {@link NumericLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link NumericAxis} types
 */
export declare class NumericLabelProvider extends LabelProviderBase2D {
    readonly type = ELabelProviderType.Numeric;
    private engineeringPrefixProperty;
    /**
     * Creates an instance of {@link NumericLabelProvider}
     * @param options Optional parameters of type {@link ILabelOptions} used to configure the axis at instantiation time
     */
    constructor(options?: ILabel2DOptions);
    /**
     * Gets or sets the engineering prefixes to use when formatting values to text.
     * Default - `['K','M','B,'T']` for "large" prefixes, `['m','u','n','p']` for small prefixes
     * @remarks Only works when {@link ENumericFormat.Engineering} is selected
     */
    get engineeringPrefix(): IEngineeringPrefix;
    set engineeringPrefix(value: IEngineeringPrefix);
    /**
     * @inheritDoc
     */
    onBeginAxisDraw(): void;
}
