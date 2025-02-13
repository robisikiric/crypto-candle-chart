"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHoverMode = void 0;
/**
 * Modes defining the rules for detecting a hover event
 */
var EHoverMode;
(function (EHoverMode) {
    /** Treat all included entities as hovered if it is hit */
    EHoverMode["Multi"] = "Multi";
    /** Treat a single topmost entity as hovered if it hit and above included target */
    EHoverMode["TopmostIncluded"] = "TopmostIncluded";
    /** Treat a single topmost entity as hovered if hit and above any other hoverable target (included or not) */
    EHoverMode["AbsoluteTopmost"] = "AbsoluteTopmost";
})(EHoverMode = exports.EHoverMode || (exports.EHoverMode = {}));
