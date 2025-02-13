import { TLabelProviderDefinition } from "../../../../Builder/buildAxis";
import { GradientParams } from "../../../../Core/GradientParams";
import { Point } from "../../../../Core/Point";
import { RequiredOwnProps } from "../../../../types/HelperTypes";
import { TTextStyle } from "../../Axis/AxisCore";
import { PieLabelProvider } from "../../Axis/LabelProvider/PieLabelProvider";
import { SciChartPieSurface } from "../SciChartPieSurface";
import { IPieSegment } from "./IPieSegment";
export interface IPieSegmentOptions {
    id?: string;
    /**
     * A text value for the segment which will be displayed in the legend
     */
    text?: string;
    /**
     * The numerical value of the segment
     */
    value?: number;
    /**
     * The color of the segment as an HTML color code
     */
    color?: string;
    /**
     * An optional color gradient
     */
    colorLinearGradient?: GradientParams;
    /**
     * Whether the segment is selected.  Selected segments are shifted outwards by the delta
     */
    isSelected?: boolean;
    /**
     * The amount to shift the segment when it is selected.  Default 15 px
     */
    delta?: number;
    /**
     * Optional class that can override the default label formatting for this segment only.  Must be or inherit from {@link PieLabelProvider}
     */
    labelProvider?: PieLabelProvider | TLabelProviderDefinition;
    /**
     * Optional text style that will override the default style from the surface for this segment only
     */
    labelStyle?: TTextStyle;
    /**
     * An x, y offset for the label position
     */
    labelOffset?: Point;
    /**
     * When true, labels are shown, else hidden. Default value true
     */
    showLabel?: boolean;
    /**
     * A relative adjustment of the radius for this segment. eg 1.5 will be 50% larger than normal
     */
    radiusAdjustment?: number;
}
export declare class PieSegment implements IPieSegment {
    readonly id: string;
    private colorProperty;
    private colorLinearGradientProperty;
    private isSelectedProperty;
    private textProperty;
    private valueProperty;
    private showLabelProperty;
    private oldValueProperty;
    private deltaProperty;
    private shiftProperty;
    private parentSurface;
    private labelProviderProperty;
    private labelStyleProperty;
    private labelOffsetProperty;
    private radiusAdjustmentProperty;
    private invalidateParentCallback;
    constructor(options?: IPieSegmentOptions);
    onAttach(scps: SciChartPieSurface): void;
    onDetach(): void;
    /**
     * When true, show the label on this pie segment, else false
     */
    get showLabel(): boolean;
    /**
     * When true, show the label on this pie segment, else false
     */
    set showLabel(value: boolean);
    /**
     * An optional color gradient
     */
    get colorLinearGradient(): GradientParams;
    /**
     * An optional color gradient
     */
    set colorLinearGradient(value: GradientParams);
    /**
     * The color of the segment as an HTML color code
     */
    get color(): string;
    /**
     * The color of the segment as an HTML color code
     */
    set color(value: string);
    /**
     * Whether the segment is selected.  Selected segments are shifted outwards by the delta
     */
    get isSelected(): boolean;
    /**
     * Whether the segment is selected.  Selected segments are shifted outwards by the delta
     */
    set isSelected(value: boolean);
    /**
     * A text value for the segment which will be displayed in the legend
     */
    get text(): string;
    /**
     * A text value for the segment which will be displayed in the legend
     */
    set text(value: string);
    /**
     * Optional class that can override the default label formatting for this segment only.  Must be or inherit from {@link PieLabelProvider}
     */
    get labelProvider(): PieLabelProvider;
    /**
     * Optional class that can override the default label formatting for this segment only.  Must be or inherit from {@link PieLabelProvider}
     */
    set labelProvider(value: PieLabelProvider);
    getPercentage(total: number): number;
    /**
     * The numerical value of the segment
     */
    get value(): number;
    /**
     * The numerical value of the segment
     */
    set value(value: number);
    /**
     * The previous value of the segment, if it has been updated.  Used for animations
     */
    get oldValue(): number;
    /**
     * The amount to shift the segment when it is selected.  Default 15 px
     */
    get delta(): number;
    /**
     * The amount to shift the segment when it is selected.  Default 15 px
     */
    set delta(value: number);
    /**
     * The amount the segment is shifted radially outwards.  Automatically set during selected/deselection animations
     * Do not set this directly.  Use delta and isSelected instead
     */
    get shift(): number;
    /**
     * The amount the segment is shifted radially outwards.  Automatically set during selected/deselection animations
     */
    set shift(value: number);
    /**
     * Gets or sets a {@link TTextStyle} object for styling labels for this segment only
     */
    get labelStyle(): TTextStyle;
    /**
     * Gets or sets a {@link TTextStyle} object for styling labels for this segment only
     */
    set labelStyle(textStyle: TTextStyle);
    /**
     * An x, y offset for the label position
     */
    get labelOffset(): Point;
    /**
     * An x, y offset for the label position
     */
    set labelOffset(value: Point);
    /**
     * A relative adjustment of the radius for this segment. eg 1.5 will be 50% larger than normal
     */
    get radiusAdjustment(): number;
    /**
     * A relative adjustment of the radius for this segment. eg 1.5 will be 50% larger than normal
     */
    set radiusAdjustment(value: number);
    toJSON(): RequiredOwnProps<IPieSegmentOptions>;
    getLabelText(total: number): string;
    private notifyPropertyChanged;
}
