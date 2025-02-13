import { DeletableEntity } from "../../Core/DeletableEntity";
import { SCRTPen } from "../../types/TSciChart";
import { EDrawingTypes } from "./constants";
import { IPen2D } from "./IPen2D";
/**
 * The WebGlPen is a pen for polygon stroke, line strokes, which can be passed to SciChart's WebGL / WebAssembly graphics engine
 */
export declare class WebGlPen extends DeletableEntity implements IPen2D {
    private scrtPenProperty;
    private originalColor;
    /**
     * Creates an instance of WebGlPen
     * @param scrtPen the inner {@link SCRTPen} which can be passed to SciChart's WebAssembly WebGL engine
     * @param originalColor the original color which is used to change the opacity
     */
    constructor(scrtPen: SCRTPen, originalColor?: number);
    /**
     * the inner {@link SCRTPen} which can be passed to SciChart's WebAssembly WebGL engine
     */
    get scrtPen(): SCRTPen;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    getPenType(): EDrawingTypes;
    /**
     * @inheritDoc
     */
    setOpacity(opacity: number): void;
}
