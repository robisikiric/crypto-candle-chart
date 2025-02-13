import { ChartModifierBase2D, IChartModifierBaseOptions } from "../../Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { EventHandler } from "../../Core/EventHandler";
import { IHoverable } from "../../Core/IHoverable";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { EHoverMode } from "../../types/HoverMode";
import { EMousePosition } from "../../types/MousePosition";
/** The arguments passed to hover event raised by a hover detection modifier, e.g. {@link PointerEventsMediatorModifier} */
export interface IHoverCallbackArgs<TEntityType extends IHoverable = IHoverable> {
    /** The modifier that raised the event */
    sender: PointerEventsMediatorModifier<TEntityType>;
    /** The mouse event properties */
    mouseArgs: ModifierMouseArgs;
    /** Items that are currently hovered accordingly ro hover detection rules */
    hoveredEntities: TEntityType[];
    /** Items that are are hit tested */
    includedEntities: TEntityType[];
    /** Items that were hovered on previous event but are not anymore */
    unhoveredEntities: TEntityType[];
    /** Items that were hovered on previous event */
    previousHoveredEntities: TEntityType[];
}
export declare type THoverCallback<TEntityType extends IHoverable = IHoverable> = (args: IHoverCallbackArgs<TEntityType>) => void;
export declare type TTargetsSelector<TEntityType extends IHoverable> = (modifier: PointerEventsMediatorModifier<TEntityType>) => TEntityType[];
export interface IPointerEventsMediatorModifierOptions<TEntityType extends IHoverable = IHoverable> extends IChartModifierBaseOptions {
    /**
     * Specifies the rules for detecting hover state for overlapping targets
     */
    hoverMode?: EHoverMode;
    /**
     * A callback executed when hover event is raised
     */
    onHover?: string | THoverCallback<TEntityType>;
    /**
     * Toggles hover detection
     */
    enableHover?: boolean;
    /**
     * Specifies whether an event should be raised when some of the hovered targets became unhovered
     */
    notifyOutEvent?: boolean;
    /**
     * Specifies whether an event should be raised when the mouse position changes but the list of hovered targets remains unchanged
     */
    notifyPositionUpdate?: boolean;
    /**
     * Specifies entities which are hit tested.
     * Accepts list of ids, or list of references, as well as getter function or name of the registered function
     */
    targets?: string[] | TEntityType[] | string | TTargetsSelector<TEntityType>;
}
export declare abstract class PointerEventsMediatorModifier<TEntityType extends IHoverable = IHoverable, TOptionsType extends IPointerEventsMediatorModifierOptions<TEntityType> = IPointerEventsMediatorModifierOptions<TEntityType>> extends ChartModifierBase2D {
    notifyOutEvent: boolean;
    notifyPositionUpdate: boolean;
    readonly hoverChanged: EventHandler<IHoverCallbackArgs<TEntityType>>;
    protected previousHoveredEntities: TEntityType[];
    protected mousePosition: EMousePosition;
    protected enableHoverProperty: boolean;
    protected hoverModeProperty: EHoverMode;
    protected targets: TEntityType[];
    protected targetsSelector: TTargetsSelector<TEntityType>;
    protected includeList: Map<string, boolean>;
    constructor(options?: TOptionsType);
    /**
     * The mode defining the rules for detecting a hover event
     */
    get hoverMode(): EHoverMode;
    /**
     * The mode defining the rules for detecting a hover event
     */
    set hoverMode(value: EHoverMode);
    toJSON(): {
        type: EChart2DModifierType;
        options: Required<IPointerEventsMediatorModifierOptions>;
    };
    /**
     * @inheritDoc
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseLeave(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierPointerCancel(args: ModifierMouseArgs): void;
    abstract getAllTargets(): TEntityType[];
    getIncludedTargets(): TEntityType[];
    protected performHoverAction(args: ModifierMouseArgs): void;
    protected performHoverOnEntity(target: IHoverable, args: ModifierMouseArgs, isHovered: boolean): void;
}
