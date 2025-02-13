import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { Rect } from "../../../Core/Rect";
import { EAxisAlignment } from "../../../types/AxisAlignment";
import { ELabelAlignment } from "../../../types/LabelAlignment";
import { SCRTPen, TSciChart } from "../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { TextureManager } from "../TextureManager/TextureManager";
import { AxisBase2D } from "./AxisBase2D";
import { TTextStyle, TTickLineStyle } from "./AxisCore";
import { LabelProviderBase2D } from "./LabelProvider/LabelProviderBase2D";
/**
 * Draws an axis using our WebGL Rendering engine
 */
export declare class AxisRenderer extends DeletableEntity implements IDeletable {
    /**
     * The viewRect of the axis for ticks and labels.  Does not include the axis Title.
     */
    viewRect: Rect;
    drawDebug: boolean;
    textureManager: TextureManager;
    protected parentAxis: AxisBase2D;
    private webAssemblyContext;
    private desiredLabelsSize;
    private desiredTicksSize;
    private desiredHeightProperty;
    private desiredWidthProperty;
    private axisThicknessProperty;
    private measureTextCanvas;
    private keepLabelsWithinAxisProperty;
    private hideOverlappingLabelsProperty;
    /**
     * Creates an instance of a {@link AxisRenderer}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    constructor(webAssemblyContext: TSciChart);
    /** @inheritDoc */
    delete(): void;
    /**
     * Called when the {@link AxisRenderer} is attached to an {@link AxisBase2D | Axis}
     * @param axis The Axis we are attached to.
     */
    attachedToAxis(axis: AxisBase2D): void;
    /**
     * Called internally - measures the axis label area as part of the layout phase
     */
    measure(isHorizontalAxis: boolean, labelStyle: TTextStyle, majorTickLabels: string[], ticksSize: number, labelProvider: LabelProviderBase2D, drawLabels: boolean, drawTicks: boolean): void;
    /**
     * Called internally - calculates desired labels size
     */
    calcDesiredLabelsSize(isHorizontalAxis: boolean, labelProvider: LabelProviderBase2D, labelStyle: TTextStyle, majorTickLabels: string[]): number;
    /**
     * Called internally - Gets or sets desired height during the layout process
     */
    get desiredHeight(): number;
    set desiredHeight(height: number);
    /**
     * Called internally - Gets or sets desired width during the layout process
     */
    get desiredWidth(): number;
    set desiredWidth(width: number);
    /**
     * Gets or sets keepLabelsWithinAxis property.
     * When true (default), first and last labels will be shifted to stay within axis bounds.
     * If set to false, these labels will stay aligned to their ticks
     */
    get keepLabelsWithinAxis(): boolean;
    set keepLabelsWithinAxis(value: boolean);
    /**
     * Gets or sets hideOverlappingLabels property.
     * Default (true) is to not show labels that would overlap. When using rotation you may want to set this false,
     * as the bounding box of rotated text may overlap even if the text itself does not.
     */
    get hideOverlappingLabels(): boolean;
    set hideOverlappingLabels(value: boolean);
    /**
     * Gets or sets axis label area thickness, by default the size is calculated to have enough space for labels.
     * However, this property allows to set minimal width/height for vertical/horizontal axes.
     * Useful to align seriesViewRects for different charts
     */
    get axisThickness(): number;
    set axisThickness(value: number);
    /**
     * Called internally as a part of the layout process
     */
    layout(rect: Rect): void;
    /**
     * Called internally - draws labels
     */
    drawLabels(renderContext: WebGlRenderContext2D, axisAlignment: EAxisAlignment, isInnerAxis: boolean, tickLabels: string[], tickCoords: number[], axisOffset: number, labelStyle: TTextStyle, isVerticalChart: boolean, isFlippedCoordinates: boolean, labelProvider: LabelProviderBase2D): void;
    /**
     * Called internally - adjusts labels for label alignment
     */
    adjustForLabelAlignment(xCoord: number, labelWidth: number, labelAlignment: ELabelAlignment, axisAlignment: EAxisAlignment, isInnerAxis: boolean, axisWidth: number, tickSize: number): number;
    /**
     * Called internally
     */
    layoutLabels(size: number, tickCoords: number[], labelSizes: number[], isFlippedCoordinates: boolean, padBefore?: number, padAfter?: number): {
        labelCoords: number[];
        labelIndexes: number[];
    };
    /**
     * Called internally
     */
    drawTicks(renderContext: WebGlRenderContext2D, axisAlignment: EAxisAlignment, isInnerAxis: boolean, tickCoords: number[], axisOffset: number, pen: SCRTPen, tickStyle: TTickLineStyle): void;
    /**
     * Called internally - draws axis labels when needed, for example for line annotations
     */
    drawModifiersAxisLabel(renderContext: WebGlRenderContext2D, displayValue: string, coord: number, axisAlignment: EAxisAlignment, textStyle: TTextStyle, fill: string): Rect;
    /**
     * Called internally - used for {@link AxisMarkerAnnotation}
     */
    createAxisMarker(axisAlignment: EAxisAlignment, text: string, textStyle: TTextStyle, backgroundColor?: string, opacity?: number): import("../TextureManager/TextureManager").TTextureObject;
    /**
     * Called internally - used for custom {@link AxisMarkerAnnotation}
     */
    createAxisMarkerFromImage(image: HTMLImageElement, imageWidth: number, imageHeight: number): import("../TextureManager/TextureManager").TTextureObject;
    /**
     * Called internally
     */
    createAnnotationLabelTexture(text: string, textStyle: TTextStyle, backgroundColor?: string, displayVertically?: boolean, displayMirrored?: boolean, opacity?: number): import("../TextureManager/TextureManager").TTextureObject;
    protected invalidateParent(): void;
    private drawLabelViewRects;
}
/** @ignore */
export declare const layoutLabelsHelper: (keepLabelsWithinAxis: boolean, hideOverlappingLabels: boolean, size: number, tickCoords: number[], labelSizes: number[], isFlippedCoordinates: boolean) => {
    labelCoords: number[];
    labelIndexes: number[];
};
