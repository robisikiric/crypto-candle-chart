import { Point } from "../../../../Core/Point";
import { EHorizontalTextPosition, EVerticalTextPosition } from "../../../../types/TextPosition";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { EDataLabelSkipMode } from "../../../../types/DataLabelSkipMode";
import { ENumericFormat } from "../../../../types/NumericFormat";
import { SCRTDoubleVector, TSciChart, TSRTextBounds } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointMetadata } from "../../../Model/IPointMetadata";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { RenderPassData } from "../../../Services/RenderPassData";
import { IRenderableSeries } from "../IRenderableSeries";
import { BaseDataLabelProvider, IBaseDataLabelProviderOptions, TDataLabel } from "./BaseDataLabelProvider";
import { DataLabelState } from "./DataLabelState";
import { IEngineeringPrefix } from "../../../../types/NumericFormat";
export interface IDataLabelProviderOptions extends IBaseDataLabelProviderOptions {
    /**
     * Gets or sets numeric format to use for formatting values to text. For a list of values, see {@link ENumericFormat}
     */
    numericFormat?: ENumericFormat;
    /**
     * Gets or sets the engineering prefixes to use when formatting values to text.
     * Default - `['K','M','B,'T']` for "large" prefixes, `['m','u','n','p']` for small prefixes
     * @remarks Only works when {@link ENumericFormat.Engineering} is selected
     */
    engineeringPrefix?: IEngineeringPrefix;
    /**
     * Gets or sets the precision to use when formatting values to text.
     */
    precision?: number;
    /**
     * Gets or sets the zoom threshold above which label drawing will start. Default 0
     * This is expressed as the gap between the first points divided by the size of the first text.
     * If data is unevenly spaced, consider {@link pointCountThreshold} or override shouldDrawText
     */
    pointGapThreshold?: number;
    /**
     * Gets or sets the number of points below which drawing will start.  Default Infinity
     * This can be used instead of {@link pointGapThreshold} when data is unevenly spaced or has large y variation
     */
    pointCountThreshold?: number;
    /**
     * The number of points to skip while generating labels. Default 0 = no skip.  1 = skip every other.
     * When creating text with many data points, it will help performance to skip points rather than creating and checking overlap for every data point.
     * This is applied before any logic related to {@link skipMode}
     */
    skipNumber?: number;
    /**
     * How do decide whether to keep or skip a label once generated.
     * Override {@link shouldSkipLabel} for more control
     */
    skipMode?: EDataLabelSkipMode;
    /**
     * A function to pick which y values to use from the pointSeries passed in on the renderPassData
     */
    ySelector?: (ps: IPointSeries) => SCRTDoubleVector;
    /**
     * If this is set it will be used to get text values from metaData, rather than formatting y values.
     * The selector will be called even if the metaData for an index is undefined.
     */
    metaDataSelector?: (metadata: IPointMetadata) => string;
    /**
     * Whether the label text should update when the label position is animating. Default false.
     */
    updateTextInAnimation?: boolean;
    /** Sets the horizontal text position for the label.  Default Right */
    horizontalTextPosition?: EHorizontalTextPosition;
    /** Sets the vertical text position for the label. Default Top */
    verticalTextPosition?: EVerticalTextPosition;
    /** Flag to enable/disable dataLabel generation.  Default true */
    isEnabled?: boolean;
}
/**
 * This is the standard DataLabelProvider which provides a number of options for configuring data labels.
 * It defines a much richer api than BaseDataLabelProvider and is intended to be used as a base for doing small changes to data label behaviour
 * generateDataLabels calls the following functions which you can override parts of the behaviour
 * {@link ySelector} to pick the desired yValues from the pointSeries.
 * {@link shouldGenerate} to determine if any labels should be generated so you can enable labels depending on zoom or data level.
 * Then for each data point:
 *  {@link getText} Build in behaviour can get text from metadata using {@link metaDataSelector} or format the y values using {@link numericFormat} and {@link precision}
 *  {@link getPosition} By default return the x and y coordinate of the data point.  Series-specific DataLabelProviders eg {@link LineSeriesDataLabelProvider} have logic to adjust text position based on the series
 *  {@link getColor} Returns the color from the text style. Use {@link parseColorToUIntArgb} to turn color string to the required numeric value if overriding.
 *  {@link shouldSkipLabel} Decides whether to keep or ship the generated label based on the {@link }
 */
export declare class DataLabelProvider extends BaseDataLabelProvider {
    readonly type: EDataLabelProviderType;
    /**
     * If this is set it will be used to get text values from metaData, rather than formatting y values.
     * The selector will be called even if the metaData for an index is undefined.
     */
    metaDataSelector: (metadata: IPointMetadata) => string;
    /**
     * A function to pick which y values to use from the pointSeries passed in on the renderPassData
     */
    ySelector: (ps: IPointSeries) => SCRTDoubleVector;
    /**
     * The text to draw, along with the sizes and positions.  Usually generated, but can be set or updated before final drawing
     */
    dataLabels: TDataLabel[];
    /**
     * Whether the label text should update when the label position is animating. Default false.
     */
    updateTextInAnimation: boolean;
    /**
     * The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    protected webAssemblyContext: TSciChart;
    /**
     * The Parent {@link IRenderableSeries | RenderableSeries}
     */
    protected parentSeries: IRenderableSeries;
    protected state: DataLabelState;
    protected pointGapThresholdProperty: number;
    protected pointCountThresholdProperty: number;
    protected numericFormatProperty: ENumericFormat;
    protected engineeringPrefixProperty: IEngineeringPrefix;
    protected precisionProperty: number;
    protected skipModeProperty: EDataLabelSkipMode;
    protected skipNumberProperty: number;
    protected horizontalTextPositionProperty: EHorizontalTextPosition;
    protected verticalTextPositionProperty: EVerticalTextPosition;
    protected isEnabledProperty: boolean;
    /**
     * Creates an instance of the {@link DataLabelProvider}
     */
    constructor(options?: IDataLabelProviderOptions);
    /**
     * @inheritDoc
     */
    onAttach(webAssemblyContext: TSciChart, parentSeries: IRenderableSeries): void;
    /**
     * Gets or sets the zoom threshold above which label drawing will start. Default 0.
     * This is expressed as the gap between the first points divided by the size of the first text
     * If data is unevenly spaced, consider {@link pointCountThreshold} or override shouldDrawText
     */
    get pointGapThreshold(): number;
    /**
     * Gets or sets the zoom threshold above which label drawing will start. Default 0.
     * This is expressed as the gap between the first points divided by the size of the first text
     * If data is unevenly spaced, consider {@link pointCountThreshold} or override shouldDrawText
     */
    set pointGapThreshold(value: number);
    /**
     * Gets or sets the number of points below which drawing will start.  Default Infinity
     * This can be used instead of {@link pointGapThreshold} when data is unevenly spaced or has large y variation
     */
    get pointCountThreshold(): number;
    /**
     * Gets or sets the number of points below which drawing will start. Default Infinity
     * This can be used instead of {@link pointGapThreshold} when data is unevenly spaced or has large y variation
     */
    set pointCountThreshold(value: number);
    /**
     * How do decide whether to keep or skip a label once generated.
     * Override {@link shouldSkipLabel} for more control
     */
    get skipMode(): EDataLabelSkipMode;
    /**
     * How do decide whether to keep or skip a label once generated.
     * Override {@link shouldSkipLabel} for more control
     */
    set skipMode(value: EDataLabelSkipMode);
    /**
     * The number of points to skip while generating labels. Default 0 = no skip.  1 = skip every other.
     * When creating text with many data points, it will help performance to skip points rather than creating and checking overlap for every data point.
     */
    get skipNumber(): number;
    /**
     * The number of points to skip while generating labels. Default 0 = no skip.  1 = skip every other.
     * When creating text with many data points, it will help performance to skip points rather than creating and checking overlap for every data point.
     */
    set skipNumber(value: number);
    /**
     * Gets or sets numeric format to use when formatting values to text. For a list of values, see {@link ENumericFormat}
     * For more control, override getText
     */
    get numericFormat(): ENumericFormat;
    set numericFormat(value: ENumericFormat);
    /**
     * Gets the engineering prefixes to use when formatting values to text.
     */
    get engineeringPrefix(): IEngineeringPrefix;
    /**
     * Gets or sets the engineering prefixes to use when formatting values to text.
     * Default - `['K','M','B','T']` for "large" prefixes, `['m','u','n','p']` for small prefixes
     * @remarks Only works when {@link ENumericFormat.Engineering} is selected
     */
    set engineeringPrefix(value: IEngineeringPrefix);
    /**
     * Gets or sets the precision to use when formatting values to text
     * For more control, override getText
     */
    get precision(): number;
    set precision(value: number);
    /**
     * Gets or sets the horizontal text position for the label
     * For more control, override getPosition
     */
    get horizontalTextPosition(): EHorizontalTextPosition;
    set horizontalTextPosition(value: EHorizontalTextPosition);
    /**
     * Gets or sets the vertical text position for the label
     * For more control, override getPosition
     */
    get verticalTextPosition(): EVerticalTextPosition;
    set verticalTextPosition(value: EVerticalTextPosition);
    /** Flag to enable/disable dataLabel generation.  Default true */
    get isEnabled(): boolean;
    /** Flag to enable/disable dataLabel generation.  Default true */
    set isEnabled(value: boolean);
    getText(state: DataLabelState): string;
    /**
     * Called at the start of generateDataLabels.  If false, no labels will be generated.
     * Checks {@link pointCountThreshold} then {@link pointGapThreshold}
     * @param state
     * @returns
     */
    shouldGenerate(state: DataLabelState): boolean;
    getPosition(state: DataLabelState, textBounds: TSRTextBounds): Point;
    getColor(state: DataLabelState, text: string): number;
    shouldSkipLabel(state: DataLabelState, label: TDataLabel): boolean;
    /** Generates labels using getText, getPosition, getColor.  Overrides manually set labels. */
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: import("../../../..").TDataLabelStyle;
            color: string;
        };
    };
    private skipIfOverlapPrevious;
    private skipIfOverlapNext;
}
