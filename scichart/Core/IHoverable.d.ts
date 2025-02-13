import type { ModifierMouseArgs } from "../Charting/ChartModifiers/ModifierMouseArgs";
import type { EventHandler } from "./EventHandler";
/**
 * The options for triggering a hover action
 */
export interface IHoverOptions {
    args: ModifierMouseArgs;
    /**
     * A hint to skip hit test and apply provided value
     */
    isHovered?: boolean;
    /**
     * Defines if hovered event should be raised when pointer leaves the current target
     */
    notifyOutEvent?: boolean;
    /**
     * Defines if hovered event should be raised when pointer moves within the current target
     */
    notifyPositionUpdate?: boolean;
}
/**
 * The interface describing a visual chart component that could be hovered.
 */
export interface IHoverable {
    id: string;
    /**
     * Defines if the entity is hovered
     */
    isHovered: boolean;
    /**
     * Calculates if pointer is within entity bounds
     */
    checkIsWithinBounds: (args: ModifierMouseArgs) => boolean;
    /**
     * Executes a hover action on the annotation if it is hit
     */
    hover: (options: IHoverOptions) => void;
    /**
     * Fires based on hover rules passed into {@link hover}
     */
    hovered: EventHandler<any>;
}
