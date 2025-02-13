import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { ILabelOptions } from "./LabelProvider";
import { LabelProviderBase2D } from "./LabelProviderBase2D";
/**
 * The {@link DateLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link CategoryAxis} types
 */
export declare class DateLabelProvider extends LabelProviderBase2D {
    readonly type = ELabelProviderType.Date;
    /**
     * Creates an instance of {@link DateLabelProvider}
     * @param options Optional parameters of type {@link ILabelOptions} used to configure the axis at instantiation time
     */
    constructor(options?: ILabelOptions);
    /**
     * @inheritDoc
     */
    onBeginAxisDraw(): void;
}
