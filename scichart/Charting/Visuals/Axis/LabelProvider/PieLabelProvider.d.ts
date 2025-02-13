import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { IPieSegment } from "../../SciChartPieSurface/PieSegment/IPieSegment";
import { SciChartPieSurface } from "../../SciChartPieSurface/SciChartPieSurface";
import { ILabelOptions, LabelProvider } from "./LabelProvider";
/**
 * @summary A Label Provider for use with Pie Charts to allow customizing of segment labels
 * To completely customise the label output, override {@link getSegmentText}
 * To just adjust the numeric formatting of the label, use numericformat, precision, prefix, postfix, or override {@link formatLabel}
 */
export declare class PieLabelProvider extends LabelProvider {
    readonly type = ELabelProviderType.Pie;
    /**
     * The parent {@link SciChartPieSurface}. This will be set once {@link attachedToSurface} is called
     */
    protected parentSurface: SciChartPieSurface;
    constructor(options?: ILabelOptions);
    delete(): void;
    /**
     * Get the text to be used as the segmet label. This picks the raw value, or percentage depending on the chart's valueMode
     * then formats it using the {@link formatLabel} function.
     * @param segment The PieSegment to get a label for
     * @param total Total of all pieSegment values
     */
    getSegmentText(segment: IPieSegment, total: number): string;
    /**
     * Called when the {@link LabelProvider} is attached to an {@link SciChartPieSurface }
     * @param pieSurface The SciPieSurface we are attached to.
     */
    attachedToSurface(pieSurface: SciChartPieSurface): void;
    /**
     * @inheritDoc
     */
    onBeginAxisDraw(): void;
    protected invalidateParent(): void;
}
