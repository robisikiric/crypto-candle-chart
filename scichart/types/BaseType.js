"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBaseType = void 0;
/**
 * Enumeration constants to define Base types that can be registered using {@link registerType} or {@link registerFunction}
 * for use with the builder api
 */
var EBaseType;
(function (EBaseType) {
    /** Subtype EAxisType */
    EBaseType["Axis"] = "Axis";
    /** SubType EAnnotationType */
    EBaseType["Annotation"] = "Annotation";
    /** Subtype ESeriesType */
    EBaseType["RenderableSeries"] = "RenderableSeries";
    /** Subtype ELayoutManagerType */
    EBaseType["LayoutManager"] = "LayoutManager";
    /** Subtype EThemeProviderType or your own type */
    EBaseType["ThemeProvider"] = "ThemeProvider";
    /** Subtype EChart2DModifierType */
    EBaseType["Chart2DModifier"] = "Chart2DModifier";
    /** Subtype ELabelProviderType */
    EBaseType["LabelProvider"] = "LabelProvider";
    /** Subtype EPointMarkerType */
    EBaseType["PointMarker"] = "PointMarker";
    /** Subtype ELayoutManagerType */
    EBaseType["ShaderEffect"] = "ShaderEffect";
    /** SubType EPaletteProviderType */
    EBaseType["PaletteProvider"] = "PaletteProvider";
    /** Subtype EAnimationType */
    EBaseType["Animation"] = "Animation";
    /** Subtypes are "Default" or your own type */
    EBaseType["Loader"] = "Loader";
    /** Subtypes are "Template" or your own type */
    EBaseType["MetadataGenerator"] = "MetadataGenerator";
    /** Used for options that are functions  */
    EBaseType["OptionFunction"] = "OptionFunction";
    /** Used for functions that perform post-creation configuration for builder charts */
    EBaseType["OnCreateFunction"] = "OnCreateFunction";
    /** Subtype EDataFilterType */
    EBaseType["DataFilter"] = "DataFilter";
    /** Subtype ELayoutStrategyType */
    EBaseType["LayoutStrategy"] = "LayoutStrategy";
    /** Subtype EDataLabelProviderType */
    EBaseType["DataLabelProvider"] = "DataLabelProvider";
})(EBaseType = exports.EBaseType || (exports.EBaseType = {}));
