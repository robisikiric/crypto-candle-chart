import { IThemeProvider } from "../Themes/IThemeProvider";
/**
 * Defines the interface to a loader - a class which adds HTML/DOM elements when the {@link SciChartSurface}
 * or {@link SciChart3DSurface} is loading webassembly
 * @example
 * ```ts
 * // Define a class which implements ISciChartLoader
 * class CustomChartLoader implements ISciChartLoader {
 *    public addChartLoader(domChartRoot: HTMLDivElement, theme: IThemeProvider): HTMLElement {
 *       const loaderContainerDiv = document.createElement("div");
 *       loaderContainerDiv.style.backgroundColor = theme.loadingAnimationBackground;
 *       loaderContainerDiv.style.height = "100%";
 *       loaderContainerDiv.style.width = "100%";
 *       const loaderText = document.createElement("p");
 *       loaderText.innerHTML = "Loading SciChart...";
 *       loaderText.style.color = theme.loadingAnimationForeground;
 *       loaderText.style.fontFamily = "Arial";
 *       loaderText.style.margin = "0";
 *       loaderText.style.padding = "50px";
 *       loaderContainerDiv.appendChild(loaderText);
 *       domChartRoot.appendChild(loaderContainerDiv);
 *       return loaderContainerDiv;
 *    }
 *
 *    public removeChartLoader(domChartRoot: HTMLDivElement, loaderElement: HTMLElement): void {
 *       domChartRoot.removeChild(loaderElement);
 *    }
 * }
 *
 * // Pass the class to the SciChartSurface.create() function
 * SciChartSurface.create("elementId", { loader: new CustomChartLoader(); });
 * ```
 */
export interface ISciChartLoader {
    /** The type name of the loader.  For Chart builder and serialization */
    type: string;
    /**
     * Called when a chart loader is added to the DOM.
     * @param domChartRoot The root {@link HTMLDivElement} that makes up this {@link SciChartSurface} or {@link SciChart3DSurface}
     * @param theme The theme applied to the {@link SciChartSurface} or {@link SciChart3DSurface}
     * @example
     * ```ts
     * public addChartLoader(domChartRoot: HTMLDivElement, theme: IThemeProvider): HTMLElement {
     *    const loaderContainerDiv = document.createElement("div");
     *    loaderContainerDiv.style.backgroundColor = theme.loadingAnimationBackground;
     *    loaderContainerDiv.style.height = "100%";
     *    loaderContainerDiv.style.width = "100%";
     *    const loaderText = document.createElement("p");
     *    loaderText.innerHTML = "Loading SciChart...";
     *    loaderText.style.color = theme.loadingAnimationForeground;
     *    loaderText.style.fontFamily = "Arial";
     *    loaderText.style.margin = "0";
     *    loaderText.style.padding = "50px";
     *    loaderContainerDiv.appendChild(loaderText);
     *    domChartRoot.appendChild(loaderContainerDiv);
     *    return loaderContainerDiv;
     * }
     * ```
     */
    addChartLoader(domChartRoot: HTMLDivElement, theme: IThemeProvider): HTMLElement;
    /**
     * Called to remove a chart loader from the DOM.
     * @example
     * ```ts
     * public removeChartLoader(domChartRoot: HTMLDivElement, loaderElement: HTMLElement): void {
     *    domChartRoot.removeChild(loaderElement);
     * }
     * ```
     */
    removeChartLoader(domChartRoot: HTMLDivElement, loaderElement: HTMLElement): void;
}
/**
 * The default {@link ISciChartLoader} implementation. Displays a loading animation when the chart starts up
 * @example
 * // If not set in SciChartSurface.create then the default loader is used
 * SciChartSurface.create("elementId", { loader: new DefaultSciChartLoader(); });
 */
export declare class DefaultSciChartLoader implements ISciChartLoader {
    private static hasStyles;
    private static sciChartLoaderStylesId;
    type: "Default";
    /**
     * @inheritDoc
     */
    addChartLoader(domChartRoot: HTMLDivElement, theme: IThemeProvider): HTMLElement;
    /**
     * @inheritDoc
     */
    removeChartLoader(domChartRoot: HTMLDivElement, loaderElement: HTMLElement): void;
    toJSON(): {
        type: "Default";
    };
    private addLoaderStyles;
}
