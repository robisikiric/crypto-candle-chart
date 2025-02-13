import { TEffectDefinition } from "../../../Builder/buildSeries";
import { EventHandler } from "../../../Core/EventHandler";
import { Point } from "../../../Core/Point";
import { PropertyChangedEventArgs } from "../../../Core/PropertyChangedEventArgs";
import { EShaderEffectType } from "../../../types/ShaderEffectType";
import { SCRTSeriesEffect, TSciChart } from "../../../types/TSciChart";
import { IDeletable } from "../../../Core/IDeletable";
import { DeletableEntity } from "../../../Core/DeletableEntity";
export interface IShaderEffectOptions {
    intensity?: number;
    range?: number;
    color?: string;
    offset?: Point;
}
/**
 * A {@link ShaderEffect} can be applied to a {@link BaseRenderableSeries | RenderableSeries} via the
 * {@link BaseRenderableSeries.effect} property. The effect modifies the render output of the chart type.
 */
export declare abstract class ShaderEffect extends DeletableEntity implements IDeletable {
    abstract readonly type: EShaderEffectType;
    /**
     * Event handler for when properties change, signalling that the parent {@link SciChartSurface} needs to redraw
     */
    propertyChanged: EventHandler<PropertyChangedEventArgs>;
    private webAssemblyContext;
    private nativeEffect;
    private offsetProperty;
    private colorProperty;
    private intensityProperty;
    private rangeProperty;
    /**
     * Creates an instance of the {@link ShaderEffect}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param seriesEffect The native {@link SCRTSeriesEffect} instance that provides the shader effect
     * @param options Optional parameters of type {@link IShaderEffectOptions} to configure the effect
     */
    protected constructor(webAssemblyContext: TSciChart, seriesEffect: SCRTSeriesEffect, options?: IShaderEffectOptions);
    delete(): void;
    /**
     * Gets the native {@link SCRTSeriesEffect} which contains the shader effect that will be applied in WebGL
     */
    getNativeEffect(): SCRTSeriesEffect;
    /**
     * Gets or sets the intensity property
     */
    get intensity(): number;
    /**
     * Gets or sets the intensity property
     */
    set intensity(intensity: number);
    /**
     * Gets or sets the offset property
     */
    get offset(): Point;
    /**
     * Gets or sets the offset property
     */
    set offset(offset: Point);
    /**
     * Gets or sets the color property as an HTML Color code
     */
    get color(): string;
    /**
     * Gets or sets the color property as an HTML Color code
     */
    set color(color: string);
    /**
     * Gets or sets the range property
     */
    get range(): number;
    /**
     * Gets or sets the range property
     */
    set range(range: number);
    /**
     * Notifies subscribers to {@link propertyChanged} that a property has changed and the parent {@link SciChartSurface} needs to redraw
     * @param propertyName
     */
    notifyPropertyChanged(propertyName: string): void;
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    toJSON(): TEffectDefinition;
}
