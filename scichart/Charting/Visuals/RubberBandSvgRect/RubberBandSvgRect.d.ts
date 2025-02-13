import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
/**
 * Used by the {@link RubberBandXyZoomModifier} to draw an {@link SVGSVGElement | SVGElement} rectangle over the chart.
 */
export declare class RubberBandSvgRect extends DeletableEntity implements IDeletable {
    svgTemplate: (fill: string, stroke: string, strokeThickness: number, width: number, height: number) => SVGElement;
    private svgRoot;
    private svg;
    private x1Property;
    private x2Property;
    private y1Property;
    private y2Property;
    private isHiddenProperty;
    constructor(svgRoot: SVGSVGElement, fill: string, stroke: string, strokeThickness: number);
    /**
     * Gets the X1 value, the value is not scaled
     */
    get x1(): number;
    /**
     * Sets the X1 value, the value must be not scaled
     */
    set x1(value: number);
    /**
     * Gets the X2 value, the value is not scaled
     */
    get x2(): number;
    /**
     * Sets the X2 value, the value must be not scaled
     */
    set x2(value: number);
    /**
     * Gets the Y1 value, the value is not scaled
     */
    get y1(): number;
    /**
     * Sets the Y1 value, the value must be not scaled
     */
    set y1(value: number);
    /**
     * Gets the Y2 value, the value is not scaled
     */
    get y2(): number;
    /**
     * Sets the Y2 value, the value must be not scaled
     */
    set y2(value: number);
    /**
     * Gets isHidden property
     */
    get isHidden(): boolean;
    /**
     * Sets isHidden property
     */
    set isHidden(value: boolean);
    /**
     * Clear the rect svg
     */
    clear(): void;
    /**
     * Deletes the rect
     */
    delete(): void;
    private create;
    private update;
    private notifyPropertyChanged;
}
