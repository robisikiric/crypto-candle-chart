import { GradientParams } from "../../Core/GradientParams";
import { SCRTBrush } from "../../types/TSciChart";
import { BaseCache } from "./BaseCache";
import { WebGlBrush } from "./WebGlBrush";
/**
 * @ignore
 */
export declare class BrushCache extends BaseCache<WebGlBrush> {
    private fill;
    private opacity;
    private fillLinearGradient;
    private canvasTexture;
    private textureHeightRatio;
    private textureWidthRatio;
    get value(): WebGlBrush;
    /**
     * Creates or fetches a new brush with the specified params
     * @param fill
     * @param opacity
     * @param textureHeightRatio
     * @param textureWidthRatio
     * @param fillLinearGradient
     */
    create(fill: string, opacity: number, textureHeightRatio?: number, textureWidthRatio?: number, fillLinearGradient?: GradientParams): WebGlBrush;
    invalidateCache(): void;
    reset(): void;
    delete(): void;
    private createSolidBrush;
    private createGradientBrush;
    private createGradientTexture;
}
/**
 * Retrieves a native {@link WebGlBrush} Brush from the provided {@link BrushCache} cache object
 * @param BrushCache The object that stores a brush
 * @returns new or existing instance of {@link WebGlPen}}
 */
export declare const getWebGlBrushFromCache: (cache: BrushCache) => WebGlBrush;
/**
 * Retrieves a native {@link SCRTBrush} Brush from the provided {@link BrushCache} cache object.
 * The retrieved entity is a wrapper around {@link SCRTPen}
 * @param cache The object that stores a brush
 * @returns new or existing instance of {@link SCRTBrush}}
 */
export declare const getScrtBrushFromCache: (cache: BrushCache) => SCRTBrush;
/**
 * Creates a native {@link SCRTBrush} brush from html color code string passed in and caches it
 * @param cache The object that will store a brush
 * @param fill The HTML Color code
 * @param opacity The opacity factor.
 * @param textureHeightRatio The height ratio of the main canvas to the WebGl canvas.
 * @param textureWidthRatio The width ratio of the main canvas to the WebGl canvas.
 * @param fillGradientLinear The gradient params.
 * @returns new or existing instance of {@link SCRTBrush}}
 */
export declare const createBrushInCache: (cache: BrushCache, fill: string, opacity: number, textureHeightRatio?: number, textureWidthRatio?: number, fillGradientLinear?: GradientParams) => SCRTBrush;
