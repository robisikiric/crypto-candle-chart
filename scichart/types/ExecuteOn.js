"use strict";
// MouseEvent button values accordingly to https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
Object.defineProperty(exports, "__esModule", { value: true });
exports.EExecuteOn = void 0;
/**
 * Defines constants for when a {@link ChartModifierBase | Chart Modifier} operation occurs
 */
var EExecuteOn;
(function (EExecuteOn) {
    /**
     *  Execute on MouseRightButton
     */
    EExecuteOn[EExecuteOn["MouseLeftButton"] = 0] = "MouseLeftButton";
    /**
     *  Execute on MouseRightButton
     */
    EExecuteOn[EExecuteOn["MouseMiddleButton"] = 1] = "MouseMiddleButton";
    /**
     *  Execute on MouseRightButton
     */
    EExecuteOn[EExecuteOn["MouseRightButton"] = 2] = "MouseRightButton";
    /**
     *  Execute on BrowserBackButton
     */
    EExecuteOn[EExecuteOn["BrowserBackButton"] = 3] = "BrowserBackButton";
    /**
     *  Execute on MouseDoubleClick
     */
    EExecuteOn[EExecuteOn["BrowserForwardButton"] = 4] = "BrowserForwardButton";
})(EExecuteOn = exports.EExecuteOn || (exports.EExecuteOn = {}));
