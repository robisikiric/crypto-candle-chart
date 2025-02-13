import { EPointMarkerType } from "../../../types/PointMarkerType";
import { TSciChart } from "../../../types/TSciChart";
import { CustomPointMarkerStyle } from "../RenderableSeries/Animations/CustomPointMarkerStyle";
import { BasePointMarker, IPointMarkerOptions } from "./BasePointMarker";
/**
 * Custom options to pass to the {@link SpritePointMarker} at construct time
 */
export interface ISpritePointMarkerOptions extends IPointMarkerOptions {
    /**
     * Sets the image to draw at each x-y point as an {@link HTMLImageElement}
     */
    image?: HTMLImageElement;
}
/**
 * @summary Point-marker type which renders a custom image provided by {@link HTMLImageElement} at each x-y datapoint location
 * @remarks
 * To apply the SpritePointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * import {createImageAsync} from "SCICHART_ROOT/src/utils/imageUtil";
 * import customPointImage from "./CustomMarkerImage.png";
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * const imageBitmap = await createImageAsync(customPointImage);
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new SpritePointMarker(wasmContext, {
 *                  image: imageBitmap
 *              })
 * }));
 * ```
 */
export declare class SpritePointMarker extends BasePointMarker {
    /**
     * @inheritDoc
     */
    readonly type = EPointMarkerType.Sprite;
    private imageProperty;
    /**
     * Creates an instance of the {@link SpritePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ISpritePointMarkerOptions} used to configure the point-marker at instantiation time
     */
    constructor(webAssemblyContext: TSciChart, options?: ISpritePointMarkerOptions);
    /**
     * Gets or sets the image to draw at each x-y point as an {@link HTMLImageElement}
     */
    get image(): HTMLImageElement;
    /**
     * Gets or sets the image to draw at each x-y point as an {@link HTMLImageElement}
     */
    set image(image: HTMLImageElement);
    /**
     * @inheritDoc
     */
    drawSprite(context: CanvasRenderingContext2D, spriteWidth: number, spriteHeight: number, stroke: string, strokeThickness: number, fill: string): void;
    getPointMarkerStyle(): CustomPointMarkerStyle;
    toJSON(): import("../../..").TPointMarkerDefinition;
}
