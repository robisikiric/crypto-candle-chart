"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELabelProviderType = void 0;
/**
 * Enumeration constants to define the type of {@link LabelProvider | LabelProvider}
 */
var ELabelProviderType;
(function (ELabelProviderType) {
    /**
     * Formats numbers using a variety of formats see {@link ENumericFormat}
     */
    ELabelProviderType["Numeric"] = "Numeric";
    /**
     * Numeric formatting for logarithmic axis, including base aware scientific notation
     */
    ELabelProviderType["Logarithmic"] = "Logarithmic";
    /**
     * Formats timestamps as a Date.  DDMMYYYY by default
     */
    ELabelProviderType["Date"] = "Date";
    /**
     * Formats timestamps as a DateTime, using times or dates depending on the range.
     */
    ELabelProviderType["SmartDate"] = "SmartDate";
    /**
     * Maps values to text provided
     */
    ELabelProviderType["Text"] = "Text";
    /**
     * Label provider for PieSurface
     */
    ELabelProviderType["Pie"] = "Pie";
})(ELabelProviderType = exports.ELabelProviderType || (exports.ELabelProviderType = {}));
