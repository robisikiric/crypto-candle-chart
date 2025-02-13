/**
 * Enumeration constants to define Base types that can be registered using {@link registerType} or {@link registerFunction}
 * for use with the builder api
 */
export declare enum EBaseType {
    /** Subtype EAxisType */
    Axis = "Axis",
    /** SubType EAnnotationType */
    Annotation = "Annotation",
    /** Subtype ESeriesType */
    RenderableSeries = "RenderableSeries",
    /** Subtype ELayoutManagerType */
    LayoutManager = "LayoutManager",
    /** Subtype EThemeProviderType or your own type */
    ThemeProvider = "ThemeProvider",
    /** Subtype EChart2DModifierType */
    Chart2DModifier = "Chart2DModifier",
    /** Subtype ELabelProviderType */
    LabelProvider = "LabelProvider",
    /** Subtype EPointMarkerType */
    PointMarker = "PointMarker",
    /** Subtype ELayoutManagerType */
    ShaderEffect = "ShaderEffect",
    /** SubType EPaletteProviderType */
    PaletteProvider = "PaletteProvider",
    /** Subtype EAnimationType */
    Animation = "Animation",
    /** Subtypes are "Default" or your own type */
    Loader = "Loader",
    /** Subtypes are "Template" or your own type */
    MetadataGenerator = "MetadataGenerator",
    /** Used for options that are functions  */
    OptionFunction = "OptionFunction",
    /** Used for functions that perform post-creation configuration for builder charts */
    OnCreateFunction = "OnCreateFunction",
    /** Subtype EDataFilterType */
    DataFilter = "DataFilter",
    /** Subtype ELayoutStrategyType */
    LayoutStrategy = "LayoutStrategy",
    /** Subtype EDataLabelProviderType */
    DataLabelProvider = "DataLabelProvider"
}
