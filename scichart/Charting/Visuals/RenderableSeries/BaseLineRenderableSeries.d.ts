import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { ILineSeriesDataLabelProviderOptions } from "./DataLabels/LineSeriesDataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
export declare enum ELineType {
    Normal = "Normal",
    Digital = "Digital",
    /** Horizontal line from the point to the x value of the next point */
    DigitalNoEdge = "DigitalNoEdge",
    /** Digital Line that goes Up then across, instead of Across then Up */
    DigitalYX = "DigitalYX"
}
export interface IBaseLineRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeDashArray?: number[];
    /**
     * Options to pass to the {@link DataLabelProvider}. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: ILineSeriesDataLabelProviderOptions;
    /**
     * The type of line to draw.  One of {@link ELineType}. Replaces isDigitalLine
     */
    lineType?: ELineType;
}
export declare abstract class BaseLineRenderableSeries extends BaseRenderableSeries {
    private strokeDashArrayProperty;
    private lineTypeProperty;
    constructor(webAssemblyContext: TSciChart, options?: IBaseLineRenderableSeriesOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    get strokeDashArray(): number[];
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    set strokeDashArray(strokeDashArray: number[]);
    /**
     * The type of line to draw.  One of {@link ELineType}. Replaces isDigitalLine
     */
    get lineType(): ELineType;
    /**
     * The type of line to draw.  One of {@link ELineType}. Replaces isDigitalLine
     */
    set lineType(lineType: ELineType);
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /**
     * @inheritDoc
     */
    protected newHitTestProvider(): IHitTestProvider;
}
