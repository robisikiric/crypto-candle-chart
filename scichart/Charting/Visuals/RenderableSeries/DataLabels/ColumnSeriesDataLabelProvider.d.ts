import { Point } from "../../../../Core/Point";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { TSRTextBounds } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { DataLabelProvider, IDataLabelProviderOptions } from "./DataLabelProvider";
import { DataLabelState } from "./DataLabelState";
export declare enum EColumnDataLabelPosition {
    Outside = "Outside",
    Inside = "Inside",
    Position = "Position"
}
export interface IColumnSeriesDataLabelProviderOptions extends IDataLabelProviderOptions {
    /**
     * Sets whether text should be positioned outside or inside the end of the column using {@link EColumnDataLabelPosition}.
     * If Position then the {@link verticalTextPosition} property is used, or {@link horizontalTextPosition} if it is a vertical chart.
     * Default Outside
     */
    positionMode?: EColumnDataLabelPosition;
}
export declare class ColumnSeriesDataLabelProvider extends DataLabelProvider {
    readonly type: EDataLabelProviderType;
    private yAdj;
    private positionModeProperty;
    constructor(options?: IColumnSeriesDataLabelProviderOptions);
    /**
     * Sets whether text should be positioned outside or inside the end of the column using {@link EColumnDataLabelPosition}.
     * If Position then the {@link verticalTextPosition} property is used, or {@link horizontalTextPosition} if it is a vertical chart.
     * Default Outside
     */
    get positionMode(): EColumnDataLabelPosition;
    /**
     * Sets whether text should be positioned outside or inside the end of the column using {@link EColumnDataLabelPosition}.
     * If Position then the {@link verticalTextPosition} property is used, or {@link horizontalTextPosition} if it is a vertical chart.
     * Default Outside
     */
    set positionMode(value: EColumnDataLabelPosition);
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    getPosition(state: DataLabelState, textBounds: TSRTextBounds): Point;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: import("../../../..").TDataLabelStyle;
            color: string;
        };
    };
}
