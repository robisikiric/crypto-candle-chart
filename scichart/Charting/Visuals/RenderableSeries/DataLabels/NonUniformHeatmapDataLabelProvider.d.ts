import { Point } from "../../../../Core/Point";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { Size } from "../../../../types/Size";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { HeatMapDataLabelProvider } from "./HeatMapDataLabelProvider";
export declare class NonUniformHeatMapDataLabelProvider extends HeatMapDataLabelProvider {
    readonly type: EDataLabelProviderType;
    cellSizeThresholdCoefficient: number;
    getPosition(xIndex: number, yIndex: number, xVal: number, yVal: number, textSize: Size, cellWidth: number, cellHeight: number, renderPassData: RenderPassData): Point;
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
}
