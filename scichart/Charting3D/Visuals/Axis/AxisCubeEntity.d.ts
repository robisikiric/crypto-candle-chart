import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTAxisCubeEntity, SCRTAxisDescriptor, SCRTTextStyle, SCRTTickStyle, TSciChart3D } from "../../../types/TSciChart3D";
import { BaseSceneEntity3D } from "../Primitives/BaseSceneEntity3D";
import { SciChart3DSurface } from "../SciChart3DSurface";
import { IAxisDescriptor, ITextStyle } from "./IAxisDescriptor";
import { ILineStyle } from "./ILineStyle";
/**
 * The {@link AxisCubeEntity} is a 3D Scene Entity (inherits {@link BaseSceneEntity3D}) which renders the 3D X,Y,Z axis cube,
 * axis walls and labels in a {@link SciChart3DSurface}
 */
export declare class AxisCubeEntity extends BaseSceneEntity3D<SCRTAxisCubeEntity> {
    /**
     * @inheritDoc
     */
    readonly type = ESceneEntityType.AxisCubeEntity;
    private sciChart3DSurface;
    private lastXDescriptor;
    private lastYDescriptor;
    private lastZDescriptor;
    /**
     * Creates an instance of an {@link AxisCubeEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param sciChart3DSurface The {@link SciChart3DSurface} associated with the axis cube
     */
    constructor(webAssemblyContext: TSciChart3D, sciChart3DSurface: SciChart3DSurface);
    /**
     * @inheritDoc
     */
    Update(deltaTime: number): void;
}
/** @ignore */
export declare const updateScrtAxisDescriptor: (wasmContext: TSciChart3D, scrtAxisDesc: SCRTAxisDescriptor, axisDesc: IAxisDescriptor) => void;
/** @ignore */
export declare const updateScrtLineStyle: (lineStyle: ILineStyle, scrtLineStyle: SCRTTickStyle) => void;
/** @ignore */
export declare const toScrtTextStyle: (labelStyle: ITextStyle, scrtTextStyle: SCRTTextStyle) => SCRTTextStyle;
