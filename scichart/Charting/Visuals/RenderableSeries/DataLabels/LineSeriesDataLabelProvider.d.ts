import { Point } from "../../../../Core/Point";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { TSRTextBounds } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { DataLabelProvider, IDataLabelProviderOptions } from "./DataLabelProvider";
import { DataLabelState } from "./DataLabelState";
export interface ILineSeriesDataLabelProviderOptions extends IDataLabelProviderOptions {
    /**
     * Sets whether text should be positioned above the line if it is going down, and below the line if it going up.
     * Default true.  When true this overrides horizontalAnchorPoint and verticalAnchorPoint to be left, bottom.
     */
    aboveBelow?: boolean;
}
export declare class LineSeriesDataLabelProvider extends DataLabelProvider {
    readonly type: EDataLabelProviderType;
    private yAdj;
    private aboveBelowProperty;
    constructor(options?: ILineSeriesDataLabelProviderOptions);
    /**
     * Gets or Sets whether text should be positioned above the line if it is going down, and below the line if it going up.
     * Default true.  When true this overrides horizontalAnchorPoint and verticalAnchorPoint to be left, bottom.
     */
    get aboveBelow(): boolean;
    set aboveBelow(value: boolean);
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
