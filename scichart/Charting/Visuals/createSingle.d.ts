import { TSciChart } from "../../types/TSciChart";
import { TSciChartSurfaceCanvases } from "../../types/TSciChartSurfaceCanvases";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { I2DSurfaceOptions } from "./I2DSurfaceOptions";
import { TWebAssemblyChart } from "./SciChartSurface";
/** @ignore */
export declare const createSingleInternal: (divElement: string | HTMLDivElement, options?: I2DSurfaceOptions) => Promise<TWebAssemblyChart>;
/** @ignore */
export declare const initDrawEngineSingleChart: (wasmContext: TSciChart, canvases: TSciChartSurfaceCanvases, resolve: (value: TWebAssemblyChart) => void, theme: IThemeProvider) => void;
