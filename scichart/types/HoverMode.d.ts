/**
 * Modes defining the rules for detecting a hover event
 */
export declare enum EHoverMode {
    /** Treat all included entities as hovered if it is hit */
    Multi = "Multi",
    /** Treat a single topmost entity as hovered if it hit and above included target */
    TopmostIncluded = "TopmostIncluded",
    /** Treat a single topmost entity as hovered if hit and above any other hoverable target (included or not) */
    AbsoluteTopmost = "AbsoluteTopmost"
}
