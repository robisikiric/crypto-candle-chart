import { Size } from "../../types/Size";
import { TSciChart } from "../../types/TSciChart";
import { WebGlRenderContext2D } from "./WebGlRenderContext2D";
/**
 * @ignore
 */
export declare class RenderSurface {
    handleDraw: () => void;
    viewportSize: Size;
    readonly canvasId: string;
    protected renderContextProperty: WebGlRenderContext2D;
    private webAssemblyContext;
    constructor(webAssemblyContext: TSciChart, size: Size, canvasId: string);
    getRenderContext(): WebGlRenderContext2D;
    invalidateElement(canvasId: string): void;
    onRenderTimeElapsed(): void;
}
