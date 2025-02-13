"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPaletteProviderType = void 0;
/**
 * Enumeration constants to define the type of {@link PaletteProvider | PaletteProvider}
 */
var EPaletteProviderType;
(function (EPaletteProviderType) {
    /** PaletteProvider created by {@link PaletteFactory.createGradient | PaletteFactory.createGradient} */
    EPaletteProviderType["Gradient"] = "Gradient";
    /** Simple PaletteProvider to apply a different style to selected datapoints
     *  Used in conjunction with {@link DataPointSelectionModifier }
     */
    EPaletteProviderType["DataPointSelection"] = "DataPointSelection";
    /** User created PaletteProvider. Use customType to specify the name of the registered custom type.  */
    EPaletteProviderType["Custom"] = "Custom";
})(EPaletteProviderType = exports.EPaletteProviderType || (exports.EPaletteProviderType = {}));
