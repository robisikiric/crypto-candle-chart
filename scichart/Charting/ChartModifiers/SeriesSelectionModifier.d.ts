import { EventHandler } from "../../Core/EventHandler";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { HoveredChangedArgs } from "../Visuals/RenderableSeries/HoveredChangedArgs";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { SelectionChangedArgs } from "../Visuals/RenderableSeries/SelectionChangedArgs";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * The type of the {@link ISeriesSelectionModifierOptions.onSelectionChanged } callback function
 */
export declare type TSelectionChangedCallback = (args: SelectionChangedArgs) => void;
/**
 * The type of the {@link ISeriesSelectionModifierOptions.onHoverChanged } callback function
 */
export declare type THoveredChangedCallback = (args: HoveredChangedArgs) => void;
export interface ISeriesSelectionModifierOptions extends IChartModifierBaseOptions {
    /**
     * A hit-test radius in pixels used when selecting series. Defaults to 7
     */
    hitTestRadius?: number;
    /**
     * When true, Selection is enabled. Any series under the mouse or pointer device on mouseDown can be selected.
     * @default true
     */
    enableSelection?: boolean;
    /**
     * When true, hover is enabled. Any series under the mouse or pointer on mouseMove will be notified as mouseOver
     * @remarks Enabling hover will decrease performance as a hit-test operation must be performed every mouse-move.
     * @default false
     */
    enableHover?: boolean;
    /**
     * Optional callback for when any series is selected or deselected
     * @param arg Argument of
     */
    onSelectionChanged?: TSelectionChangedCallback | string;
    /**
     * Optional callback for when any series is hovered or unhovered
     * @param arg
     */
    onHoverChanged?: THoveredChangedCallback | string;
}
export declare class SeriesSelectionModifier extends ChartModifierBase2D {
    readonly type = EChart2DModifierType.SeriesSelection;
    /**
     * An array of currently selected series which can be observed by subscribing to the {@link selectionChanged} {@link EventHandler | event handler}
     * @remarks See  documentation for how to subscribe to changes
     */
    selectedSeries: IRenderableSeries[];
    /**
     * An array of currently hovered series which can be observed by subscribing to the {@link hoverChanged} {@link EventHandler | event handler}
     * @remarks See  documentation for how to subscribe to changes
     */
    hoveredSeries: IRenderableSeries[];
    /**
     * A selection-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
     * notified when any {@link IRenderableSeries | Series} is selected or unselected
     */
    readonly selectionChanged: EventHandler<SelectionChangedArgs>;
    /**
     * A hover-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
     * notified when any {@link IRenderableSeries | Series} is hovered or unhovered
     */
    readonly hoverChanged: EventHandler<HoveredChangedArgs>;
    /**
     * When true, Selection is enabled. Any series under the mouse or pointer device on mouseDown can be selected.
     * @default true
     */
    enableSelection: boolean;
    /**
     * When true, hover is enabled. Any series under 0the mouse or pointer on mouseMove will be notified as mouseOver
     * @remarks Enabling hover will decrease performance as a hit-test operation must be performed every mouse-move.
     * @default false
     */
    enableHover: boolean;
    private hitTestRadiusProperty;
    /**
     * A flag to prevent re-entrancy
     * @private
     */
    private preventReentrancy;
    /**
     * Creates an instance of a SeriesSelectionModifier
     * @param options Optional parameters used to configure the modifier
     */
    constructor(options?: ISeriesSelectionModifierOptions);
    /**
     * A hit-test radius in pixels used when selecting series. Defaults to 7
     */
    get hitTestRadius(): number;
    /**
     * A hit-test radius in pixels used when selecting series. Defaults to 7
     */
    set hitTestRadius(hitTestRadius: number);
    /**
     * @inheritDoc
     */
    onAttach(): void;
    /**
     * @inheritDoc
     */
    onDetach(): void;
    /**
     * @inheritDoc
     */
    onAttachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    onDetachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    modifierMouseLeave(args: ModifierMouseArgs): void;
    modifierPointerCancel(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseUp(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    getAllSeries(): IRenderableSeries[];
    /**
     * This function called when the user sets series.isSelected = true elsewhere in code and we want to sync the modifier
     */
    private updateSeriesSelected;
    private updateSeriesHovered;
}
