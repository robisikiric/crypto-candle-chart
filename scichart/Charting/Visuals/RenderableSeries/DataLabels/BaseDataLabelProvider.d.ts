import { Point } from "../../../../Core/Point";
import { Rect } from "../../../../Core/Rect";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { TDataLabelStyle } from "../../../../types/TDataLabelStyle";
import { TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { IThemeProvider } from "../../../Themes/IThemeProvider";
import { IRenderableSeries } from "../IRenderableSeries";
export declare type TDataLabel = {
    text: string;
    /** The start point for text drawing.
     *  This is not the top left of the text rectangle, since the y value for text is on the alphabetic baseline
     *  Difference is bounds.GetLineBounds(0).m_fHeight
     */
    position: Point;
    /** The Rectangle that contains the label, relative to the seriesViewRect */
    rect: Rect;
    color?: number;
    dataX: number;
    dataY: number;
};
export interface IBaseDataLabelProviderOptions {
    /**
     * Sets the text style used for data labels. The style must be set, with fontFamily and fontSize set, in order for text to be drawn.
     */
    style?: TDataLabelStyle;
    /**
     * Sets the color for data labels.  Defaults to axis label color
     */
    color?: string;
}
export declare abstract class BaseDataLabelProvider {
    readonly type: EDataLabelProviderType;
    /**
     * The text to draw, along with the sizes and positions.  Usually generated, but can be updated before final drawing
     */
    dataLabels: TDataLabel[];
    /**
     * The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    protected webAssemblyContext: TSciChart;
    /**
     * The Parent {@link IRenderableSeries | RenderableSeries}
     */
    protected parentSeries: IRenderableSeries;
    protected styleProperty: TDataLabelStyle;
    protected colorProperty: string;
    private getstyleProxy;
    /**
     * Creates an instance of the {@link DataLabelProvider}
     */
    constructor(options?: IBaseDataLabelProviderOptions);
    /**
     * Called when a DataLabelProvider is attached to a parent {@link IRenderableSeries | RenderableSeries}
     * @param webAssemblyContext
     * @param parentSeries
     */
    onAttach(webAssemblyContext: TSciChart, parentSeries: IRenderableSeries): void;
    onDetach(): void;
    delete(): void;
    /**
     * Gets or sets the text style used for data labels. The style must be set, with fontFamily and fontSize set, in order for text to be drawn.
     */
    get style(): TDataLabelStyle;
    /**
     * Gets or sets the text style used for data labels. The style must be set, with fontFamily and fontSize set, in order for text to be drawn.
     */
    set style(value: TDataLabelStyle);
    /**
     * Gets or sets the color for data labels.  Defaults to axis label color
     */
    get color(): string;
    /**
     * Gets or sets the color for data labels.  Defaults to axis label color
     */
    set color(value: string);
    /** Update the style.  Only the properties passed will be updated */
    updateStyle(value: TDataLabelStyle): void;
    /**
     * Base behaviour is to do nothing.  Labels will only be drawn if they have been manually set
     */
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    draw(renderContext: WebGlRenderContext2D): void;
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: TDataLabelStyle;
            color: string;
        };
    };
    protected invalidateParent(): void;
}
