import { WebGlRenderContext2D } from "./WebGlRenderContext2D";
export declare class BatchRenderContext extends WebGlRenderContext2D {
    doDraw: boolean;
    drawLayers(): void;
    endFonts(force?: boolean): void;
}
