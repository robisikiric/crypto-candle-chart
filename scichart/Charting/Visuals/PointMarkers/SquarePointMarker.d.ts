import { EPointMarkerType } from "../../../types/PointMarkerType";
import { TSciChart } from "../../../types/TSciChart";
import { BasePointMarker, IPointMarkerOptions } from "./BasePointMarker";
/**
 * @summary Point-marker type which renders a square at each x-y datapoint location
 * @remarks
 * To apply the SquarePointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new SquarePointMarker(wasmContext, {
 *                  width: 9,
 *                  height: 9,
 *                  fill: "#FF0000",
 *                  stroke: "#0000FF",
 *                  strokeThickness: 1
 *              })
 * }));
 * ```
 */
export declare class SquarePointMarker extends BasePointMarker {
    /**
     * @inheritDoc
     */
    readonly type = EPointMarkerType.Square;
    /**
     * Creates an instance of the {@link SquarePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    constructor(webAssemblyContext: TSciChart, options?: IPointMarkerOptions);
    /**
     * @inheritDoc
     */
    drawSprite(context: CanvasRenderingContext2D, spriteWidth: number, spriteHeight: number, stroke: string, strokeThickness: number, fill: string): void;
}
