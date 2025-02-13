/**
 * Enumeration constants to define the type of {@link BaseSceneEntity3D | Scene Entity }
 */
export declare enum ESceneEntityType {
    /**
     * The entity is an axis cube
     */
    AxisCubeEntity = 0,
    /**
     * The entity is a custom entity
     */
    Custom = 1,
    /**
     * The entity is an Xyz gizmo
     */
    GizmoEntity = 2,
    /**
     * The entity is the root scene entity
     */
    RootSceneEntity = 3,
    /**
     * The entity is a Scatter 3D or Bubble 3D entity
     */
    ScatterPointsSceneEntity = 4,
    /**
     * A generic WebAssembly native entity
     */
    SCRTSceneEntity = 5,
    /**
     * The entity is a Surface Mesh or Surface Plot 3D entity
     */
    SurfaceMeshSceneEntity = 6,
    /**
     * the entity is a Point Line 3D or Line 3D entity
     */
    PointLine3DSceneEntity = 7,
    /**
     * The entity is a Column 3D entity
     */
    ColumnSceneEntity = 8
}
