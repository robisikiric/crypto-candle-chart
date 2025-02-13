import { Thickness } from "../../../Core/Thickness";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { EAnnotationType } from "./IAnnotation";
import { ISvgAnnotationBaseOptions, SvgAnnotationBase } from "./SvgAnnotationBase";
/**
 * Optional parameters passed to an {@link TextAnnotation} during construction
 */
export interface ITextAnnotationOptions extends ISvgAnnotationBaseOptions {
    /**
     * text provided by the user
     */
    text?: string;
    /**
     * text color provided by the user
     */
    textColor?: string;
    /**
     * font size provided by the user
     */
    fontSize?: number;
    /**
     * font family provided by the user
     */
    fontFamily?: string;
    /**
     * Font weight provided by the user
     */
    fontWeight?: string;
    /**
     * Text background color provided by the user
     */
    background?: string;
    /**
     * Text padding provided by the user
     */
    padding?: Thickness;
    /**
     * Text SVG class provided by the user
     */
    className?: string;
}
/**
 * A TextAnnotation presents text information over the chart at specific {@link X1}, {@link Y1} coordinates
 */
export declare class TextAnnotation extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVGTextAnnotation;
    protected textProperty: string;
    protected textColorProperty: string;
    protected fontSizeProperty?: number;
    protected fontFamilyProperty?: string;
    protected fontWeightProperty?: string;
    protected backgroundProperty?: string;
    protected paddingProperty?: Thickness;
    protected classNameProperty: string;
    protected isDirty: boolean;
    /**
     * Creates an instance of the {@link TextAnnotation}
     * @param options The {@link ITextAnnotationOptions} which contain optional parameters
     */
    constructor(options?: ITextAnnotationOptions);
    /**
     * text provided by the user
     */
    get text(): string;
    set text(text: string);
    /**
     * Gets or sets the background of {@link TextAnnotation}
     */
    get background(): string;
    /**
     * Gets or sets the background of {@link TextAnnotation}
     */
    set background(value: string);
    /**
     * Gets or sets the padding of {@link TextAnnotation}
     */
    get padding(): Thickness;
    /**
     * Gets or sets the padding of {@link TextAnnotation}
     */
    set padding(value: Thickness);
    /**
     * Gets or sets the class on underlying SVG element of {@link TextAnnotation}
     */
    get className(): string;
    /**
     * Gets or sets the class on underlying SVG element of {@link TextAnnotation}
     */
    set className(value: string);
    /**
     * text color provided by the user
     */
    get textColor(): string;
    set textColor(textColor: string);
    /**
     * font size provided by the user
     */
    get fontSize(): number;
    set fontSize(fontSize: number);
    /**
     * font family provided by the user
     */
    get fontFamily(): string;
    set fontFamily(fontFamily: string);
    /**
     * font weight provided by the user
     */
    get fontWeight(): string;
    set fontWeight(fontWeight: string);
    toJSON(): {
        type: EAnnotationType;
        options: Required<Omit<import("./AnnotationBase").IAnnotationBaseOptions, never>>;
    };
    /**
     * Notifies listeners of {@link invalidateParentCallback} that a property has changed
     */
    protected notifyPropertyChanged(p: string): void;
    /**
     * @inheritDoc
     */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    protected createSvg(): SVGElement;
    protected attachSvgBackgroundRect(svgRoot: SVGSVGElement, background: string, padding: Thickness): void;
}
