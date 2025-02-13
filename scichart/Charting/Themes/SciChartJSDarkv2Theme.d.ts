import { EThemeProviderType } from "../../types/ThemeProviderType";
import { SciChartJSDarkTheme } from "./SciChartJSDarkTheme";
/**
 * An implementation of {@link ThemeProvider} which provides an improved dark theme
 * @decription Applied to a 2D {@link SciChartSurface}, or a 3D {@link SciChart3DSurface}, the ThemeProvider may be
 * applied using the {@link SciChartSurface.applyTheme | applyTheme} method, where it is passed down to child components
 * so that all children of the chart get the same theme.
 *
 * For example:
 * ```ts
 * // Applying a theme when creating a chart
 * const { sciChartSurface, wasmContext } = SciChartSurface.create("div-id", { theme: new SciChartJSDarkv2Theme() });
 * // Apply a theme after chart creation
 * sciChartSurface.applyTheme(new SciChartJSDarkv2Theme());
 *
 * // Applying a custom theme
 * export class MyCustomTheme implements IThemeProvider {
 *    // todo: implement IThemeProvider interface and apply properties
 * }
 *
 * sciChartSurface.applyTheme(new MyCustomTheme()); // Or apply in SciChartSurface.create()
 *
 * // Overriding just some members of a theme
 * const myOverriddenTheme = {...new SciChartJSLightTheme(), sciChartBackground: "white" };
 * ciChartSurface.applyTheme(myOverriddenTheme); // Or apply in SciChartSurface.create()
 * ```
 */
export declare class SciChartJSDarkv2Theme extends SciChartJSDarkTheme {
    /** @inheritDoc */
    type: EThemeProviderType;
    constructor();
}
