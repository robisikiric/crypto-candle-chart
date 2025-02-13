import { DeletableEntity } from "../../Core/DeletableEntity";
import { SCRTBrush } from "../../types/TSciChart";
import { EDrawingTypes } from "./constants";
import { IBrush2D } from "./IBrush2D";
/**
 * The WebGLBrush is a brush for polygon fills, rectangle fills, which can be passed to SciChart's WebGL / WebAssembly graphics engine
 */
export declare class WebGlBrush extends DeletableEntity implements IBrush2D {
    private scrtBrushProperty;
    /**
     * Creates an instance of WebGlBrush
     * @param scrtBrush the inner {@link SCRTBrush} which can be passed to SciChart's WebAssembly WebGL engine
     */
    constructor(scrtBrush: SCRTBrush);
    /**
     * Get the inner {@link SCRTBrush} which can be passed to SciChart's WebAssembly WebGL engine
     */
    get scrtBrush(): SCRTBrush;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    getBrushType(): EDrawingTypes;
    /**
     * @inheritDoc
     */
    setOpacity(opacity: number): void;
}
