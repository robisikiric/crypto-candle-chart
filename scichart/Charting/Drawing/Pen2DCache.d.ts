import { SCRTPen } from "../../types/TSciChart";
import { BaseCache } from "./BaseCache";
import { WebGlPen } from "./WebGlPen";
export interface IPenOptions {
    /**
     * The stroke for the {@link SCRTPen}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    stroke: string;
    /**
     * The strokeThickness for the {@link SCRTPen}
     */
    strokeThickness?: number;
    /**
     * The strokeDashArray for the {@link SCRTPen}
     */
    strokeDashArray?: number[];
    /**
     * The opacity for the {@link SCRTPen}
     * @remarks Acceptable values 0.0 - 1.0
     */
    opacity?: number;
    /**
     * The antiAliased flag for the {@link SCRTPen}
     */
    antiAliased?: boolean;
}
/**
 * @ignore
 */
export declare class Pen2DCache extends BaseCache<WebGlPen> {
    private stroke;
    private opacity;
    private strokeThickness;
    private adjustedStrokeThickness;
    private strokeDashArray;
    private adjustedStrokeDashArray;
    private antiAliased;
    get value(): WebGlPen;
    /**
     * Creates or fetches a new pen with the specified color string, stroke thickness and antialiased property
     * @param options
     */
    create(options: IPenOptions): WebGlPen;
}
/**
 * Retrieves a native {@link WebGlPen} Pen from the provided {@link Pen2DCache} cache object.
 * The retrieved entity is a wrapper around {@link SCRTPen}
 * @param penCache The object that stores a pen
 * @returns the new or existing instance of {@link WebGlPen}}
 */
export declare const getWebGlPenFromCache: (penCache: Pen2DCache) => WebGlPen;
/**
 * Retrieves a native {@link SCRTPen} Pen from the provided {@link Pen2DCache} cache object
 * @param penCache The object that stores a pen
 * @returns the new or existing instance of {@link SCRTPen}}
 */
export declare const getScrtPenFromCache: (penCache: Pen2DCache) => SCRTPen;
/**
 * Creates a native {@link SCRTPen} Pen from html color code string passed in and caches it
 * @param penCache The object that will store a pen
 * @param stroke The HTML Color code
 * @param strokeThickness The strokethickness in pixels
 * @param opacity The opacity factor
 * @param strokeDashArray the StrokeDashArray which defines any dash e.g. [2,2] means dash for 2pts, gap for 2pts (or undefined = solid line).
 * @returns the new or existing instance of {@link SCRTPen}}
 */
export declare const createPenInCache: (penCache: Pen2DCache, stroke: string, strokeThickness: number, opacity: number, strokeDashArray?: number[], antiAliased?: boolean) => SCRTPen;
