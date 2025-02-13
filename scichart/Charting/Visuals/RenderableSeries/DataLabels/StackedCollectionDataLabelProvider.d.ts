import { BaseDataLabelProvider } from "./BaseDataLabelProvider";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
export declare class StackedCollectionDataLabelProvider extends BaseDataLabelProvider {
    constructor();
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    draw(renderContext: WebGlRenderContext2D): void;
}
