/**
 * Enumeration constants to define the type of {@link LabelProvider | LabelProvider}
 */
export declare enum ELabelProviderType {
    /**
     * Formats numbers using a variety of formats see {@link ENumericFormat}
     */
    Numeric = "Numeric",
    /**
     * Numeric formatting for logarithmic axis, including base aware scientific notation
     */
    Logarithmic = "Logarithmic",
    /**
     * Formats timestamps as a Date.  DDMMYYYY by default
     */
    Date = "Date",
    /**
     * Formats timestamps as a DateTime, using times or dates depending on the range.
     */
    SmartDate = "SmartDate",
    /**
     * Maps values to text provided
     */
    Text = "Text",
    /**
     * Label provider for PieSurface
     */
    Pie = "Pie"
}
