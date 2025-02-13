import { Point } from "../../../../Core/Point";
import { EHorizontalTextPosition, EVerticalTextPosition } from "../../../../types/TextPosition";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { TSRTextBounds } from "../../../../types/TSciChart";
import { DataLabelProvider, IDataLabelProviderOptions } from "./DataLabelProvider";
import { DataLabelState } from "./DataLabelState";
export interface IBubbleSeriesDataLabelProviderOptions extends IDataLabelProviderOptions {
    /** Sets the horizontal Anchor point for the label.  Default Center */
    horizontalTextPosition?: EHorizontalTextPosition;
    /** Sets the vertical Anchor point for the label. Default Center */
    verticalTextPosition?: EVerticalTextPosition;
}
export declare class BubbleSeriesDataLabelProvider extends DataLabelProvider {
    readonly type: EDataLabelProviderType;
    constructor(options?: IBubbleSeriesDataLabelProviderOptions);
    getPosition(state: DataLabelState, textBounds: TSRTextBounds): Point;
}
