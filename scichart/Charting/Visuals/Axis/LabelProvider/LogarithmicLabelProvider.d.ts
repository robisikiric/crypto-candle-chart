import { ILabelOptions } from "./LabelProvider";
import { NumericLabelProvider } from "./NumericLabelProvider";
/**
 * The {@link LogarithmicLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link LogarithmicAxis} types
 */
export declare class LogarithmicLabelProvider extends NumericLabelProvider {
    logarithmicBase: number;
    /**
     * Creates an instance of {@link LogarithmicLabelProvider}
     * @param options Optional parameters of type {@link ILabelOptions} used to configure the axis at instantiation time
     */
    constructor(options?: ILabelOptions);
}
