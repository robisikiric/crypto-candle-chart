import { IDeletable } from "../../../Core/IDeletable";
import { TSciChart, TSRTexture } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { DeletableEntity } from "../../../Core/DeletableEntity";
/**
 * @summary The {@link CanvasTexture} is used internally to map an {@link HTMLCanvasElement} to a WebGL Texture.
 * Use this when you want to create a WebGL texture and draw on it.
 * @remarks
 * To use a canvas texture, declare one, draw on the HTML canvas, then call {@link CanvasTexture.copyTexture}.
 * Code example below
 * ```ts
 * // Create a canvasTexture
 * const canvasTexture = new CanvasTexture(wasmContext, width, height);
 * canvasTexture.clear();
 *
 * // do some drawing with html5Context
 * const html5Context = canvasTexture.getContext();
 * // todo - your drawing here
 *
 * // Copy and get the texture
 * canvasTexture.copyTexture();
 * const webAssemblyTexture: TSRTexture = canvasTexture.getTexture();
 *
 * // After use, delete the CanvasTexture
 * canvasTexture.delete();
 * ```
 */
export declare class CanvasTexture extends DeletableEntity implements IDeletable {
    readonly width: number;
    readonly height: number;
    canvas: HTMLCanvasElement;
    private intermediateVector;
    private originalIntermediateVector;
    private tsrTextureCache;
    private wasmContext;
    /**
     * Creates an instance of a {@link CanvasTexture}
     * @remarks
     * The {@link CanvasTexture} implements {@link IDeletable}, and must be manually deleted to free WebAssembly / native memory
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param textureWidth The width of the texture
     * @param textureHeight The height of the texture
     * @param useInterpolation The flat determines whether to useInterpolation when creating texture
     */
    constructor(webAssemblyContext: TSciChart | TSciChart3D, textureWidth: number, textureHeight: number);
    /**
     * Get an HTML5 {@link CanvasRenderingContext2D} to draw on.
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * Get the SciChart WebAssembly / WebGL {@link TSRTexture | Texture}
     */
    getTexture(): TSRTexture;
    /**
     * Clears the texture and the canvas
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * After you have finished drawing, copy the canvas to the destination {@link TSRTexture}
     */
    copyTexture(): void;
    applyOpacity(opacity: number): void;
}
