import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { SciChartSurfaceBase } from "../../Charting/Visuals/SciChartSurfaceBase";
import { IEventListenerSource } from "./IEventListenerSource";
/**
 * The MouseManager handles mouse and touch events from any {@link IEventListenerSource} and publishes events to any {@link IReceiveMouseEvents}
 * type
 * @remarks
 * Used internally by the {@link SciChartSurface} and {@link SciChart3DSurface} to manage and route mouse eents
 */
export declare class MouseManager {
    /**
     * The target {@link SciChartSurfaceBase} that we are listening to events on
     */
    sciChartSurface: SciChartSurfaceBase;
    private canvas;
    /**
     * For subCharts - to track if the mousepointer is over the subChart, so we can fake Enter and Leave events
     */
    isOver: boolean;
    /**
     * Max allowed interval between taps for them to be considered a double tap action.
     * @remarks used by double tap polyfill
     */
    maxTapDuration: number;
    /**
     * Toggles usage of double tap polyfill
     */
    enableDoubleTapPolyfill: boolean;
    /**
     * Tracks if double tap action fired dbclick event
     */
    protected supportsDoubleTap: boolean;
    /**
     * Tracks status of double tap event.
     * Positive value means that polyfill was used to handle the event.
     */
    protected doubleTapHandled: boolean;
    /**
     * Defines whether double tap polyfill should  always be used
     */
    forceDoubleTapPolyfill: boolean;
    protected lastTapTime: number;
    /**
     * Creates an instance of the {@link MouseManager}
     * @param target The target {@link SciChartSurfaceBase} that we are listening to events on
     */
    constructor(target: SciChartSurfaceBase);
    /**
     * Used internally - subscribes to mouse events on the source
     * @param source The source element, must implement {@link IEventListenerSource} which any HTML5 element does
     */
    subscribe(source: IEventListenerSource): void;
    /**
     * Used internally - unsubscribes from mouse events
     */
    unsubscribe(): void;
    onPointerCancel(event: PointerEvent): void;
    /**
     * Internal function called when 'pointermove' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onPointerMove(event: PointerEvent): void;
    /**
     * Internal function called when 'pointerdown' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onPointerDown(event: PointerEvent): void;
    /**
     * Internal function called when 'pointerup' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onPointerUp(event: PointerEvent): void;
    /**
     * Internal function called when 'dblclick' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onDoubleClick(event: MouseEvent): void;
    /**
     * Internal function called when 'wheel' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onMouseWheel(event: WheelEvent): void;
    /**
     * Internal function called when 'mouseleave' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onMouseLeave(event: MouseEvent): void;
    /**
     * Internal function called when 'mouseenter' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onMouseEnter(event: MouseEvent): void;
    /**
     * Internal function called when 'contextmenu' event is fired on the target element
     * @param event The {@link PointerEvent}
     */
    onContextMenu(event: MouseEvent): void;
    onDrop(event: MouseEvent): void;
    modifierPointerCancel(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse move event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse down event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse up event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseUp(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse wheel event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseWheel(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse double click event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierDoubleClick(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse leave event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseLeave(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a mouse enter event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierMouseEnter(args: ModifierMouseArgs): void;
    /**
     * Internal function called to route a drop event to all {@link sciChartSurface.chartModifiers}
     * @param args The {@link ModifierMouseArgs} to route
     * @remarks Event routing stops if any event marks {@link ModifierMouseArgs.handled} as true. To override this,
     * the user must set {@link ChartModifierBase.receiveHandledEvents} = true.
     */
    modifierDrop(args: ModifierMouseArgs): void;
    /**
     * Get data from the master surface which will be passed to other surfaces when modifierGroups are used.
     * Use this if you want to use the data value from the master surface in the modifier on the other surfaces
     */
    getMasterData(sciChartSurface: SciChartSurfaceBase, args: ModifierMouseArgs): any;
    private get chartModifiers();
    private get chartModifierGroups();
    private updateSubCharts;
    private processSubChartEvent;
    private callEvent;
}
