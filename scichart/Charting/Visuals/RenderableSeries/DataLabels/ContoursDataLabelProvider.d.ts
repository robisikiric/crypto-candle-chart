import { Point } from "../../../../Core/Point";
import { EDataLabelProviderType } from "../../../../types/DataLabelProviderType";
import { ENumericFormat } from "../../../../types/NumericFormat";
import { Size } from "../../../../types/Size";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { BaseHeatmapDataSeries } from "../../../Model/BaseHeatmapDataSeries";
import { IPointMetadata } from "../../../Model/IPointMetadata";
import { RenderPassData } from "../../../Services/RenderPassData";
import { BaseDataLabelProvider, IBaseDataLabelProviderOptions, TDataLabel } from "./BaseDataLabelProvider";
export interface IContoursDataLabelProviderOptions extends IBaseDataLabelProviderOptions {
    /**
     * Gets or sets numeric format to use for formatting values to text. For a list of values, see {@link ENumericFormat}
     */
    numericFormat?: ENumericFormat;
    /**
     * Gets or sets the precision to use when formatting values to text.
     */
    precision?: number;
    /**
     * If this is set it will be used to get text values from metaData, rather than formatting y values.
     * The selector will be called even if the metaData for an index is undefined.
     */
    metaDataSelector?: (metadata: IPointMetadata) => string;
    /** sets the number of rows of data labels. Default 10 */
    labelRowCount?: number;
    /** Flag to enable/disable dataLabel generation.  Default true */
    isEnabled?: boolean;
}
export declare class ContoursDataLabelProvider extends BaseDataLabelProvider {
    readonly type: EDataLabelProviderType;
    /**
     * If this is set it will be used to get text values from metaData, rather than formatting y values.
     * The selector will be called even if the metaData for an index is undefined.
     */
    metaDataSelector: (metadata: IPointMetadata) => string;
    protected dataSeries: BaseHeatmapDataSeries;
    protected zValues: number[][];
    protected colorValue: number;
    protected isEnabledProperty: boolean;
    private numericFormatProperty;
    private precisionProperty;
    private labelRowCountProperty;
    constructor(options?: IContoursDataLabelProviderOptions);
    /**
     * Gets or sets numeric format to use when formatting values to text. For a list of values, see {@link ENumericFormat}
     * For more control, override getText
     */
    get numericFormat(): ENumericFormat;
    set numericFormat(value: ENumericFormat);
    /**
     * Gets or sets the precision to use when formatting values to text
     * For more control, override getText
     */
    get precision(): number;
    set precision(value: number);
    /**
     * Gets or sets the number of rows of data labels. Default 10
     */
    get labelRowCount(): number;
    set labelRowCount(value: number);
    /** Flag to enable/disable dataLabel generation.  Default true */
    get isEnabled(): boolean;
    /** Flag to enable/disable dataLabel generation.  Default true */
    set isEnabled(value: boolean);
    getText(xIndex: number, yIndex: number): string;
    getPosition(xIndex: number, yIndex: number, xVal: number, yVal: number, textSize: Size, renderPassData: RenderPassData): Point;
    shouldGenerate(textSize: Size, cellWidth: number, cellHeight: number): boolean;
    getColor(xIndex: number, yIndex: number, text: string): number;
    shouldSkipLabel(xIndex: number, yIndex: number, label: TDataLabel, cellWidth: number, cellHeight: number): boolean;
    generateDataLabels(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    toJSON(): {
        type: EDataLabelProviderType;
        options: {
            style: import("../../../..").TDataLabelStyle;
            color: string;
        };
    };
}
