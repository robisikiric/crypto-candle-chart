/**
 * Enumeration constants to define the type of {@link PaletteProvider | PaletteProvider}
 */
export declare enum EPaletteProviderType {
    /** PaletteProvider created by {@link PaletteFactory.createGradient | PaletteFactory.createGradient} */
    Gradient = "Gradient",
    /** Simple PaletteProvider to apply a different style to selected datapoints
     *  Used in conjunction with {@link DataPointSelectionModifier }
     */
    DataPointSelection = "DataPointSelection",
    /** User created PaletteProvider. Use customType to specify the name of the registered custom type.  */
    Custom = "Custom"
}
