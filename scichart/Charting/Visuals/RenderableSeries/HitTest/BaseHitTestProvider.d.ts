import { Point } from "../../../../Core/Point";
import { TSciChart } from "../../../../types/TSciChart";
import { RenderPassData } from "../../../Services/RenderPassData";
import { IRenderableSeries } from "../IRenderableSeries";
import { HitTestInfo } from "./HitTestInfo";
import { IHitTestProvider } from "./IHitTestProvider";
/**
 * Defines the base class to Hit-Test Providers: classes which performs hit-tests on series, returning data-values at X-Y mouse locations
 */
export declare abstract class BaseHitTestProvider<TRenderableSeries extends IRenderableSeries> implements IHitTestProvider {
    static readonly DEFAULT_HIT_TEST_RADIUS: number;
    readonly parentSeries: TRenderableSeries;
    protected currentRenderPassData: RenderPassData;
    protected webAssemblyContext: TSciChart;
    /**
     * Creates an instance of the {@link BaseHitTestProvider}
     * @param parentSeries the parent {@link IRenderableSeries | RenderableSeries} that this Hit-Test provider is attached to
     * @param wasmContext the {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     */
    constructor(parentSeries: TRenderableSeries, wasmContext: TSciChart);
    /**
     * @inheritDoc
     */
    update(renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    abstract hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestDataPoint(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestForDataPointSelectionModifier(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
    protected getTranslatedHitTestPoint(x: number, y: number): Point;
}
