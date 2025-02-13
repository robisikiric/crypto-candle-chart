import { IDeletable } from "../../Core/IDeletable";
import { TSciChartSurfaceCanvases } from "../../types/TSciChartSurfaceCanvases";
import { ISciChartSurfaceBase } from "./SciChartSurfaceBase";
declare enum ECanvasType {
    canvasWebGL = 0,
    canvas2D = 1,
    svg = 2
}
export declare enum ELayerClass {
    DIV_ROOT = "div-root",
    SVG_ROOT = "svg-root",
    BACK_DIV_ROOT = "back-div-root",
    FRONT_DIV_ROOT = "front-div-root",
    BACK_SVG_ROOT = "back-svg-root",
    FRONT_SVG_ROOT = "front-svg-root",
    ADORNER_SVG_ROOT = "adorner-svg-root",
    CANVAS_ROOT = "canvas-root"
}
export declare const createSvgLayer: (id: string, width: number, height: number) => SVGSVGElement;
declare const sciChartInitCommon: {
    checkChartDivExists: (divElement: string | HTMLDivElement) => void;
    ECanvasType: typeof ECanvasType;
    getCanvas2dId: (divElementId: string) => string;
    initCanvas: (divElement: string | HTMLDivElement, aspectWidth: number, aspectHeight: number, activeCanvas?: ECanvasType, disableAspect?: boolean, touchAction?: string) => TSciChartSurfaceCanvases;
    subscribeToResize: (chartRoot: HTMLDivElement, aspect: number, sciChartSurface: ISciChartSurfaceBase, disableAspect?: boolean) => IDeletable;
};
export default sciChartInitCommon;
