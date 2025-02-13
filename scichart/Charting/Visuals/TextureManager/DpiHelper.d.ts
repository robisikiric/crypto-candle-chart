import { ILineStyle } from "../../../Charting3D/Visuals/Axis/ILineStyle";
import { EventHandler } from "../../../Core/EventHandler";
import { Thickness } from "../../../Core/Thickness";
import { TGridLineStyle, TTextStyle } from "../Axis/AxisCore";
/**
 * Type arguments to {@link DpiHelper.dpiChanged} event
 */
export declare type TDpiChangedEventArgs = {
    /**
     * The previous Dpi scaling factor
     */
    oldValue: number;
    /**
     * The new Dpi scaling factor
     */
    newValue: number;
};
/**
 * Interface to define objects that listen to Dpi changes
 */
export interface INotifyOnDpiChanged {
    /**
     * Called when the Dpi changes in the browser. This could be due to user zooming the browser, or
     * changing DPI settings in Windows, or moving the browser containing SciChart to another monitor
     * @param args The {@link TDpiChangedEventArgs} containing info about the Dpi Changed event
     * @protected
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
}
/**
 * A helper class with methods and properties for DPI scaling of canvases
 */
export declare class DpiHelper {
    /**
     * When true, automatically adjust chart resolution for sharper images on high DPI screens
     */
    static IsDpiScaleEnabled: boolean;
    /**
     * Returns the current DPI scaling factor
     * @remarks Normal screen = 1, Retina display = 2, a Windows PC at 125% = 1.25
     */
    static PIXEL_RATIO: number;
    /**
     * Event you can subscribe to for Dpi Changes. See {@link EventHandler} for subscription syntax. Remember to unsubscribe to prevent memory leaks!
     */
    static dpiChanged: EventHandler<TDpiChangedEventArgs>;
    /**
     * Static initialization function for {@link DpiHelper}. Is called once by the framework on startup
     */
    static initialize(): void;
    /**
     * Creates a HTML Canvas element and applies the desired width, height using the {@link PIXEL_RATIO} DPI scaling factor
     * @param desiredWidth
     * @param desiredHeight
     */
    static createCanvas(desiredWidth?: number, desiredHeight?: number): HTMLCanvasElement;
    /**
     * Sets the desired size on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredWidth
     * @param desiredHeight
     */
    static setSize(canvas: HTMLCanvasElement, desiredWidth: number, desiredHeight: number): void;
    /**
     * Sets the desired width on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredWidth
     */
    static setWidth(canvas: HTMLCanvasElement, desiredWidth: number): void;
    /**
     * Sets the desired height on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredHeight
     */
    static setHeight(canvas: HTMLCanvasElement, desiredHeight: number): void;
    static adjustLineStyle(lineStyle: ILineStyle, dpiScale?: number): ILineStyle;
    static adjustTextStyle(textStyle: TTextStyle, dpiScale?: number): TTextStyle;
    static adjustStrokeSize(gridLineStyle: TGridLineStyle, dpiScale?: number): TGridLineStyle;
    static adjustThickness(thickness: Thickness, dpiScale?: number): Thickness;
    private static initialized;
}
