import { SCRTRectVertex, TSciChart } from "../../../types/TSciChart";
/**
 * Helper function to create a {@link SCRTRectVertex} native rectangle vertex
 * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param xTopLeft
 * @param yTopLeft
 * @param xBottomRight
 * @param yBottomRight
 */
export declare const createNativeRect: (webAssemblyContext: TSciChart, xTopLeft: number, yTopLeft: number, xBottomRight: number, yBottomRight: number) => SCRTRectVertex;
