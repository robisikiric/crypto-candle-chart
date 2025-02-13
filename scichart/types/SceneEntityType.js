"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESceneEntityType = void 0;
/**
 * Enumeration constants to define the type of {@link BaseSceneEntity3D | Scene Entity }
 */
var ESceneEntityType;
(function (ESceneEntityType) {
    /**
     * The entity is an axis cube
     */
    ESceneEntityType[ESceneEntityType["AxisCubeEntity"] = 0] = "AxisCubeEntity";
    /**
     * The entity is a custom entity
     */
    ESceneEntityType[ESceneEntityType["Custom"] = 1] = "Custom";
    /**
     * The entity is an Xyz gizmo
     */
    ESceneEntityType[ESceneEntityType["GizmoEntity"] = 2] = "GizmoEntity";
    /**
     * The entity is the root scene entity
     */
    ESceneEntityType[ESceneEntityType["RootSceneEntity"] = 3] = "RootSceneEntity";
    /**
     * The entity is a Scatter 3D or Bubble 3D entity
     */
    ESceneEntityType[ESceneEntityType["ScatterPointsSceneEntity"] = 4] = "ScatterPointsSceneEntity";
    /**
     * A generic WebAssembly native entity
     */
    ESceneEntityType[ESceneEntityType["SCRTSceneEntity"] = 5] = "SCRTSceneEntity";
    /**
     * The entity is a Surface Mesh or Surface Plot 3D entity
     */
    ESceneEntityType[ESceneEntityType["SurfaceMeshSceneEntity"] = 6] = "SurfaceMeshSceneEntity";
    /**
     * the entity is a Point Line 3D or Line 3D entity
     */
    ESceneEntityType[ESceneEntityType["PointLine3DSceneEntity"] = 7] = "PointLine3DSceneEntity";
    /**
     * The entity is a Column 3D entity
     */
    ESceneEntityType[ESceneEntityType["ColumnSceneEntity"] = 8] = "ColumnSceneEntity";
})(ESceneEntityType = exports.ESceneEntityType || (exports.ESceneEntityType = {}));
