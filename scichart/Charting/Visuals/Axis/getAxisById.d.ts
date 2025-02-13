import { AxisBase3D } from "../../../Charting3D/Visuals/Axis/AxisBase3D";
import { ObservableArray } from "../../../Core/ObservableArray";
import { AxisBase2D } from "./AxisBase2D";
export declare function getAxisById(axes: ObservableArray<AxisBase2D>, axisId: string): AxisBase2D;
export declare function getAxis3dById(axes: ObservableArray<AxisBase3D>, axisId: string): AxisBase3D;
