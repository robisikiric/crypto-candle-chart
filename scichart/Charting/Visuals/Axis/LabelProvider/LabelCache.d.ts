import type { TTextStyle } from "../AxisCore";
import type { LabelInfo } from "./LabelProviderBase2D";
export declare type TCachedLabelStyle = TTextStyle & {
    providerId: string;
    rotation?: number;
    extras?: string;
};
/**
 * A global cache for labels, used by all labelProviders, to reduce the amount of time spent creating label textures.
 */
export declare const labelCache: {
    /** Get an identifier for the given text style.  Returns an existing identifier if a matching style exists in the cache */
    getStyleId: (style: TCachedLabelStyle) => string;
    /**
     * Notify the cache that a style is no longer used.
     * Linked labels are only deleted when there are no remaining uses, and then only after minAge has passed.
     */
    freeStyle: (styleId: string) => void;
    /** Get a label from the cache.  Returns undefined if none found. */
    getLabel: (text: string, styleId: string) => LabelInfo;
    /** Add a label to the cache */
    setLabel: (text: string, styleId: string, label: LabelInfo) => void;
    /** Check if a text style matches the one for the given id */
    checkStyle: (currentStyleId: string, newStyle: TCachedLabelStyle) => boolean;
    /** Get the maximum number of labels allowed to be stored in the cache.  Used when calling pruneCache */
    getMaxSize: () => number;
    /** Set the maximum number of labels allowed to be stored in the cache.  Used when calling pruneCache */
    setMaxSize: (size: number) => void;
    getSize: () => number;
    /** Get the minimum age (time since last used) of labels in the cache.
     * This prevents recently used labels from being pruned, or removed when style is freed
     */
    getMinAge: () => number;
    /** Set the minimum age (time since last used) of labels in the cache.
     * This prevents recently used labels from being pruned, or removed when style is freed
     */
    setMinAge: (ageInMs: number) => void;
    /** Remove old labels from the cache, if there are more than MaxSize.   */
    pruneCache: () => void;
    /** Completely clears and resets the cache.  Testing use only */
    resetCache: () => void;
};
