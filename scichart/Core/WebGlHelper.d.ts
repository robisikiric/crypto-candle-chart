/**
 * Enum constants returned by {@link WebGlHelper.getWebGlSupport}
 */
export declare enum EWebGLSupport {
    WebGL2 = "WebGL 2",
    WebGL1 = "WebGL 1",
    NoWebGL = "No WebGL support"
}
/**
 * Helper class to extract WebGL1/2 detection and context creation
 */
export declare class WebGlHelper {
    /**
     * Static initializer function. Is called once by the framework on startup
     */
    static initialize(): void;
    /**
     * Gets the WebGL support by the browser. See {@link EWebGLSupport} for options
     */
    static getWebGlSupport(): EWebGLSupport;
    /**
     * Calls canvas.getContext() passing in "webgl" or "webgl2" depending on current browser WebGL Support.
     * @param canvas
     * @param options
     */
    static getContext(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): WebGLRenderingContext | null;
    private static webGlSupport;
    private static initialized;
}
