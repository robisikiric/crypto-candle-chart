import { DeletableEntity } from "../../Core/DeletableEntity";
import { IDeletable } from "../../Core/IDeletable";
import { Point } from "../../Core/Point";
import { EExecuteOn } from "../../types/ExecuteOn";
import { IThemeable } from "../Themes/IThemeable";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { SciChartSubSurface } from "../Visuals/SciChartSurface";
import { SciChartSurfaceBase } from "../Visuals/SciChartSurfaceBase";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
export declare enum EModifierType {
    Chart2DModifier = "2D Chart Modifier",
    Chart3DModifier = "3D Chart Modifier",
    MultiChart2DModifier = "Multiple 2D Chart Modifier"
}
/**
 * Defines the interface to a {@link ChartModifierBase | Chart Modifier} - a class which provides Zoom, Pan, Tooltip or interaction behavior
 * to SciChart - High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
export interface IChartModifierBase extends IThemeable, IDeletable {
    /**
     * A unique Id for the {@link IChartModifierBase}
     */
    readonly id: string;
    /**
     * A callback to invalidate the parent {@link SciChartSurfaceBase}
     */
    invalidateParentCallback: () => void;
    /**
     * The type of Chart Modifier, see {@link EModifierType} for a list of values
     */
    modifierType: EModifierType;
    /**
     * The operation that modifier should respond to
     */
    executeOn: EExecuteOn;
    /**
     * When true, the modifier is enabled
     */
    isEnabled: boolean;
    /**
     * When true, the modifier is attached to a {@link SciChartSurfaceBase}
     * @remarks Set internally by SciChart on attaching to a parent surface
     */
    isAttached: boolean;
    /**
     * When true, this modifier should receive events which have been handled by modifiers
     * higher up in the call hierachy.
     * @remarks Use this property to solve issues related to events being consumed by modifiers and not passed down
     */
    receiveHandledEvents: boolean;
    /**
     * When true, this modifier can receive mouse events
     */
    canReceiveMouseEvents: boolean;
    /**
     * Specifies a string ID to group modifiers.
     * @remarks When one receives a mouse event, all modifiers in the same group receive the event.
     */
    modifierGroup: string | undefined;
    /**
     * Called when the modifier is attached to a parent {@link SciChartSurfaceBase}
     */
    onAttach(): void;
    /**
     * Called when the modifier is detached from a parent {@link SciChartSurfaceBase}
     */
    onDetach(): void;
    /**
     * Called when a {@link IRenderableSeries | RenderableSeries} is attached to this modifier
     */
    onAttachSeries(rs: IRenderableSeries): void;
    /**
     * Called when a {@link IRenderableSeries | RenderableSeries} is detached from this modifier
     */
    onDetachSeries(rs: IRenderableSeries): void;
    /**
     * Called when a {@link SciChartSubSurface | SciChartSubSurface}} is attached to the parent {@link SciChartSurface}
     */
    onAttachSubSurface(subChart: SciChartSubSurface): void;
    /**
     * Called when a {@link SciChartSubSurface | SciChartSubSurface} is detached from the parent {@link SciChartSurface}
     */
    onDetachSubSurface(subChart: SciChartSubSurface): void;
    /**
     * Called when the parent {@link SciChartSurfaceBase} is rendered
     */
    onParentSurfaceRendered(): void;
    /**
     * Method called when mouse-down or touch-down occurs on the parent {@link SciChartSurfaceBase}
     * Call args.nativeEvent.preventDefault() to prevent default browser actions
     * like fast scroll for mouse wheel click and dragging of selected elements
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseDown(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse-move or touch-move occurs on the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseMove(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse-up or touch-up occurs on the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseUp(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse-wheel scroll occurs on the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseWheel(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse double-click or touch double-tap occurs on the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierDoubleClick(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse leaves the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseLeave(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when mouse enters the parent {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierMouseEnter(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when the drop event occurs {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the mouse event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierDrop(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Method called when pointer event is canceled {@link SciChartSurfaceBase}
     * @param args the {@link ModifierMouseArgs} containing data about the pointer event
     * @param scs the {@link SciChartSurfaceBase} on which method was called
     */
    modifierPointerCancel(args: ModifierMouseArgs, scs: SciChartSurfaceBase): void;
    /**
     * Sets the parent {@link SciChartSurfaceBase} on this modifier
     * @param parentSurface
     */
    setParentSurface(parentSurface: SciChartSurfaceBase): void;
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    toJSON?(): any;
}
/**
 * Defines a base class to a Chart Modifier - a class which provides Zoom, Pan, Tooltip or interaction behavior
 * to SciChart - High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
export declare abstract class ChartModifierBase<TSurfaceType extends SciChartSurfaceBase> extends DeletableEntity implements IChartModifierBase {
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    modifierGroup: string | undefined;
    /** @inheritDoc */
    invalidateParentCallback: () => void;
    protected isEnabledProperty: boolean;
    protected isAttachedProperty: boolean;
    protected receiveHandledEventsProperty: boolean;
    protected mousePoint: Point | undefined;
    protected previousPoint: Point | undefined;
    protected executeOnProperty: EExecuteOn;
    /**
     * Stores info about active pointerdown events
     */
    protected activePointerEvents: Map<number, ModifierMouseArgs>;
    protected parentSurfaceProperty: TSurfaceType;
    protected constructor(options?: {
        id?: string;
        executeOn?: EExecuteOn;
    });
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    get parentSurface(): TSurfaceType;
    /** @inheritDoc */
    abstract get modifierType(): EModifierType;
    /** @inheritDoc */
    get isEnabled(): boolean;
    /** @inheritDoc */
    set isEnabled(isEnabled: boolean);
    /** @inheritDoc */
    get isAttached(): boolean;
    /** @inheritDoc */
    get receiveHandledEvents(): boolean;
    /** @inheritDoc */
    set receiveHandledEvents(receiveHandledEvents: boolean);
    /** @inheritDoc */
    get executeOn(): EExecuteOn;
    /** @inheritDoc */
    set executeOn(operationType: EExecuteOn);
    /** @inheritDoc */
    get canReceiveMouseEvents(): boolean;
    /** @inheritDoc */
    onAttach(): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    onAttachSeries(rs: IRenderableSeries): void;
    /** @inheritDoc */
    onDetachSeries(rs: IRenderableSeries): void;
    /** @inheritDoc */
    onAttachSubSurface(subChart: SciChartSubSurface): void;
    /** @inheritDoc */
    onDetachSubSurface(subChart: SciChartSubSurface): void;
    /** @inheritDoc */
    onParentSurfaceRendered(): void;
    /** @inheritDoc */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseUp(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseWheel(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierDoubleClick(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseEnter(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseLeave(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierDrop(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierPointerCancel(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    setParentSurface(parentSurface: SciChartSurfaceBase): void;
    /** @inheritDoc */
    abstract toJSON?(): any;
    /** @inheritDoc */
    delete(): void;
    /**
     * Notifies the parent surface that a property has changed by calling {@link invalidateParentCallback}
     * @param propertyName the property name which has changed
     */
    protected notifyPropertyChanged(propertyName: string): void;
    protected updatePointerInfo(args: ModifierMouseArgs): void;
    /**
     * Checks if event conditions should trigger the modifier action
     * @param args current event info as {@link ModifierMouseArgs}
     *
     * @remarks Can be used in some of the modifiers to add/override constraints
     */
    protected getIsActionAllowed(args: ModifierMouseArgs): boolean;
}
