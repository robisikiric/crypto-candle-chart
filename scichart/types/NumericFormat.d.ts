/**
 * Enumeration constants for standard formatting strings
 */
export declare enum ENumericFormat {
    /**
     * No format, return the string representation unchanged
     */
    NoFormat = "NoFormat",
    /**
     * Format to a specified number of decimal places
     */
    Decimal = "Decimal",
    /**
     * Format to a specified number of significant figures
     */
    SignificantFigures = "SignificantFigures",
    /**
     * Format as a date in format DD/MM/YYYY
     */
    Date_DDMMYYYY = "Date_DDMMYYYY",
    /**
     * Format as a date in format DD/MM/YY
     */
    Date_DDMMYY = "Date_DDMMYY",
    /**
     * Format as a date in format DD/MM HH:MM
     */
    Date_DDMMHHMM = "Date_DDMMHHMM",
    /**
     * Format as a date in format DD/MM
     */
    Date_DDMM = "Date_DDMM",
    /**
     * Format as a date in format HH:MM
     */
    Date_HHMM = "Date_HHMM",
    /**
     * Format as a date in format HH:MM:SS
     */
    Date_HHMMSS = "Date_HHMMSS",
    /**
     * Format as a date in format SS.ms
     */
    Date_SSms = "Date_SSms",
    /**
     * Format using Exponential notation to a specified number of significant figures eg 1.0E0, 1.5E1, 2.7E2
     * Note that this will ALWAYS be base 10, even when used on a Logarithmic axis
     */
    Exponential = "Exponential",
    /**
     * Format using Scientific notation to a specified number of significant figures eg 1.0x10^1, 1.5x10^2, 2.7x10^3
     * On a Logarithmic axis, the base will be the same as the axis logarithmic base
     */
    Scientific = "Scientific",
    /**
     * Engineering notation, eg 12.32K, 1.5M, 2.7G
     * @feature You can pass your custom prefixes as {@link IEngineeringPrefix}
     */
    Engineering = "Engineering"
}
/**
* @description Options for the {@link ENumericFormat.Engineering} format
*/
export interface IEngineeringPrefix {
    large?: string[];
    small?: string[];
}
