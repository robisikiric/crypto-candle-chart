import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
export interface IAdornerProvider {
    /** The stroke color for the adorner drag handle */
    annotationsGripsStroke: string;
    /** The fill color for the adorner drag handle */
    annotationsGripsFill: string;
    /** The radius of the adorner drag handle */
    annotationsGripsRadius: number;
    /** The stroke color for the adorner selection box */
    selectionBoxStroke: string;
    /** How much bigger the selection box is than the bounding box of the annotation, in pixels */
    selectionBoxDelta: number;
    /** The thickness of the selection box line */
    selectionBoxThickness: number;
    isDraggingStarted: boolean;
    clickToSelect(args: ModifierMouseArgs): boolean;
    onDragStarted(args: ModifierMouseArgs): boolean;
    onDragAdorner(args: ModifierMouseArgs): void;
    onDragAdorner(args: ModifierMouseArgs): void;
    onDragEnded(): void;
}
