import { IDeletable } from "../../../../Core/IDeletable";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { INotifyOnDpiChanged } from "../../TextureManager/DpiHelper";
/**
 * Used internally - a drawing provider performs drawing for a specific chart-type or series using
 * our WebAssembly WebGL rendering engine
 */
export interface ISeriesDrawingProvider extends IDeletable, INotifyOnDpiChanged {
    /**
     * Called to perform a draw operation, using the {@link WebGlRenderContext2D} passed in
     * @param renderContext The {@link WebGlRenderContext2D} which provides access to our WebGL Rendering engine
     * @param renderPassData The {@link RenderPassData} containing properties and data for the current render pass.
     */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * Called when this drawing provider instance is attached to a {@link IRenderableSeries | RenderableSeries}.
     * Override in derived classes to perform one-time setup
     */
    onAttachSeries(): void;
    /**
     * Called when this drawing provider instance is detached from a {@link IRenderableSeries | RenderableSeries}.
     * Override in derived classes to perform tear-down
     */
    onDetachSeries(): void;
    /**
     * Called when a property changes on the parent {@link IRenderableSeries | RenderableSeries}
     * @param propertyName
     */
    onSeriesPropertyChange(propertyName: string): void;
}
