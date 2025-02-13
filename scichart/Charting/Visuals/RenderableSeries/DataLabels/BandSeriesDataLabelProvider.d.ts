import { Point } from "../../../../Core/Point";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { TSRTextBounds } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { DataLabelState } from "./DataLabelState";
import { ILineSeriesDataLabelProviderOptions, LineSeriesDataLabelProvider } from "./LineSeriesDataLabelProvider";
export interface IBandSeriesDataLabelProviderOptions extends ILineSeriesDataLabelProviderOptions {
    /**
     * Sets whether to render a single label with both y and y1 values, in the center of the band, or separate labels for each line.
     * Default false.
     */
    singleLabel?: boolean;
}
export declare class BandSeriesDataLabelProvider extends LineSeriesDataLabelProvider {
    readonly type: EDataLabelProviderType;
    protected state1: DataLabelState;
    private singleLabelProperty;
    constructor(options?: IBandSeriesDataLabelProviderOptions);
    /**
     * Gets or Sets whether to render a single label with both y and y1 values, in the center of the band, or separate labels for each line.
     * Default false.
     */
    get singleLabel(): boolean;
    set singleLabel(value: boolean);
    getText(state: DataLabelState): string;
    getSingleLabelText(xVal: number, yVal: number, y1Val: number): string;
    getPosition(state: DataLabelState, textBounds: TSRTextBounds): Point;
    /**
     * When doing separate labels for each line (ie singleLabel = false) this is used to create a provider to generate the labels for the y1 series.
     * By default this creates a LineSeriesDataLabelProvider using the same options as on the current provider.
     */
    getY1Provider(yProvider: BandSeriesDataLabelProvider): LineSeriesDataLabelProvider;
    /** Generates labels using getText, getPosition, getColor.  Overrides manually set labels. */
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: import("../../../..").TDataLabelStyle;
            color: string;
        };
    };
}
