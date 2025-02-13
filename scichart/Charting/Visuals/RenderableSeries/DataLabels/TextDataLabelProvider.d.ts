import { Point } from "../../../../Core/Point";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { BaseDataLabelProvider, IBaseDataLabelProviderOptions, TDataLabel } from "./BaseDataLabelProvider";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { DataLabelState } from "./DataLabelState";
import { EHorizontalTextPosition, EVerticalTextPosition } from "../../../../types/TextPosition";
import { TSRTextBounds } from "../../../../types/TSciChart";
import { TDataLabelStyle } from "../../../../types/TDataLabelStyle";
export interface ITextDataLabelProviderOptions extends IBaseDataLabelProviderOptions {
    /**
     * If you want to be able to look at the position and size of labels before they are drawn, set this true
     * otherwise it is faster to leave it false.
     */
    calculateTextBounds?: boolean;
    /** Sets the horizontal text position for the label */
    horizontalTextPosition?: EHorizontalTextPosition;
    /** Sets the vertical text position for the label */
    verticalTextPosition?: EVerticalTextPosition;
    /** Flag to enable/disable dataLabel generation.  Default true */
    isEnabled?: boolean;
}
/**
 * A DataLabelProvider sepcifically designed to work with {@link FastTextRenderableSeries } or any series that uses an {@link XYTextDataSeries }
 * Text is taken directly from the textValues on the dataSeries and placed at the x,y coordinates (anchored top, left)
 */
export declare class TextDataLabelProvider extends BaseDataLabelProvider {
    type: EDataLabelProviderType;
    /**
     * This default false for maximum performance.  It will be true if you set the textPosition to something other than Above, Right.
     * You can force it true if you want to make use of the text sizes in onAfterGenerate
     */
    calculateTextBounds: boolean;
    protected horizontalTextPositionProperty: EHorizontalTextPosition;
    protected verticalTextPositionProperty: EVerticalTextPosition;
    protected isEnabledProperty: boolean;
    constructor(options?: ITextDataLabelProviderOptions);
    /**
     * Gets or sets the horizontal text position for the label
     * For more control, override getPosition
     */
    get horizontalTextPosition(): EHorizontalTextPosition;
    set horizontalTextPosition(value: EHorizontalTextPosition);
    /**
     * Gets or sets the vertical text position for the label
     * For more control, override getPosition
     */
    get verticalTextPosition(): EVerticalTextPosition;
    set verticalTextPosition(value: EVerticalTextPosition);
    /** Flag to enable/disable dataLabel generation.  Default true */
    get isEnabled(): boolean;
    /** Flag to enable/disable dataLabel generation.  Default true */
    set isEnabled(value: boolean);
    getPosition(state: DataLabelState, textBounds: TSRTextBounds): Point;
    getColor(state: DataLabelState, text: string): number;
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /** Called after labels are generated but before they are drawn. */
    onAfterGenerate(dataLabels: TDataLabel[]): void;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: TDataLabelStyle;
            color: string;
        };
    };
}
