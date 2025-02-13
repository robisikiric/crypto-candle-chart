import { RenderPassInfo } from "../../../Services/RenderPassInfo";
import { SciChartSurface } from "../../SciChartSurface";
export interface IDataLabelLayoutManager {
    performTextLayout(sciChartSurface: SciChartSurface, renderPassInfo: RenderPassInfo): void;
}
