import { Point } from "../../Core/Point";
import { Rect } from "../../Core/Rect";
import { ModifierArgsBase } from "./ModifierArgsBase";
declare type TModifierMouseArgsParams = {
    mousePoint?: Point;
    button?: number;
    mouseWheelDelta?: number;
    pointerType?: string;
    pointerId?: number;
    target?: Element;
    isMaster?: boolean;
    modifierGroup?: string;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    altKey?: boolean;
    nativeEvent?: MouseEvent;
    isActiveSubChartEvent?: boolean;
};
/**
 * Mouse arguments passed to {@link ChartModifierBase} methods
 */
export declare class ModifierMouseArgs extends ModifierArgsBase {
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link MouseEvent}
     * @param mouseEvent the Javascript {@link MouseEvent}
     */
    static fromMouseEvent(mouseEvent: MouseEvent): ModifierMouseArgs;
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link WheelEvent}
     * @param wheelEvent the Javascript {@link WheelEvent}
     */
    static fromWheelEvent(wheelEvent: WheelEvent): ModifierMouseArgs;
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link PointerEvent}
     * @param pointerEvent the Javascript {@link PointerEvent}
     */
    static fromPointerEvent(pointerEvent: PointerEvent): ModifierMouseArgs;
    /**
     * Copies or clones a {@link ModifierMouseArgs}
     * @param args the {@link ModifierMouseArgs} instance
     * @param modifierGroup the Modifier Group / string ID for sharing mouse events
     * @param masterViewport the master viewport or parent chart issuing mouse events
     * @param slaveViewport the slave viewport or child chart receiving mouse events
     */
    static copy(args: ModifierMouseArgs, modifierGroup: string, masterViewport: Rect, slaveViewport: Rect, masterData: any): ModifierMouseArgs;
    static copyForSubChart(args: ModifierMouseArgs, modifierGroup: string, masterViewport: Rect, slaveViewport: Rect, masterData: any): ModifierMouseArgs;
    /**
     * The MousePoint as an X,Y coordinate where the event occurred
     */
    readonly mousePoint: Point;
    /**
     * The mouse button number that was pressed
     */
    readonly button: number;
    /**
     * The mouse wheel delta as a positive or negative value depending on mouse wheel direction
     */
    readonly mouseWheelDelta: number;
    /**
     * The PointerId associated with the current pointer or stylus device
     */
    pointerId: number;
    /**
     * The type of the current Pointer or stylus
     */
    pointerType: string;
    /**
     * The target {@link Element} which raised the event
     */
    target: Element;
    /**
     * When true, the event was raised from the master or parent {@link SciChartSurfaceBase}, else
     * it came from the child {@link SciChartSurfaceBase}
     * @remarks This is relevant in the case of linking together multiple charts
     */
    readonly isMaster: boolean;
    /**
     * If this is not raised from the master or parent, this is the result of getMasterData, used to pass additional info, eg x value.
     */
    readonly masterData: any;
    /**
     * The Modifier Group string is an ID which is used to group together {@link ChartModifierBase | Chart Modifiers}
     * when used in a multi-chart scenario
     */
    readonly modifierGroup: string;
    /**
     * When true, the Shift Key is currently pressed
     */
    readonly shiftKey: boolean;
    /**
     * When true, the Alt Key is currently pressed
     */
    readonly altKey: boolean;
    /**
     * When true, the Ctrl Key is currently pressed
     */
    readonly ctrlKey: boolean;
    /**
     * The native pointer event
     */
    nativeEvent: MouseEvent;
    /**
     * Identifies if the event comes from an active sub chart
     * Useful for SubChartSurfaces with modifierGroups
     * for SciChartSurface returns always True
     */
    readonly isActiveSubChartEvent: boolean;
    /**
     * Creates an instance of {@link ModifierMouseArgs}
     * @param mousePoint the mouse point as an X,Y location
     * @param options optional parameters to configure the args
     */
    constructor(mousePoint: Point, options?: TModifierMouseArgsParams);
}
export {};
